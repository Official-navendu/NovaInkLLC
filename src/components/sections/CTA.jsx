import React from 'react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import { MessageSquare, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-gradient-to-r from-[#130E26] via-[#1C1635] to-[#130E26] border border-[#261E45] rounded-3xl p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-2xl">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3897F0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-extrabold text-[#3897F0] uppercase tracking-widest bg-[#3897F0]/10 border border-[#3897F0]/20 px-3.5 py-1.5 rounded-full inline-block">
              NEED ASSISTANCE?
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              FIND THE RIGHT PRINTER <br />
              <span className="text-[#3897F0]">WITH CONFIDENCE</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
              Our experts are ready to guide you to the ideal printing solution tailored for your home, office, or business workspace.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="uppercase font-extrabold text-xs tracking-wider px-8 py-3.5 shadow-lg shadow-[#3897F0]/30" icon={ArrowRight} iconPosition="right">
                  Shop Bestsellers
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="uppercase font-extrabold text-xs tracking-wider px-7 py-3.5 border-white text-white hover:bg-white hover:text-[#130E26]">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Printer Graphics & Callout Bubble */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Floating Speech Bubble Accent */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2.5 z-20 animate-bounce duration-1000">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#3897F0] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase text-[#3897F0] leading-none">EXPERT ADVICE</p>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Personalized Solutions</p>
                </div>
              </div>

              {/* Printer Cutout Image */}
              <img
                src="/images/cta_printer.webp"
                alt="Printer Solutions"
                className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
