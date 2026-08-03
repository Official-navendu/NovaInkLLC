import React from 'react'
import { Printer, Tag, Truck, Headphones } from 'lucide-react'

export function WhyChoose() {
  const iconMap = {
    Printer: Printer,
    Tag: Tag,
    Truck: Truck,
    Headphones: Headphones
  }

  const whyChooseList = [
    {
      id: 1,
      icon: Printer,
      title: 'WIDE SELECTION',
      description: 'A large range of printers and supplies.'
    },
    {
      id: 2,
      icon: Tag,
      title: 'COMPETITIVE PRICING',
      description: 'Best deals with premium quality.'
    },
    {
      id: 3,
      icon: Truck,
      title: 'FAST & RELIABLE SHIPPING',
      description: 'Quick delivery you can count on.'
    },
    {
      id: 4,
      icon: Headphones,
      title: 'EXPERT SUPPORT',
      description: 'Friendly support whenever you need it.'
    }
  ]

  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#130E26] border border-[#261E45] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-extrabold text-[#3897F0] uppercase tracking-widest bg-[#3897F0]/10 border border-[#3897F0]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
            OUR ADVANTAGES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
            WHY CHOOSE <span className="text-[#3897F0]">NOVA INK LLC?</span>
          </h2>
        </div>

        {/* 4 Feature Cards with Restored Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseList.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                className="bg-[#191330] border-2 border-[#3897F0]/30 hover:border-[#3897F0] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3897F0]/20 shadow-md shadow-black/40 group flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white text-[#3897F0] flex items-center justify-center mb-5 shadow-md group-hover:bg-[#3897F0] group-hover:text-white transition-colors duration-300 shrink-0">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white mb-2 uppercase tracking-wide group-hover:text-[#3897F0] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
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
