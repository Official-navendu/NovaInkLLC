import React from 'react'
import { Printer, Tag, Truck, Headphones } from 'lucide-react'

export function WhyChoose() {
  const whyChooseList = [
    {
      id: 1,
      icon: Printer,
      title: 'AUTHENTIC HP GUARANTEE',
      description: 'Sourced directly from verified distributors with full 2-Year factory coverage.'
    },
    {
      id: 2,
      icon: Tag,
      title: 'COMPETITIVE TRANSPARENT RATES',
      description: 'Direct-to-consumer pricing with instant multi-pack savings and no hidden fees.'
    },
    {
      id: 3,
      icon: Truck,
      title: 'RAPID NATIONWIDE DISPATCH',
      description: 'Orders processed within 24 business hours with insured door-to-door tracking.'
    },
    {
      id: 4,
      icon: Headphones,
      title: 'EXPERT TECHNICAL ASSISTANCE',
      description: 'Certified specialists available to guide hardware selection, setups, and driver installations.'
    }
  ]

  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 lg:p-14 text-slate-900 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            THE NOVA INK ADVANTAGE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900">
            WHY CHOOSE <span className="text-[#0096D6]">NOVA INK LLC?</span>
          </h2>
        </div>

        {/* 4 Bordered Lightweight Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseList.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                className="bg-white border border-slate-200/90 hover:border-[#0096D6] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-xs group flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0096D6] flex items-center justify-center mb-5 group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300 shrink-0">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-[#0096D6] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
