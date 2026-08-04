import React from 'react'
import { ShieldCheck, Award, Building2, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SupportCard() {
  const featurePoints = [
    {
      icon: ShieldCheck,
      title: 'Genuine HP Recommendations',
      desc: '100% factory sealed hardware & supplies.'
    },
    {
      icon: Award,
      title: 'Certified Product Specialists',
      desc: 'Expert assistance before and after purchase.'
    },
    {
      icon: Building2,
      title: 'Enterprise & Small Business Solutions',
      desc: 'Custom quotes for high-volume printer rollouts.'
    },
    {
      icon: Clock,
      title: 'Fast & Reliable Assistance',
      desc: 'Quick responses for driver & network setups.'
    }
  ]

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col justify-between h-full relative overflow-hidden group">
      
      <div>
        {/* Badge */}
        <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
          EXPERT PRINTING CONSULTATION
        </span>

        {/* Headline */}
        <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight leading-snug mb-3">
          GET TAILORED HP <span className="text-[#0096D6]">SOLUTIONS</span>
        </h3>

        {/* Paragraph */}
        <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
          Whether configuring a fleet of enterprise LaserJet printers or selecting high-yield tank supplies, our certified HP specialists provide personal guidance, cost analysis, and network setup advice.
        </p>

        {/* 4 Feature Points with Icons */}
        <div className="space-y-3.5 mb-6">
          {featurePoints.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-[#0096D6] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Support Printer Image Presentation */}
        <div className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 flex items-center justify-center">
          <img
            src="/images/cta_printer.webp"
            alt="HP Printing Consultation"
            className="w-full h-32 object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Primary & Secondary CTA Buttons */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <Link to="/contact" className="block w-full">
          <button className="w-full bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md shadow-[#0096D6]/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]">
            <span>Talk to an Expert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
        <Link to="/shop" className="block w-full">
          <button className="w-full bg-white border-2 border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6] hover:text-white font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer active:scale-[0.98]">
            Explore HP Collection
          </button>
        </Link>
      </div>

    </div>
  )
}
