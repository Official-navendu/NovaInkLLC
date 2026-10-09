/**
 * Email Templates & HTML Escaping Utility for Nova Ink LLC
 * Renders responsive HTML and plain-text emails for Customer & Admin order notifications.
 */

// Helper to escape HTML special characters for safety (prevent HTML injection / XSS)
export function escapeHtml(str) {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Format currency in USD format
 */
function formatMoney(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0
  return '$' + num.toFixed(2)
}

/**
 * 1. Customer Order Confirmation Email (HTML & Text)
 */
export function renderCustomerEmail({ orderId, date, customer, items, subtotal, shipping, tax, total, paymentMethod, paymentStatus, billingAddress, notes }) {
  const safeCustomerName = escapeHtml(`${customer?.firstName || ''} ${customer?.lastName || ''}`.trim() || 'Valued Customer')
  const safeOrderId = escapeHtml(orderId)
  const safeDate = escapeHtml(date)
  const safePaymentMethod = escapeHtml(paymentMethod)
  const safePaymentStatus = escapeHtml(paymentStatus)
  const safeNotes = escapeHtml(notes || '')

  const addressLine = escapeHtml([
    billingAddress?.street || billingAddress?.addressLine1,
    billingAddress?.apartment || billingAddress?.addressLine2,
    billingAddress?.city,
    billingAddress?.state,
    billingAddress?.zip,
    'United States'
  ].filter(Boolean).join(', '))

  // Build items rows
  const itemRowsHtml = items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #1E293B; font-weight: 600;">
        ${escapeHtml(item.name)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #475569; text-align: center;">
        ${parseInt(item.quantity, 10)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #1E293B; text-align: right; font-weight: 700;">
        ${formatMoney(item.price)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #0096D6; text-align: right; font-weight: 800;">
        ${formatMoney((item.price || 0) * (item.quantity || 1))}
      </td>
    </tr>
  `).join('')

  const itemsText = items.map(item => `- ${item.name} (Qty: ${item.quantity}) @ ${formatMoney(item.price)} = ${formatMoney(item.price * item.quantity)}`).join('\n')

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${safeOrderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0096D6; padding: 28px 32px; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">
                NOVA INK LLC
              </h1>
              <p style="color: #E0F2FE; margin: 6px 0 0 0; font-size: 13px; font-weight: 500;">
                Official HP Printers & Printing Supplies
              </p>
            </td>
          </tr>

          <!-- Banner Greeting -->
          <tr>
            <td style="padding: 32px 32px 16px 32px;">
              <h2 style="color: #0F172A; margin: 0 0 8px 0; font-size: 20px; font-weight: 800;">
                Thank you for your order, ${safeCustomerName}!
              </h2>
              <p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.6;">
                We have received your order <strong>${safeOrderId}</strong> and are preparing it for shipment. Below is your complete order receipt and delivery summary.
              </p>
            </td>
          </tr>

          <!-- Order Overview Card -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #F1F5F9; border-radius: 12px; border: 1px solid #CBD5E1;">
                <tr>
                  <td width="50%" style="font-size: 12px; color: #64748B;">
                    <strong style="color: #0F172A;">Order ID:</strong> ${safeOrderId}<br>
                    <strong style="color: #0F172A;">Order Date:</strong> ${safeDate}
                  </td>
                  <td width="50%" style="font-size: 12px; color: #64748B;">
                    <strong style="color: #0F172A;">Payment Method:</strong> ${safePaymentMethod}<br>
                    <strong style="color: #0F172A;">Payment Status:</strong> <span style="color: #0096D6; font-weight: 700;">${safePaymentStatus}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <h3 style="color: #0F172A; margin: 0 0 12px 0; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                Ordered Products
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #E2E8F0; border-radius: 8px;">
                <thead>
                  <tr style="background-color: #F8FAFC;">
                    <th style="padding: 10px 12px; border-bottom: 2px solid #E2E8F0; font-size: 11px; text-transform: uppercase; color: #64748B; text-align: left;">Product</th>
                    <th style="padding: 10px 12px; border-bottom: 2px solid #E2E8F0; font-size: 11px; text-transform: uppercase; color: #64748B; text-align: center;">Qty</th>
                    <th style="padding: 10px 12px; border-bottom: 2px solid #E2E8F0; font-size: 11px; text-transform: uppercase; color: #64748B; text-align: right;">Unit Price</th>
                    <th style="padding: 10px 12px; border-bottom: 2px solid #E2E8F0; font-size: 11px; text-transform: uppercase; color: #64748B; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRowsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals Summary -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px;">
                <tr>
                  <td style="color: #64748B;">Subtotal:</td>
                  <td align="right" style="color: #0F172A; font-weight: 700;">${formatMoney(subtotal)}</td>
                </tr>
                <tr>
                  <td style="color: #64748B;">Tracked Express Shipping:</td>
                  <td align="right" style="color: #10B981; font-weight: 700;">FREE</td>
                </tr>
                <tr>
                  <td style="color: #64748B;">Sales Tax:</td>
                  <td align="right" style="color: #0F172A; font-weight: 700;">${formatMoney(tax || 0)}</td>
                </tr>
                <tr style="border-top: 2px solid #E2E8F0;">
                  <td style="color: #0F172A; font-size: 16px; font-weight: 900; padding-top: 8px;">Grand Total:</td>
                  <td align="right" style="color: #0096D6; font-size: 18px; font-weight: 900; padding-top: 8px;">${formatMoney(total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping & Billing Details -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
                <h4 style="color: #0F172A; margin: 0 0 8px 0; font-size: 13px; font-weight: 800; text-transform: uppercase;">
                  Shipping & Delivery Address
                </h4>
                <p style="color: #475569; margin: 0; font-size: 13px; line-height: 1.5;">
                  <strong>${safeCustomerName}</strong><br>
                  ${addressLine}<br>
                  Email: ${escapeHtml(customer?.email)}<br>
                  Phone: ${escapeHtml(customer?.phone)}
                </p>
                ${safeNotes ? `<p style="color: #64748B; margin: 10px 0 0 0; font-size: 12px; font-style: italic;">Note: ${safeNotes}</p>` : ''}
              </div>
            </td>
          </tr>

          <!-- Footer & Support -->
          <tr>
            <td style="background-color: #0F172A; padding: 24px 32px; text-align: center; border-top: 1px solid #334155;">
              <p style="color: #94A3B8; margin: 0 0 8px 0; font-size: 12px;">
                Need assistance with your order? Reply to this email or contact customer support at
                <a href="mailto:info@novainkllc.com" style="color: #38BDF8; text-decoration: none;">info@novainkllc.com</a>
              </p>
              <p style="color: #64748B; margin: 0; font-size: 11px;">
                &copy; ${new Date().getFullYear()} Nova Ink LLC. Official HP Business Partner. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = `
NOVA INK LLC - ORDER CONFIRMATION
Order ID: ${safeOrderId}
Date: ${safeDate}

Dear ${safeCustomerName},

Thank you for your order with Nova Ink LLC! We have received your order and are preparing it for shipment.

ORDER SUMMARY:
----------------------------------------
${itemsText}
----------------------------------------
Subtotal: ${formatMoney(subtotal)}
Shipping: FREE Express Shipping
Tax: ${formatMoney(tax || 0)}
Grand Total: ${formatMoney(total)}

PAYMENT INFORMATION:
Payment Method: ${safePaymentMethod}
Payment Status: ${safePaymentStatus}

SHIPPING ADDRESS:
${safeCustomerName}
${addressLine}
Email: ${customer?.email}
Phone: ${customer?.phone}
${safeNotes ? `Order Notes: ${safeNotes}\n` : ''}

NEED HELP?
Contact Nova Ink LLC support at info@novainkllc.com or visit https://novainkllc.com.

Thank you for choosing Nova Ink LLC!
  `.trim()

  return { html, text }
}

/**
 * 2. Admin Order Notification Email (HTML & Text)
 */
export function renderAdminEmail({ orderId, date, customer, items, subtotal, shipping, tax, total, paymentMethod, paymentStatus, squarePaymentId, billingAddress, notes }) {
  const safeCustomerName = escapeHtml(`${customer?.firstName || ''} ${customer?.lastName || ''}`.trim() || 'Customer')
  const safeOrderId = escapeHtml(orderId)
  const safeDate = escapeHtml(date)
  const safePaymentMethod = escapeHtml(paymentMethod)
  const safePaymentStatus = escapeHtml(paymentStatus)
  const safeSquareId = escapeHtml(squarePaymentId || 'N/A (Pay on Delivery)')
  const safeNotes = escapeHtml(notes || 'None')

  const addressLine = escapeHtml([
    billingAddress?.street || billingAddress?.addressLine1,
    billingAddress?.apartment || billingAddress?.addressLine2,
    billingAddress?.city,
    billingAddress?.state,
    billingAddress?.zip,
    'United States'
  ].filter(Boolean).join(', '))

  const itemRowsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #0F172A; font-weight: 700;">
        ${escapeHtml(item.name)} (ID: ${escapeHtml(item.productId || item.id)})
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-size: 13px; text-align: center; color: #334155;">
        ${parseInt(item.quantity, 10)}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-size: 13px; text-align: right; color: #0096D6; font-weight: 800;">
        ${formatMoney((item.price || 0) * (item.quantity || 1))}
      </td>
    </tr>
  `).join('')

  const itemsText = items.map(item => `- ${item.name} (ID: ${item.productId || item.id}) x${item.quantity} = ${formatMoney(item.price * item.quantity)}`).join('\n')

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification - ${safeOrderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: Arial, sans-serif; color: #334155;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #CBD5E1;">
          
          <!-- Admin Header -->
          <tr>
            <td style="background-color: #0F172A; padding: 20px 28px;">
              <h2 style="color: #38BDF8; margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase;">
                [NEW ORDER] ${safeOrderId}
              </h2>
              <p style="color: #94A3B8; margin: 4px 0 0 0; font-size: 12px;">
                Received: ${safeDate}
              </p>
            </td>
          </tr>

          <!-- Payment Badge -->
          <tr>
            <td style="padding: 20px 28px 10px 28px;">
              <div style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #1E40AF;">
                <strong>Payment Method:</strong> ${safePaymentMethod}<br>
                <strong>Payment Status:</strong> <span style="color: #0284C7; font-weight: 800;">${safePaymentStatus}</span><br>
                <strong>Square Payment ID:</strong> <code>${safeSquareId}</code>
              </div>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding: 10px 28px;">
              <h3 style="color: #0F172A; margin: 10px 0 6px 0; font-size: 14px; text-transform: uppercase; font-weight: 800;">
                Customer & Shipping Information
              </h3>
              <p style="font-size: 13px; color: #334155; margin: 0; line-height: 1.6; background-color: #F8FAFC; p-12; border-radius: 8px; padding: 12px; border: 1px solid #E2E8F0;">
                <strong>Name:</strong> ${safeCustomerName}<br>
                <strong>Email:</strong> ${escapeHtml(customer?.email)}<br>
                <strong>Phone:</strong> ${escapeHtml(customer?.phone)}<br>
                <strong>Address:</strong> ${addressLine}<br>
                <strong>Order Notes:</strong> ${safeNotes}
              </p>
            </td>
          </tr>

          <!-- Itemized Table -->
          <tr>
            <td style="padding: 10px 28px;">
              <h3 style="color: #0F172A; margin: 10px 0 6px 0; font-size: 14px; text-transform: uppercase; font-weight: 800;">
                Ordered Items
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #E2E8F0;">
                <thead>
                  <tr style="background-color: #F1F5F9;">
                    <th style="padding: 8px; font-size: 11px; text-align: left; color: #475569;">Item</th>
                    <th style="padding: 8px; font-size: 11px; text-align: center; color: #475569;">Qty</th>
                    <th style="padding: 8px; font-size: 11px; text-align: right; color: #475569;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRowsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Financial Breakdown -->
          <tr>
            <td style="padding: 10px 28px 24px 28px;">
              <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px; border-top: 2px solid #0F172A; padding-top: 8px;">
                <tr>
                  <td>Subtotal:</td>
                  <td align="right"><strong>${formatMoney(subtotal)}</strong></td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td align="right"><strong>FREE</strong></td>
                </tr>
                <tr>
                  <td>Grand Total:</td>
                  <td align="right" style="color: #0096D6; font-size: 16px; font-weight: 900;">${formatMoney(total)}</td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = `
NEW ORDER RECEIVED - NOVA INK LLC
Order ID: ${safeOrderId}
Date: ${safeDate}

CUSTOMER INFO:
Name: ${safeCustomerName}
Email: ${customer?.email}
Phone: ${customer?.phone}
Shipping Address: ${addressLine}
Order Notes: ${safeNotes}

PAYMENT DETAILS:
Method: ${safePaymentMethod}
Status: ${safePaymentStatus}
Square Payment ID: ${safeSquareId}

ITEMS ORDERED:
${itemsText}

TOTALS:
Subtotal: ${formatMoney(subtotal)}
Shipping: FREE
Grand Total: ${formatMoney(total)}
  `.trim()

  return { html, text }
}
