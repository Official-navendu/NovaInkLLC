import React from 'react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import { MessageSquare, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 text-slate-900 overflow-hidden shadow-md shadow-slate-200/50 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block">
              NEED ASSISTANCE?
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
              FIND THE RIGHT PRINTER <br />
              <span className="text-[#0096D6]">WITH CONFIDENCE</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl leading-relaxed">
              Our experts are ready to guide you to the ideal printing solution tailored for your home, office, or business workspace.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="uppercase font-extrabold text-xs tracking-wider px-8 py-3.5 shadow-md shadow-[#0096D6]/20" icon={ArrowRight} iconPosition="right">
                  Shop Bestsellers
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="uppercase font-extrabold text-xs tracking-wider px-7 py-3.5 border-2 border-[#0096D6] text-[#0096D6] hover:bg-blue-50">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Printer Graphics & Callout Bubble */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Floating Speech Bubble Accent */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
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
