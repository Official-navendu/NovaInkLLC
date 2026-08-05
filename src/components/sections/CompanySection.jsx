import React from 'react'
import { Award, Tag, Compass, UserCheck } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

export function CompanySection() {
  const cards = [
    {
      icon: Award,
      title: 'Quality You Can Trust',
      description: 'Every product we offer is carefully sourced to deliver reliable performance, consistent results, and long-lasting value.'
    },
    {
      icon: Tag,
      title: 'Competitive Pricing',
      description: 'Enjoy fair pricing on printers, ink, toner, paper, and accessories without compromising on quality or service.'
    },
    {
      icon: Compass,
      title: 'Expert Product Guidance',
      description: 'Not sure which printer fits your needs? Our team is here to help you choose the right solution for your home, office, or business.'
    },
    {
      icon: UserCheck,
      title: 'Dedicated Customer Support',
      description: "From product questions to post-purchase assistance, we're committed to providing responsive support whenever you need it."
    }
  ]

  return (
    <section className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 lg:p-14 text-slate-900 shadow-xl relative overflow-hidden">
        {/* Soft Background Radial Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0096D6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

          {/* Left Side Info */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block">
              CUSTOMER-FIRST APPROACH
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
              Your Trusted Partner for <span className="text-[#0096D6]">Reliable Printing Solutions</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Upgrading your setup or just grabbing some extra ink? We’ve got you covered. At Nova Ink LLC, we make it easy to find reliable printers and supplies without the stress. We hand-pick everything we carry, from home office gear to business essentials, so you can focus on your work knowing you’re using quality products that won’t let you down.
            </p>

            <div className="pt-2">
              <Link to="/shop">
                <Button variant="primary" size="md" className="uppercase font-extrabold text-xs tracking-wider px-6 py-3 shadow-md shadow-[#0096D6]/20">
                  Shop Now!
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side 4 Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="bg-slate-50 border-2 border-slate-200/80 hover:border-[#0096D6] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0096D6]/10 shadow-sm group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0096D6] mb-4 group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1.5 uppercase tracking-wide group-hover:text-[#0096D6] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
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
