import { productsData } from '../../src/data/products.js'
import { sendOrderEmails } from '../utils/emailService.js'

/**
 * Vercel Serverless API Route: POST /api/orders/create
 * Processes Pay on Delivery (POD) orders server-side.
 * Performs server-side price verification and dispatches order confirmation emails via Resend.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    const { items, customer, billingAddress, notes, paymentMethod } = body

    // 1. Validate customer details
    if (!customer?.firstName || !customer?.lastName || !customer?.email || !customer?.phone) {
      return res.status(400).json({
        success: false,
        error: 'Customer name, email address, and phone number are required.'
      })
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test((customer.email || '').trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid customer email address.'
      })
    }

    // 3. Validate shipping/billing address
    if (!billingAddress?.street || !billingAddress?.city || !billingAddress?.state || !billingAddress?.zip) {
      return res.status(400).json({
        success: false,
        error: 'Complete street address, city, state, and ZIP code are required.'
      })
    }

    // 4. Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Your shopping cart is empty or invalid.'
      })
    }

    // 5. SERVER-SIDE PRICE VERIFICATION
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

      const itemTotal = product.price * qty
      verifiedSubtotal += itemTotal

      verifiedItems.push({
        id: product.id,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
        total: itemTotal
      })
    }

    if (verifiedSubtotal <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Calculated order subtotal must be greater than zero.'
      })
    }

    // 6. Construct Verified Order Record
    const orderId = 'ORD-HP-' + Math.floor(100000 + Math.random() * 900000)
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    const isPod = !paymentMethod || paymentMethod === 'cod' || paymentMethod.toLowerCase().includes('delivery') || paymentMethod.toLowerCase().includes('pod')
    
    const methodText = isPod ? 'Pay on Delivery (POD)' : (paymentMethod || 'Pay on Delivery (POD)')
    const statusText = isPod ? 'Pay on Delivery — Payment Pending' : 'Pending'

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
      total: verifiedSubtotal,
      paymentMethod: methodText,
      paymentStatus: statusText,
      status: 'Order Confirmed'
    }

    // 7. Dispatch Emails via Resend API
    let emailResults = null
    try {
      emailResults = await sendOrderEmails(orderData)
    } catch (emailErr) {
      console.error('[Order Email Exception]: Failed to dispatch order emails:', emailErr)
    }

    return res.status(200).json({
      success: true,
      orderId,
      total: verifiedSubtotal,
      paymentStatus: statusText,
      paymentMethod: methodText,
      emailResults,
      order: orderData
    })

  } catch (error) {
    console.error('[Order API Exception]: Unhandled exception in order creation:', error)
    return res.status(500).json({
      success: false,
      error: 'An error occurred while creating your order. Please try again.'
    })
  }
}
