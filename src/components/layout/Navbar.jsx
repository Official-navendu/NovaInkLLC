import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useCart } from '../../context/CartContext'
import { Button } from '../ui/Button'
import { CartDrawer } from '../cart/CartDrawer'
import { SearchModal } from '../search/SearchModal'
import { AccountDropdown } from '../account/AccountDropdown'
import { cn } from '../../utils/cn'

export function Navbar() {
  const scrollPosition = useScrollPosition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrolled = scrollPosition > 15
  const { totalItems, setIsCartOpen, setIsSearchOpen, setIsAccountOpen } = useCart()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About Us', href: '/about' },
    { name: 'Support', href: '/support' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-slate-100'
            : 'bg-white py-2.5 border-b border-slate-100/80'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            
            {/* Header Logo Left - Increased size by 20% for optimal visibility & balance */}
            <Link to="/" className="flex items-center group py-0.5 shrink-0">
              <img
                src="/images/header-logo.png"
                alt="Nova Ink LLC"
                className="h-11 sm:h-13 md:h-14 lg:h-15 w-auto max-w-[210px] sm:max-w-[240px] md:max-w-[270px] lg:max-w-[290px] object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Menu Center (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-semibold transition-colors duration-200 hover:text-[#0096D6]',
                      isActive ? 'text-[#0096D6] font-bold border-b-2 border-[#0096D6] pb-0.5' : 'text-slate-700'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Icons & Primary CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="p-2 text-slate-700 hover:text-[#0096D6] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsAccountOpen(prev => !prev)}
                aria-label="Account"
                className="p-2 text-slate-700 hover:text-[#0096D6] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Cart"
                className="p-2 text-slate-700 hover:text-[#0096D6] hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#0096D6] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link to="/contact">
                <Button variant="primary" size="sm" className="font-bold tracking-wide rounded-full px-5 py-2">
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Cart"
                className="p-2 text-slate-700 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#0096D6] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#0096D6] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Account Dropdown */}
          <AccountDropdown />
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'text-base font-semibold py-2 px-3 rounded-lg transition-colors',
                      isActive
                        ? 'text-[#0096D6] bg-blue-50/50 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsSearchOpen(true); }}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 py-2 px-3 hover:bg-slate-50 rounded-lg"
                >
                  <Search className="w-4 h-4 text-[#0096D6]" /> Search Products
                </button>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full font-bold">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
    </>
  )
}
