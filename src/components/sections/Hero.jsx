import React from 'react'
import { Link } from 'react-router-dom'

export function Hero() {
  const features = [
    'Official HP Hardware',
    'Verified Warranty',
    'Fast Dispatch',
    'Dedicated Support'
  ]

  return (
    <section className="relative pt-24 lg:pt-32 pb-14 lg:pb-18 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/30 text-slate-900 overflow-hidden min-h-[580px] flex flex-col justify-center border-b border-slate-100">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#0096D6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0096D6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Side Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50/80 border border-blue-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs mb-3 font-['Manrope',sans-serif]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6]" />
                GENUINE HP PRINTING SOLUTIONS
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
                POWERFUL PRINTERS FOR <br />
                <span className="text-[#0096D6]">HOME & BUSINESS</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              Explore authentic HP printers, high-yield supplies, and dependable hardware engineered for high-speed document workflows and studio photo printing.
            </p>

            {/* Checklist items horizontal row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0096D6] flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-3 h-3 fill-current stroke-current stroke-[2]" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" fill="none" />
                    </svg>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/shop">
                <button className="bg-[#0096D6] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-[#0096D6]/25 hover:bg-[#0077B5] hover:shadow-xl hover:shadow-[#0096D6]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  SHOP HP CATALOG
                </button>
              </Link>
              <Link to="/solutions">
                <button className="bg-white border-2 border-[#0096D6] text-[#0096D6] font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl hover:bg-blue-50/80 hover:-translate-y-0.5 shadow-xs transition-all duration-200 cursor-pointer">
                  EXPLORE SOLUTIONS
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-xl relative">
              {/* Soft subtle backing frame accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/60 to-white/90 rounded-3xl -rotate-1 scale-95 border border-blue-100/60 -z-10 shadow-sm" />
              <img
                src="/images/hero_printer.webp"
                alt="Smart Printing Printer"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,150,214,0.12)] hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
