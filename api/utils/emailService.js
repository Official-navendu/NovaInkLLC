import { renderCustomerEmail, renderAdminEmail } from './emailTemplates.js'

/**
 * Server-side Email Service using Resend API (https://api.resend.com/emails)
 * Dispatches Customer Order Confirmation & Dual Admin Notifications.
 * Never exposes RESEND_API_KEY to frontend/browser code.
 */
export async function sendOrderEmails(orderData) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.ORDER_FROM_EMAIL || 'info@novainkllc.com'
  const adminEmail1 = process.env.ORDER_NOTIFICATION_EMAIL || 'info@novainkllc.com'
  const adminEmail2 = process.env.ADMIN_NOTIFICATION_EMAIL || 'vitomaxwell05@gmail.com'

  if (!apiKey) {
    console.warn('[Email Warning]: RESEND_API_KEY is not configured in server environment. Skipping email dispatch.')
    return { success: false, error: 'RESEND_API_KEY missing from environment.' }
  }

  const customerEmail = orderData.customer?.email
  const adminRecipients = Array.from(new Set([adminEmail1, adminEmail2].filter(Boolean)))

  const results = {
    customerEmailSent: false,
    adminEmailSent: false,
    errors: []
  }

  // 1. Send Customer Order Confirmation Email
  if (customerEmail) {
    try {
      const { html, text } = renderCustomerEmail(orderData)
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Nova Ink LLC <${fromEmail}>`,
          to: [customerEmail],
          subject: `Order Confirmation - ${orderData.orderId} | Nova Ink LLC`,
          html,
          text
        })
      })

      const resData = await res.json()
      if (res.ok && !resData.error) {
        results.customerEmailSent = true
      } else {
        const errDetail = resData.message || resData.error || JSON.stringify(resData)
        console.error('[Resend Customer Email Error]:', errDetail)
        results.errors.push(`Customer email: ${errDetail}`)
      }
    } catch (err) {
      console.error('[Resend Customer Email Exception]:', err)
      results.errors.push(`Customer email exception: ${err.message}`)
    }
  }

  // 2. Send Admin Notification Email to info@novainkllc.com AND vitomaxwell05@gmail.com
  if (adminRecipients.length > 0) {
    try {
      const { html, text } = renderAdminEmail(orderData)
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Nova Ink LLC Orders <${fromEmail}>`,
          to: adminRecipients,
          subject: `[NEW ORDER] ${orderData.orderId} - ${orderData.paymentMethod} (${orderData.paymentStatus})`,
          html,
          text
        })
      })

      const resData = await res.json()
      if (res.ok && !resData.error) {
        results.adminEmailSent = true
      } else {
        const errDetail = resData.message || resData.error || JSON.stringify(resData)
        console.error('[Resend Admin Email Error]:', errDetail)
        results.errors.push(`Admin email: ${errDetail}`)
      }
    } catch (err) {
      console.error('[Resend Admin Email Exception]:', err)
      results.errors.push(`Admin email exception: ${err.message}`)
    }
  }

  return {
    success: results.customerEmailSent || results.adminEmailSent,
    ...results
  }
}
