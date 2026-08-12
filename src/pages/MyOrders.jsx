import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { PackageCheck, Truck, ShoppingBag, ChevronRight, X } from 'lucide-react'
import { getUserOrders } from '../services/apiService'

export function MyOrders() {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  const formatMoney = (val) => {
    if (typeof val === 'number') return val.toFixed(2)
    if (typeof val === 'string') {
      const clean = val.replace(/[^0-9.]/g, '')
      const num = parseFloat(clean)
      return isNaN(num) ? '0.00' : num.toFixed(2)
    }
    return Number(val || 0).toFixed(2)
  }

  useEffect(() => {
    async function loadOrders() {
      try {
        const storedUser = localStorage.getItem('nova_ink_user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          const fetchedOrders = await getUserOrders(user.email)
          setOrders(fetchedOrders)
        } else {
          const allOrders = JSON.parse(localStorage.getItem('nova_ink_orders') || '[]')
          setOrders(allOrders)
        }
      } catch (e) {
        console.error('Failed to load orders:', e)
      }
    }

    loadOrders()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            ACCOUNT HISTORY
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            MY ORDER <span className="text-[#0096D6]">HISTORY</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track, view receipts, and review your past HP printer and supply purchases.
          </p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.orderId}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md shadow-slate-200/40 hover:border-[#0096D6] transition-all duration-200"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] border border-blue-100 flex items-center justify-center shrink-0">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 uppercase block">
                        Order #{ord.orderId}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Placed on {ord.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-emerald-700 bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-full font-extrabold text-xs">
                      {ord.status || 'Order Confirmed'}
                    </span>
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="text-xs font-extrabold text-[#0096D6] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body - Products List / Thumbnails */}
                {ord.items && ord.items.length > 0 ? (
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ord.items.map((item, idx) => (
                      <div key={item.id || idx} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-slate-200 shrink-0" />}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Qty: {item.quantity} × ${formatMoney(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-3 px-1">
                    <p className="text-xs font-semibold text-slate-700">Products: <span className="font-normal text-slate-500">{ord.products || 'N/A'}</span></p>
                  </div>
                )}

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-medium text-slate-600 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0096D6]" />
                    <span>Payment: <strong className="text-slate-900">{ord.paymentMethod || 'Pay on Delivery (POD)'}</strong></span>
                  </div>
                  <div>
                    <span>Total Amount: <strong className="text-[#0096D6] text-sm font-black">${formatMoney(ord.total)}</strong></span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center shadow-md shadow-slate-200/40 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0096D6] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900 uppercase mb-2">NO PAST ORDERS FOUND</h2>
            <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">
              You haven't placed any orders yet. Explore our genuine HP collection and enjoy fast delivery.
            </p>
            <Link to="/shop">
              <button className="bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs uppercase px-8 py-3.5 rounded-xl shadow-md cursor-pointer">
                Explore HP Collection
              </button>
            </Link>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
            <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase">Order Details #{selectedOrder.orderId}</h3>
                  <p className="text-xs text-slate-500 font-medium">Placed on {selectedOrder.date}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase text-slate-900">Purchased Items</h4>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, idx) => (
                    <div key={item.id || idx} className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-slate-200 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                        <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ${formatMoney(item.price)}</p>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 shrink-0">${formatMoney((item.price || 0) * (item.quantity || 1))}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-medium text-slate-800">{selectedOrder.products || 'N/A'}</p>
                  </div>
                )}
              </div>

              {/* Address & Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900 uppercase text-[11px] mb-1">Shipping Details</h4>
                  <p className="font-semibold text-slate-800">{selectedOrder.customerName || `${selectedOrder.billing?.firstName || ''} ${selectedOrder.billing?.lastName || ''}`.trim() || 'Valued Customer'}</p>
                  <p className="text-slate-600">{selectedOrder.shippingAddress || selectedOrder.billingAddress || selectedOrder.billing?.address || 'N/A'}</p>
                  <p className="text-slate-600">Email: {selectedOrder.email || selectedOrder.billing?.email}</p>
                  <p className="text-slate-600">Phone: {selectedOrder.phone || selectedOrder.billing?.phone || 'N/A'}</p>
                </div>

                <div className="space-y-1 text-right">
                  <h4 className="font-extrabold text-slate-900 uppercase text-[11px] mb-1">Order Totals</h4>
                  <p className="text-slate-600">Payment: <span className="font-bold text-slate-900">{selectedOrder.paymentMethod || 'Pay on Delivery (POD)'}</span></p>
                  <p className="text-slate-600">Shipping: <span className="font-bold text-emerald-600">FREE</span></p>
                  <p className="text-slate-900 text-sm font-black pt-1">Grand Total: <span className="text-[#0096D6]">${formatMoney(selectedOrder.total)}</span></p>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
