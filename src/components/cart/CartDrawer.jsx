import React, { useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCartOpen, setIsCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#172136] backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0096D6]" />
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide">
                Your Shopping Cart ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded-lg p-1.5 border border-slate-200/60 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-xs truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mb-1.5">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0096D6] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mb-6 max-w-xs">
                  Looks like you haven't added any printers or supplies to your cart yet.
                </p>
                <Link to="/shop" onClick={() => setIsCartOpen(false)}>
                  <Button variant="primary" size="md" className="uppercase font-bold tracking-wider">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-4 shadow-lg">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-900 text-sm font-extrabold pt-2 border-t border-slate-100">
                  <span>Subtotal:</span>
                  <span className="text-[#0096D6] text-base">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full uppercase font-extrabold tracking-wider py-3 flex items-center justify-center gap-2"
                  onClick={() => {
                    alert('Order Placed Successfully! (Frontend Demo Checkout)')
                    clearCart()
                    setIsCartOpen(false)
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
