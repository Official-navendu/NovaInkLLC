import React from 'react'

export function Hero() {
  const features = [
    'Top Brands',
    'Secure Payments',
    'Fast Shipping',
    'Expert Support'
  ]

  return (
    <section className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 bg-[#130E26] text-white overflow-hidden min-h-[580px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left Side Content - Reference Image Theme */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-[#3897F0] uppercase tracking-wider block mb-2 font-['Manrope',sans-serif]">
                SMART PRINTING
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.1] uppercase">
                SOLUTIONS FOR <br />
                <span className="text-[#3897F0]">EVERY NEED</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-lg">
              High-performance printers. Premium quality. <br />
              Unmatched reliability.
            </p>

            {/* Checklist items horizontal row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#3897F0] flex items-center justify-center text-white shrink-0">
                    <svg className="w-2.5 h-2.5 fill-current stroke-current stroke-[2]" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" fill="none" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button className="bg-[#3897F0] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-lg shadow-[#3897F0]/30 hover:bg-[#2563EB] transition-all cursor-pointer">
                SHOP NOW
              </button>
              <button className="bg-transparent border-2 border-[#3897F0] text-[#3897F0] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg hover:bg-[#3897F0] hover:text-white transition-all cursor-pointer">
                EXPLORE SOLUTIONS
              </button>
            </div>
          </div>

          {/* Right Side Content - Attached Reference Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-xl">
              <img
                src="/images/hero_printer.webp"
                alt="Smart Printing Printer"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
