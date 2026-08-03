import React from 'react'
import { Award, Tag, Compass, UserCheck } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

export function CompanySection() {
  const cards = [
    {
      icon: Award,
      title: 'Trusted Quality',
      description: 'Genuine products from top brands.'
    },
    {
      icon: Tag,
      title: 'Great Value',
      description: 'Competitive prices everyday.'
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Helping you choose the right solution.'
    },
    {
      icon: UserCheck,
      title: 'Customer First',
      description: "We're committed to your satisfaction."
    }
  ]

  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#130E26] border border-[#261E45] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden">
        {/* Soft Background Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3897F0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

          {/* Left Side Info */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-extrabold text-[#3897F0] uppercase tracking-widest bg-[#3897F0]/10 border border-[#3897F0]/20 px-3.5 py-1.5 rounded-full inline-block">
              AN INDEPENDENT
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              E-COMMERCE <span className="text-[#3897F0]">RETAILER</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Nova Ink LLC is your trusted source for top quality printers, supplies, and accessories. We partner with leading brands to bring you the best products at competitive prices.
            </p>

            <div className="pt-2">
              <Link to="/about">
                <Button variant="primary" size="md" className="uppercase font-extrabold text-xs tracking-wider px-6 py-3 shadow-lg shadow-[#3897F0]/20">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side 4 Feature Cards - High Visibility & Premium Borders */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="bg-[#191330] border-2 border-[#3897F0]/30 hover:border-[#3897F0] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3897F0]/20 shadow-md shadow-black/40 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#3897F0]/20 border border-[#3897F0]/40 flex items-center justify-center text-[#3897F0] mb-4 group-hover:bg-[#3897F0] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white mb-1.5 uppercase tracking-wide group-hover:text-[#3897F0] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {card.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
