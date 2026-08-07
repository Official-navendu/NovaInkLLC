import React, { useEffect } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { 
  Printer, Zap, Home, Building2, Droplets, CheckCircle2, 
  ArrowRight, Sparkles, SlidersHorizontal, BookOpen 
} from 'lucide-react'

export function BuyersGuide() {
  useEffect(() => {
    document.title = "Buyer's Guide | Nova Ink LLC"
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Read Nova Ink LLC Buying Guide for helpful advice before you buy. Explore printer choices, ongoing printing costs, and expert printing tips.')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Subpage Hero Banner */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-shop.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#172136]/85 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block">
              BUYING GUIDE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Helpful Advice <span className="text-[#0096D6]">Before You Buy</span>
            </h1>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              <p>
                Choosing a printer shouldn't feel complicated. Whether you're shopping for your home, office, or business, this guide is here to help you understand the basics and make a decision you'll feel good about.
              </p>
              <p>
                You'll also find practical articles, comparisons, and tips covering everything from printer types to ongoing printing costs.
              </p>
            </div>

            {/* Hero Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/shop">
                <button className="bg-[#0096D6] text-white hover:bg-[#0077B5] font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-[#0096D6]/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
                  <span>Look for Best Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link to="/solutions">
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl backdrop-blur-md transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0096D6]" />
                  <span>Read Our Guides</span>
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* 2nd Section: Educational Guides & Comparisons */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Guide 1: How to Choose the Right Printer */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#0096D6] uppercase tracking-widest">GUIDE 1</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  How to Choose the Right Printer
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Choosing the right printer starts with understanding your printing habits. Before purchasing, consider these five key factors to ensure your printer matches your daily workflow:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0096D6]" /> Monthly Print Volume
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  If you print fewer than 100 pages a month, a compact inkjet printer is ideal. For printing hundreds or thousands of pages monthly, opt for a heavy-duty laser printer with a higher monthly duty cycle.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0096D6]" /> Print Speed (PPM)
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Print speed is measured in Pages Per Minute (PPM). Standard home printers average 10–15 PPM, while commercial office laser printers exceed 30–50 PPM.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0096D6]" /> Wireless & Mobile Printing
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Look for built-in Wi-Fi, Wi-Fi Direct, Ethernet, and mobile printing support (Apple AirPrint, Mopria) so you can print seamlessly from smartphones, tablets, and laptops.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0096D6]" /> Multifunction Capability
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Multifunction (MFP) printers handle printing, scanning, copying, and faxing in a single unit, saving valuable desk space and equipment costs.
                </p>
              </div>
            </div>
          </div>

          {/* Guide 2: Inkjet vs Laser Printers */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#0096D6] uppercase tracking-widest">GUIDE 2</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Inkjet vs. Laser Printers
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              The fundamental decision when buying a printer is choosing between Inkjet and Laser technology:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 uppercase">Inkjet Printers</h3>
                  <span className="text-[10px] font-extrabold bg-[#0096D6] text-white px-2.5 py-1 rounded-full uppercase">Best for Photos & Color</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <span>Produces vibrant color photos and smooth graphics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <span>Lower upfront hardware purchasing cost.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <span>Compact size fits easily on home desks.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-white uppercase">Laser Printers</h3>
                  <span className="text-[10px] font-extrabold bg-blue-400 text-slate-900 px-2.5 py-1 rounded-full uppercase">Best for Heavy Text & Office</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <span>Ultra-fast print speeds for high-volume jobs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <span>Razor-sharp monochrome text quality.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <span>Toner cartridges do not dry out over time.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guide 3: Home vs Office Printing */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#0096D6] uppercase tracking-widest">GUIDE 3</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Home vs. Office Printing
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#0096D6]" /> Home & Remote Work
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Home users prioritize compact dimensions, quiet operation, easy mobile printing for smartphones, and versatile photo printing for family projects and school homework.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0096D6]" /> Small Business & Enterprise
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Business environments require automatic double-sided printing (duplex), high-capacity paper trays (250+ sheets), Automatic Document Feeders (ADF), and network security features.
                </p>
              </div>
            </div>
          </div>

          {/* Guide 4: Understanding Ink & Toner */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#0096D6] uppercase tracking-widest">GUIDE 4</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Understanding Ink & Toner Costs
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <p>
                <strong>Ink Cartridges:</strong> Used by inkjet printers, ink cartridges contain liquid ink. High-Yield (XL) cartridges cost slightly more upfront but yield up to 2x-3x more printed pages, dramatically reducing your cost-per-page.
              </p>
              <p>
                <strong>Toner Cartridges:</strong> Used by laser printers, toner is a fine dry powder fused onto paper using heat. Toner cartridges produce thousands of pages per unit and never dry out, making them highly economical for heavy printing.
              </p>
            </div>
          </div>

          {/* CTA: Need Help Choosing? */}
          <div className="bg-gradient-to-br from-[#0B132B] via-[#172136] to-[#0B132B] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-[#2A3855]">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              NEED HELP CHOOSING?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
              Contact <span className="text-[#0096D6]">Our Team</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto mb-6 leading-relaxed">
              Still not sure which printer model or supply package fits your specific workflow? Contact our team of experts for personalized assistance.
            </p>

            <Link to="/contact">
              <button className="bg-[#0096D6] text-[#ffffff] hover:bg-[#0077B5] font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-[#0096D6]/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
                <span>Contact Our Team</span>
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
