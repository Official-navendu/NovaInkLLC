import React from 'react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import { MessageSquare, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-white via-slate-50/40 to-blue-50/20 border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 text-slate-900 overflow-hidden shadow-md shadow-slate-200/50 relative">
        
        {/* Soft Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0096D6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block font-['Manrope',sans-serif]">
              Printing Made Easy
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Not Sure Which Printer <br />
              <span className="text-[#0096D6]">Is Right for You?</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl leading-relaxed">
              Our team is here to help you compare models, understand key features, and choose the ideal printer for your home or business. Shop with confidence knowing you'll receive dependable products, competitive pricing, and dedicated support every step of the way.
            </p>

            {/* CTAs with verified high-contrast button states */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/shop">
                <button className="bg-[#0096D6] text-white hover:bg-[#0077B5] font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md shadow-[#0096D6]/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="bg-white border-2 border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6] hover:text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-xs transition-colors duration-200 cursor-pointer active:scale-[0.98]">
                  Contact Our Team
                </button>
              </Link>
            </div>
          </div>

          {/* Right Printer Graphics & Callout Bubble */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Floating Speech Bubble Accent */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#0096D6] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase text-[#0096D6] leading-none">EXPERT ADVICE</p>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Personalized Solutions</p>
                </div>
              </div>

              {/* Printer Cutout Image with Subtle Rounded Corners */}
              <img
                src="/images/cta_printer.webp"
                alt="Printer Solutions"
                className="w-full h-auto object-contain rounded-2xl relative z-10 drop-shadow-md"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
