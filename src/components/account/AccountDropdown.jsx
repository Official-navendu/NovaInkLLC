import React, { useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { User, LogIn, UserPlus, Package, Heart, LogOut, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AccountDropdown() {
  const { isAccountOpen, setIsAccountOpen } = useCart()
  const dropdownRef = useRef(null)

  const storedUser = localStorage.getItem('nova_ink_user')
  const user = storedUser ? JSON.parse(storedUser) : null

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsAccountOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAccountOpen) {
        setIsAccountOpen(false)
      }
    }
    if (isAccountOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAccountOpen, setIsAccountOpen])

  const handleLogout = () => {
    localStorage.removeItem('nova_ink_user')
    localStorage.removeItem('nova_ink_token')
    setIsAccountOpen(false)
    window.location.href = '/login'
  }

  if (!isAccountOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute right-12 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
        {user ? (
          <>
            <p className="text-xs font-black text-slate-900 truncate">
              {user.name || user.firstName || 'User Account'}
            </p>
            <p className="text-[11px] text-slate-500 font-medium truncate">{user.email}</p>
          </>
        ) : (
          <>
            <p className="text-xs font-extrabold text-slate-900 uppercase">Welcome to Nova Ink</p>
            <p className="text-[11px] text-slate-500 font-normal">Manage your account & orders</p>
          </>
        )}
      </div>

      <div className="py-1">
        {!user ? (
          <>
            <Link
              to="/login"
              onClick={() => setIsAccountOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0096D6] hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <LogIn className="w-4 h-4 text-slate-400" />
                <span>Login</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
            <Link
              to="/register"
              onClick={() => setIsAccountOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0096D6] hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-4 h-4 text-slate-400" />
                <span>Register</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          </>
        ) : (
          <Link
            to="/my-orders"
            onClick={() => setIsAccountOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0096D6] hover:bg-blue-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-slate-400" />
              <span>My Orders</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          </Link>
        )}

        <Link
          to="/shop"
          onClick={() => setIsAccountOpen(false)}
          className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0096D6] hover:bg-blue-50/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-slate-400" />
            <span>Browse Products</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        </Link>
      </div>

      {user && (
        <div className="pt-1 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50/60 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
