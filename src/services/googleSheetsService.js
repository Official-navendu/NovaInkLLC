// Compatibility export pointing to apiService
import { registerUser, placeOrder, getUserOrders } from './apiService'

export async function saveUserToSheet(userData) {
  return await registerUser(userData)
}

export async function saveOrderToSheet(orderData) {
  return await placeOrder(orderData)
}

export async function getUserOrdersFromSheet(userEmail) {
  return await getUserOrders(userEmail)
}
