import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { CheckCircle2, PackageCheck, ShoppingBag, Truck, ArrowRight, ShieldCheck } from 'lucide-react'

export function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const orderIdParam = searchParams.get('orderId')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const latestOrderStr = localStorage.getItem('nova_ink_latest_order')
      if (latestOrderStr) {
        const parsed = JSON.parse(latestOrderStr)
        if (!orderIdParam || parsed.orderId === orderIdParam) {
          setOrder(parsed)
          return
        }
      }
      // Fallback search in all orders
      const allOrdersStr = localStorage.getItem('nova_ink_orders')
      if (allOrdersStr) {
        const allOrders = JSON.parse(allOrdersStr)
        const found = allOrders.find(o => o.orderId === orderIdParam)
        if (found) setOrder(found)
      }
    } catch (e) {
      console.error('Failed to load order from localStorage:', e)
    }
  }, [orderIdParam])

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 text-center">
          
          {/* Checkmark Graphic */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-xs animate-in zoom-in duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            ORDER CONFIRMED
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">
            THANK YOU FOR YOUR ORDER!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mb-6 leading-relaxed">
            Your purchase of genuine HP printers and supplies has been successfully placed under Cash on Delivery.
          </p>

          {order ? (
            <div className="text-left space-y-6 max-w-2xl mx-auto border border-slate-200/80 rounded-2xl p-6 bg-slate-50/50 mb-8">
              
              {/* Order Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Order Number</span>
                  <span className="text-[#0096D6] font-black text-sm">{order.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Date Placed</span>
                  <span className="text-slate-800 font-bold">{order.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Payment Method</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#0096D6]" /> {order.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Status</span>
                  <span className="text-emerald-700 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-full font-extrabold text-[11px]">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items Purchased */}
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-3">Purchased Items</h3>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/70">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1 border border-slate-100 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Address & Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200/80 text-xs">
                <div>
                  <h3 className="font-black uppercase text-slate-900 text-[11px] mb-1.5">Shipping Address</h3>
                  <p className="text-slate-700 font-semibold">{order.billing?.firstName} {order.billing?.lastName}</p>
                  <p className="text-slate-600">{order.billing?.address}</p>
                  <p className="text-slate-600">{order.billing?.city}, {order.billing?.state} {order.billing?.zip}</p>
                  <p className="text-slate-600">{order.billing?.phone}</p>
                </div>

                <div className="space-y-1.5 text-right">
                  <h3 className="font-black uppercase text-slate-900 text-[11px] mb-1.5">Order Totals</h3>
                  <p className="text-slate-600">Subtotal: <span className="font-bold text-slate-900">${order.subtotal?.toFixed(2)}</span></p>
                  <p className="text-slate-600">Express Shipping: <span className="font-bold text-emerald-600">FREE</span></p>
                  <p className="text-slate-900 text-sm font-black pt-1">
                    Total Due (COD): <span className="text-[#0096D6]">${order.total?.toFixed(2)}</span>
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="py-6 text-xs text-slate-500 font-medium">
              Order receipt saved to your history. You can view all orders under your account profile.
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/my-orders">
              <button className="bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md shadow-[#0096D6]/20 transition-all cursor-pointer inline-flex items-center gap-2">
                <PackageCheck className="w-4 h-4" />
                <span>View My Orders</span>
              </button>
            </Link>
            <Link to="/shop">
              <button className="bg-white border-2 border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6] hover:text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2">
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
