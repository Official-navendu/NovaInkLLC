import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Truck, CreditCard, ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react'
import { placeOrder } from '../services/apiService'

export function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart()
  const navigate = useNavigate()

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    country: 'United States',
    state: '',
    city: '',
    zip: '',
    address: '',
    apartment: '',
    notes: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [error, setError] = useState('')

  // Pre-fill logged-in user details if available
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('nova_ink_user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setFormData(prev => ({
          ...prev,
          firstName: user.firstName || prev.firstName,
          lastName: user.lastName || prev.lastName,
          email: user.email || prev.email,
          phone: user.phone && user.phone !== 'N/A' ? user.phone : prev.phone
        }))
      }
    } catch (e) {
      console.warn('Logged in user pre-fill check exception:', e)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError('')

    const { firstName, lastName, email, phone, state, city, zip, address } = formData

    // Basic required field check
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !state.trim() || !city.trim() || !zip.trim() || !address.trim()) {
      setError('Please fill in all required fields marked with (*).')
      return
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    if (cartItems.length === 0) {
      setError('Your shopping cart is empty.')
      return
    }

    // Generate Order ID & Save
    const orderId = 'ORD-HP-' + Math.floor(100000 + Math.random() * 900000)
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      subtotal,
      shipping: 0,
      tax: 0,
      total: subtotal,
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'Order Confirmed',
      billing: { ...formData }
    }

    try {
      const existingOrders = JSON.parse(localStorage.getItem('nova_ink_orders') || '[]')
      const updatedOrders = [newOrder, ...existingOrders]
      localStorage.setItem('nova_ink_orders', JSON.stringify(updatedOrders))
      localStorage.setItem('nova_ink_latest_order', JSON.stringify(newOrder))

      // Route order to Apps Script API (Saves to Orders sheet + Apps script sends emails server-side)
      await placeOrder(newOrder)
    } catch (err) {
      console.error('Failed to process order integrations:', err)
    }

    clearCart()
    navigate(`/order-success?orderId=${orderId}`)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between">
        <Navbar />
        <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto w-full text-center flex-1 flex flex-col justify-center">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-10 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0096D6] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase mb-2">YOUR CART IS EMPTY</h1>
            <p className="text-xs text-slate-500 mb-6 font-medium">Add HP printers or supplies to proceed to checkout.</p>
            <Link to="/shop">
              <button className="bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs uppercase px-8 py-3.5 rounded-xl shadow-md cursor-pointer">
                Browse Shop
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            SECURE CHECKOUT
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            FINAL ORDER <span className="text-[#0096D6]">CHECKOUT</span>
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Billing & Shipping Information */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2">
              <span>Billing & Shipping Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Company Name <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  State / Region <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Order Notes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Special delivery instructions or gate code..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6]"
              />
            </div>
          </div>

          {/* Right Column: Order Summary & COD Payment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-3">
                Order Summary ({cartItems.length} items)
              </h2>

              {/* Items breakdown */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-extrabold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tracked Express Shipping:</span>
                  <span className="font-extrabold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sales Tax:</span>
                  <span className="font-extrabold text-slate-900">$0.00</span>
                </div>
                <div className="flex justify-between text-slate-900 text-base font-black pt-3 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-[#0096D6]">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method - Cash on Delivery */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="p-4 rounded-2xl bg-blue-50/80 border-2 border-[#0096D6] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked readOnly className="w-4 h-4 text-[#0096D6]" />
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 uppercase">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-slate-600 font-medium">Pay in cash upon doorstep delivery</p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-[#0096D6]" />
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                className="w-full bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#0096D6]/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Place Order (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Guaranteed Official HP Products</span>
              </div>

            </div>
          </div>

        </form>

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
