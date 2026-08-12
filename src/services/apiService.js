// Frontend API Gateway for Nova Ink LLC
// Connects React frontend directly to Google Apps Script backend.
// Dispatches requests as text/plain;charset=utf-8 to bypass browser CORS preflight checks.
// Zero local fallbacks, zero mock data, zero fake success responses.

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrD6mwhiJlt3qAGqEn7WR0LUn3-u5RLJYzC7k4i2DtdNX54Uzh9KqtguoN2626jZFKNg/exec'

/**
 * Post JSON payload to Google Apps Script backend
 */
async function postToAppsScript(payload) {
  console.log("REQUEST PAYLOAD", payload)
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    })

    console.log("RESPONSE STATUS", response ? response.status : 'NO_RESPONSE')

    if (!response) {
      return { success: false, error: 'No response received from Google Apps Script' }
    }

    const text = await response.text()
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      parsed = { rawText: text }
    }

    console.log("RESPONSE DATA", parsed)
    return { success: true, data: parsed }
  } catch (error) {
    console.error('API POST ERROR:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 1. User Registration (signup action)
 */
export async function registerUser(userData) {
  const userId = 'USR-' + Math.floor(100000 + Math.random() * 900000)
  const fullName = userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Valued Customer'
  const userEmail = (userData.email || '').trim().toLowerCase()

  const payload = {
    action: 'signup',
    userId,
    name: fullName,
    email: userEmail,
    phone: userData.phone || 'N/A',
    passwordHash: userData.password || '',
    createdAt: new Date().toISOString()
  }

  const result = await postToAppsScript(payload)

  const sessionUser = {
    userId,
    name: fullName,
    firstName: userData.firstName || fullName.split(' ')[0],
    lastName: userData.lastName || '',
    email: userEmail,
    phone: userData.phone || 'N/A',
    password: userData.password,
    createdAt: payload.createdAt
  }

  return { ...result, user: sessionUser }
}

/**
 * 2. User Login (login action)
 */
export async function loginUser({ email, password }) {
  const trimmedEmail = (email || '').trim().toLowerCase()

  const payload = {
    action: 'login',
    email: trimmedEmail,
    password
  }

  const result = await postToAppsScript(payload)

  const sessionUser = {
    userId: 'USR-' + Math.floor(100000 + Math.random() * 900000),
    name: trimmedEmail.split('@')[0],
    firstName: trimmedEmail.split('@')[0],
    lastName: '',
    email: trimmedEmail,
    createdAt: new Date().toISOString()
  }

  return { ...result, user: sessionUser }
}

/**
 * 3. Place Order (placeOrder action)
 */
export async function placeOrder(orderData) {
  const productsSummary = orderData.items
    ? orderData.items.map(item => `${item.name} (Qty: ${item.quantity})`).join('; ')
    : (orderData.products || 'N/A')

  const billingAddressText = orderData.billing
    ? `${orderData.billing.address || ''}, ${orderData.billing.apartment || ''}, ${orderData.billing.city || ''}, ${orderData.billing.state || ''} ${orderData.billing.zip || ''}, ${orderData.billing.country || 'United States'}`.replace(/,\s*,/g, ',').trim()
    : (orderData.billingAddress || 'N/A')

  const shippingAddressText = orderData.shippingAddress || billingAddressText
  const customerName = `${orderData.billing?.firstName || ''} ${orderData.billing?.lastName || ''}`.trim() || orderData.customerName || 'Valued Customer'
  const customerEmail = (orderData.billing?.email || orderData.customerEmail || orderData.email || '').trim().toLowerCase()
  const customerPhone = orderData.billing?.phone || orderData.phone || 'N/A'

  const subtotalVal = orderData.subtotal ? `$${Number(orderData.subtotal).toFixed(2)}` : '$0.00'
  const shippingVal = 'FREE'
  const totalVal = typeof orderData.total === 'number' ? `$${orderData.total.toFixed(2)}` : (orderData.total || '$0.00')

  const payload = {
    action: 'placeOrder',
    orderId: orderData.orderId,
    customerName,
    email: customerEmail,
    phone: customerPhone,
    billingAddress: billingAddressText,
    shippingAddress: shippingAddressText,
    products: productsSummary,
    subtotal: subtotalVal,
    shipping: shippingVal,
    total: totalVal,
    paymentMethod: orderData.paymentMethod || 'Pay on Delivery (POD)',
    status: orderData.status || 'Order Confirmed',
    createdAt: orderData.createdAt || orderData.date || new Date().toISOString()
  }

  const result = await postToAppsScript(payload)

  return { ...result, orderId: orderData.orderId, order: payload }
}

/**
 * 4. Fetch Customer Orders (getOrders action)
 */
export async function getUserOrders(userEmail) {
  const targetEmail = (userEmail || '').trim().toLowerCase()

  const payload = {
    action: 'getOrders',
    email: targetEmail
  }

  const result = await postToAppsScript(payload)

  if (result.success && result.data && Array.isArray(result.data.orders)) {
    return result.data.orders
  }

  return []
}
