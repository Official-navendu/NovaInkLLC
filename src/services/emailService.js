// Transactional Email Service
// All email dispatches execute server-side in Google Apps Script upon posting actions.

export async function sendWelcomeEmail(user) {
  return { success: true, mode: 'server_side_dispatched' }
}

export async function sendCustomerOrderEmail(order) {
  return { success: true, mode: 'server_side_dispatched' }
}

export async function sendAdminOrderEmail(order) {
  return { success: true, mode: 'server_side_dispatched' }
}
