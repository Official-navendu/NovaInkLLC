import React from 'react'
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react'

export function FeatureStrip() {
  const features = [
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      subtitle: 'On Orders Over $99'
    },
    {
      icon: RotateCcw,
      title: '30-DAY RETURNS',
      subtitle: 'Hassle-Free Returns'
    },
    {
      icon: ShieldCheck,
      title: '2-YEAR WARRANTY',
      subtitle: 'On All Products'
    },
    {
      icon: Headphones,
      title: '24/7 SUPPORT',
      subtitle: "We're Here to Help"
    }
  ]

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-5 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {features.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 ${
                  idx !== 0 ? 'pt-3 sm:pt-0 sm:pl-5 lg:pl-6' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#3897F0] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    {item.subtitle}
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
