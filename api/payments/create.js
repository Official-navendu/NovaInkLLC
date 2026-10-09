import { productsData } from '../../src/data/products.js'
import { sendOrderEmails } from '../utils/emailService.js'

/**
 * Vercel Serverless API Route: POST /api/payments/create
 * Securely processes Square Sandbox card payments.
 * Performs server-side price verification and payment creation against Square Payments API.
 * On successful payment, dispatches Customer & Admin order confirmation emails via Resend.
 */
export default async function handler(req, res) {
  // 1. Enforce POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    const token = body.sourceId || body.token || body.nonce
    const { items, customer, billingAddress, notes } = body

    // 2. Validate payment token
    if (!token || typeof token !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Payment token is required.'
      })
    }

    // 3. Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Your shopping cart is empty or invalid.'
      })
    }

    // 4. Read server-side Square environment variables
    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    let locationId = process.env.SQUARE_LOCATION_ID || process.env.VITE_SQUARE_LOCATION_ID

    if (!accessToken) {
      console.error('[Square Payment API Error]: SQUARE_ACCESS_TOKEN is missing from server environment.')
      return res.status(500).json({
        success: false,
        error: 'Payment gateway configuration error. Please contact store support.'
      })
    }

    // 5. Environment & Credential Mismatch Guard (Prevents Sandbox/Production credential mixing)
    const envSetting = (process.env.SQUARE_ENVIRONMENT || process.env.VITE_SQUARE_ENVIRONMENT || 'sandbox').toLowerCase().trim()
    const isProduction = envSetting === 'production'
    const appId = process.env.VITE_SQUARE_APPLICATION_ID || ''

    if (isProduction && appId.startsWith('sandbox-')) {
      console.error('[Square Payment API Error]: Sandbox Application ID detected while configured for Production!')
      return res.status(500).json({
        success: false,
        error: 'Payment gateway environment credential mismatch error. Sandbox credentials cannot be used in Production.'
      })
    }

    if (!isProduction && appId && !appId.startsWith('sandbox-')) {
      console.error('[Square Payment API Error]: Production Application ID detected while configured for Sandbox!')
      return res.status(500).json({
        success: false,
        error: 'Payment gateway environment credential mismatch error. Production credentials cannot be used in Sandbox.'
      })
    }

    const squareHost = isProduction ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com'

    // 6. SERVER-SIDE PRICE VERIFICATION (Never trust client-submitted totals/prices)
    let verifiedTotalCents = 0
    let verifiedSubtotal = 0
    const verifiedItems = []

    for (const item of items) {
      const itemId = item.productId !== undefined ? item.productId : item.id
      const product = productsData.find(p => p.id === itemId || String(p.id) === String(itemId) || p.slug === itemId || p.sku === itemId)
      
      if (!product) {
        return res.status(400).json({
          success: false,
          error: `Product item not found in catalog (ID: ${itemId}).`
        })
      }

      const qty = parseInt(item.quantity, 10)
      if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({
          success: false,
          error: `Invalid quantity for product ${product.name}.`
        })
      }

      // Convert product USD price to integer cents (e.g. 449.99 -> 44999)
      const itemPriceCents = Math.round(product.price * 100)
      verifiedTotalCents += itemPriceCents * qty
      
      const itemTotalUSD = product.price * qty
      verifiedSubtotal += itemTotalUSD

      verifiedItems.push({
        id: product.id,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
        total: itemTotalUSD
      })
    }

    if (verifiedTotalCents <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Calculated order total must be greater than zero.'
      })
    }

    // Auto-fetch Location ID from Square if not provided in environment variables
    if (!locationId) {
      try {
        const locResponse = await fetch(`${squareHost}/v2/locations`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Square-Version': '2024-01-18'
          }
        })
        const locData = await locResponse.json()
        if (locData.locations && locData.locations.length > 0) {
          locationId = locData.locations[0].id
        }
      } catch (locErr) {
        console.warn('[Square Payment API Warning]: Could not auto-resolve Square location ID:', locErr.message)
      }
    }

    // 7. Generate Cryptographically Strong Idempotency Key
    const idempotencyKey = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : 'IDEM-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11)

    // 8. Construct Square Payments API CreatePayment Request Body
    const paymentBody = {
      idempotency_key: idempotencyKey,
      source_id: token,
      amount_money: {
        amount: verifiedTotalCents,
        currency: 'USD'
      },
      note: `Nova Ink Order - Customer: ${customer?.firstName || ''} ${customer?.lastName || ''}`.trim()
    }

    if (locationId) {
      paymentBody.location_id = locationId
    }

    if (customer?.email) {
      paymentBody.buyer_email_address = customer.email
    }

    if (billingAddress) {
      paymentBody.billing_address = {
        address_line_1: billingAddress.street || billingAddress.addressLine1 || '',
        address_line_2: billingAddress.apartment || billingAddress.addressLine2 || '',
        locality: billingAddress.city || '',
        administrative_district_level_1: billingAddress.state || '',
        postal_code: billingAddress.zip || billingAddress.postalCode || '',
        country: 'US'
      }
    }

    // 9. Execute Payment Request against Square Payments API
    const squareApiResponse = await fetch(`${squareHost}/v2/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentBody)
    })

    const squareData = await squareApiResponse.json()

    // 10. Process API Errors / Payment Declines (Never send paid email on failure)
    if (!squareApiResponse.ok || squareData.errors) {
      console.error('[Square Payment API Error]: Payment creation failed.', squareData.errors)
      const firstError = squareData.errors && squareData.errors.length > 0 ? squareData.errors[0] : null
      
      let userErrorMessage = 'Payment could not be completed. Please check your card details and try again.'
      if (firstError?.category === 'PAYMENT_METHOD_ERROR' || firstError?.code === 'CARD_DECLINED') {
        userErrorMessage = 'Your card was declined. Please verify your card details or try another card.'
      } else if (firstError?.code === 'UNAUTHORIZED') {
        userErrorMessage = 'Payment service authorization failed. Please contact store support.'
      } else if (firstError?.detail) {
        userErrorMessage = firstError.detail
      }

      return res.status(400).json({
        success: false,
        error: userErrorMessage
      })
    }

    // 11. Process Successful Payment Response & Dispatch Emails
    const payment = squareData.payment
    if (payment && (payment.status === 'COMPLETED' || payment.status === 'APPROVED')) {
      const orderId = 'ORD-HP-' + Math.floor(100000 + Math.random() * 900000)
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      const totalUSD = payment.amount_money?.amount ? (payment.amount_money.amount / 100) : verifiedSubtotal

      const orderData = {
        orderId,
        createdAt: new Date().toISOString(),
        date,
        customer,
        billingAddress,
        notes: notes || '',
        items: verifiedItems,
        subtotal: verifiedSubtotal,
        shipping: 0,
        tax: 0,
        total: totalUSD,
        paymentMethod: 'Credit / Debit Card (Square)',
        paymentStatus: 'paid',
        squarePaymentId: payment.id,
        squareStatus: payment.status,
        status: 'Order Confirmed'
      }

      // Dispatch Order Emails via Resend
      let emailResults = null
      try {
        emailResults = await sendOrderEmails(orderData)
      } catch (emailErr) {
        console.error('[Square Payment Email Exception]: Email dispatch failed:', emailErr)
      }

      return res.status(200).json({
        success: true,
        orderId,
        paymentId: payment.id,
        status: payment.status,
        amount: payment.amount_money?.amount,
        currency: payment.amount_money?.currency,
        emailResults,
        order: orderData
      })
    }

    return res.status(400).json({
      success: false,
      error: `Payment status: ${payment?.status || 'UNKNOWN'}. Please try again.`
    })

  } catch (error) {
    console.error('[Square Payment API Exception]: Unhandled exception during payment processing:', error)
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your payment. Please try again.'
    })
  }
}
