import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Facebook, Linkedin, ChevronDown } from 'lucide-react'
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
    { name: 'About Us', href: '/about-us' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Categories', href: '/categories' },
    { name: 'Support', href: '/support' },
    { name: 'Contact Us', href: '/contact-us' }
  ]

  const supportLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: "Buyer's Guide", href: '/buyers-guide' }
  ]

  return (
    <footer className="bg-[#080D1A] text-slate-400 pt-16 sm:pt-20 pb-6 border-t border-[#2A3855] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Logo & Intro */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/footer-logo.png"
                alt="Nova Ink LLC"
                className="w-44 sm:w-52 md:w-56 lg:w-[230px] h-auto max-w-full object-contain"
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
            <ul className="space-y-3 text-[11px]">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                <a href="mailto:info@novainkllc.com" className="hover:text-[#0096D6] transition-colors">
                  info@novainkllc.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
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
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-white">PayPal</span>
            <span className="px-2 py-1 bg-[#172136] border border-[#2A3855] rounded font-bold text-[9px] text-white">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
