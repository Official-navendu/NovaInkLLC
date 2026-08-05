import React from 'react'
import { howItWorksData } from '../../data/howItWorks'
import { Search, ShoppingCart, PackageCheck, Printer } from 'lucide-react'

export function HowItWorks() {
  const iconMap = {
    Search,
    ShoppingCart,
    PackageCheck,
    Printer
  }

  return (
    <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-8">
        <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
          SIMPLE SHOPPING PROCESS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
          HOW IT <span className="text-[#0096D6]">WORKS</span>
        </h2>
      </div>

      <div className="relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-blue-200 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {howItWorksData.map((item) => {
            const Icon = iconMap[item.icon] || Search
            return (
              <div key={item.step} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-500/20 shadow-lg flex items-center justify-center text-[#0096D6] mb-6 group-hover:bg-[#0096D6] group-hover:text-white group-hover:border-[#0096D6] transition-all duration-300 transform group-hover:scale-110">
                  <Icon className="w-9 h-9" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
