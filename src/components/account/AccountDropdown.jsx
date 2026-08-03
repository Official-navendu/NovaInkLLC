import React, { useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { User, LogIn, UserPlus, Package, Heart, LogOut, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AccountDropdown() {
  const { isAccountOpen, setIsAccountOpen } = useCart()
  const dropdownRef = useRef(null)

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

  if (!isAccountOpen) return null

  const menuItems = [
    { icon: LogIn, label: 'Login', href: '/about' },
    { icon: UserPlus, label: 'Register', href: '/about' },
    { icon: User, label: 'My Profile', href: '/about' },
    { icon: Package, label: 'My Orders', href: '/support' },
    { icon: Heart, label: 'Wishlist', href: '/shop' }
  ]

  return (
    <div
      ref={dropdownRef}
      className="absolute right-12 top-14 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
        <p className="text-xs font-extrabold text-slate-900 uppercase">Welcome to Nova Ink</p>
        <p className="text-[11px] text-slate-500 font-normal">Manage your account & orders</p>
      </div>

      <div className="py-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsAccountOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#3897F0] hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          )
        })}
      </div>

      <div className="pt-1 border-t border-slate-100">
        <button
          onClick={() => {
            alert('Logged Out (Frontend Demo)')
            setIsAccountOpen(false)
          }}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50/60 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
