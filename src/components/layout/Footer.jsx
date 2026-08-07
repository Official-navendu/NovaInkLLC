import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Linkedin, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Footer() {
  const [openSection, setOpenSection] = useState(null)

  const toggleMobileSection = (title) => {
    setOpenSection(openSection === title ? null : title)
  }

  const shopLinks = [
    { name: 'Home Printers', href: '/shop' },
    { name: 'Office Printers', href: '/shop' },
    { name: 'Ink & Toner', href: '/shop' },
    { name: 'Accessories', href: '/shop' },
    { name: 'Paper & Media', href: '/shop' }
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Policy', href: '/support' },
    { name: 'Return Policy', href: '/support' },
    { name: 'Privacy Policy', href: '/about' }
  ]

  const supportLinks = [
    { name: 'FAQs', href: '/support' },
    { name: 'Warranty', href: '/support' },
    { name: 'My Account', href: '/about' },
    { name: 'Order Tracking', href: '/support' },
    { name: 'Help Center', href: '/support' }
  ]

  return (
    <footer className="bg-[#080D1A] text-slate-400 pt-16 sm:pt-20 pb-6 border-t border-[#2A3855] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Logo & Intro - Significantly increased logo dimensions for maximum visibility */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/footer-logo.png"
                alt="Nova Ink LLC"
                className="w-52 sm:w-60 md:w-64 lg:w-72 h-auto max-w-full object-contain"
              />
            </Link>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-5 font-medium">
              Your trusted partner for printers, supplies, and accessories.
            </p>
            <div className="flex items-center gap-2.5">
              <a 
                href="https://www.facebook.com/novainkllc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="w-8 h-8 rounded-full bg-[#172136] border border-[#2A3855] hover:bg-[#0096D6] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/nova-ink-llc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="w-8 h-8 rounded-full bg-[#172136] border border-[#2A3855] hover:bg-[#0096D6] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <div
              className="flex justify-between items-center md:block cursor-pointer md:cursor-auto"
              onClick={() => toggleMobileSection('SHOP')}
            >
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
                SHOP
              </h4>
              <ChevronDown className="w-4 h-4 md:hidden text-slate-400" />
            </div>
            <ul className={cn('space-y-2 text-[11px]', openSection === 'SHOP' ? 'block' : 'hidden md:block')}>
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-[#0096D6] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY Column */}
          <div>
            <div
              className="flex justify-between items-center md:block cursor-pointer md:cursor-auto"
              onClick={() => toggleMobileSection('COMPANY')}
            >
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
                COMPANY
              </h4>
              <ChevronDown className="w-4 h-4 md:hidden text-slate-400" />
            </div>
            <ul className={cn('space-y-2 text-[11px]', openSection === 'COMPANY' ? 'block' : 'hidden md:block')}>
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-[#0096D6] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div>
            <div
              className="flex justify-between items-center md:block cursor-pointer md:cursor-auto"
              onClick={() => toggleMobileSection('SUPPORT')}
            >
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
                SUPPORT
              </h4>
              <ChevronDown className="w-4 h-4 md:hidden text-slate-400" />
            </div>
            <ul className={cn('space-y-2 text-[11px]', openSection === 'SUPPORT' ? 'block' : 'hidden md:block')}>
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-[#0096D6] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT US Column */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-3">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-[11px]">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0096D6] shrink-0 mt-0.5" />
                <a href="mailto:info@novainkllc.com" className="hover:text-[#0096D6] transition-colors">
                  info@novainkllc.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0096D6] shrink-0 mt-0.5" />
                <a href="tel:1234567890" className="hover:text-[#0096D6] transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0096D6] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  8787 Shenandoah Park Dr, Apt 826, Shenandoah, TX
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Payment Badges */}
        <div className="pt-6 border-t border-[#2A3855] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-500 font-medium">
            © 2025 Nova Ink LLC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-white">VISA</span>
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-white">Mastercard</span>
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-white">AMEX</span>
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-[#ffffff]">PayPal</span>
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-white">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
