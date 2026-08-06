import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { Stats } from '../components/sections/Stats'
import { UserCheck, Award, ShieldCheck, TrendingUp, Home, Building2, GraduationCap, Stethoscope, Factory, Store } from 'lucide-react'

export function AboutUs() {
  const values = [
    {
      icon: UserCheck,
      title: 'Customer First',
      desc: "Every decision we make starts with one question: What's best for our customers? From product selection to post-purchase support, we're committed to making your experience simple, transparent, and dependable."
    },
    {
      icon: Award,
      title: 'Quality You Can Trust',
      desc: "We believe reliable products create reliable results. That's why we carefully select printers and printing essentials that meet our standards for performance, durability, and everyday value."
    },
    {
      icon: ShieldCheck,
      title: 'Honest & Transparent',
      desc: "Trust is earned through honesty. We believe in clear product information, fair pricing, and straightforward communication, so you always know exactly what you're buying."
    },
    {
      icon: TrendingUp,
      title: 'Always Improving',
      desc: "Technology never stands still, and neither do we. We're constantly expanding our selection, improving our service, and finding better ways to help our customers print with confidence."
    }
  ]

  const whoWeServe = [
    {
      icon: Home,
      title: 'Home Users',
      desc: 'Reliable printers and supplies designed for everyday home printing, remote work, and personal projects.'
    },
    {
      icon: Building2,
      title: 'Small Businesses',
      desc: 'Affordable and efficient printing solutions that help small businesses stay productive and professional.'
    },
    {
      icon: GraduationCap,
      title: 'Schools & Students',
      desc: 'Dependable printers and supplies for assignments, educational resources, and classroom needs.'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare',
      desc: 'Reliable printing equipment for medical offices, clinics, and healthcare professionals who require consistent performance.'
    },
    {
      icon: Factory,
      title: 'Enterprises',
      desc: 'Scalable printing solutions built to support high-volume workflows and large business operations.'
    },
    {
      icon: Store,
      title: 'Retail',
      desc: 'Efficient printing products for invoices, labels, receipts, and day-to-day retail operations.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#172136] to-[#0B132B] border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              ABOUT NOVA INK LLC
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Making Printing Simpler, <span className="text-[#0096D6]">One Order at a Time</span>
            </h1>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto text-center sm:text-left">
              <p>
                At Nova Ink LLC, we know that buying a printer or finding the right printing supplies shouldn't be confusing. Whether you're setting up a home office, running a growing business, or simply replacing an ink cartridge, you deserve products you can rely on and a shopping experience that's easy from start to finish.
              </p>
              <p>
                That's why we created Nova Ink LLC—to bring together dependable printing solutions, fair pricing, and customer service that puts your needs first. Instead of overwhelming you with endless options, we focus on offering products that deliver the performance, quality, and reliability you expect.
              </p>
              <p>
                Every customer has different printing needs, and we're here to help you find the right solution with confidence. Our goal isn't just to sell printers—it's to help you print smarter, work more efficiently, and keep your day moving without interruptions.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              OUR PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              OUR CORE <span className="text-[#0096D6]">VALUES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-[#0096D6] transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center mb-4 group-hover:bg-[#0096D6] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-[#0096D6] transition-colors">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Who We Serve Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
                OUR AUDIENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">
                Who We <span className="text-[#0096D6]">Serve</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Whether you're printing at home, managing a growing business, or supporting a large organization, Nova Ink LLC provides dependable printing solutions tailored to your needs. We proudly serve customers across a wide range of industries with quality products and reliable service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whoWeServe.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-[#0096D6] transition-all hover:-translate-y-0.5 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center mb-4 group-hover:bg-[#0096D6] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mb-1.5 uppercase tracking-wide group-hover:text-[#0096D6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Company Stats Section (Reused Homepage Stats Component) */}
        <Stats />

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
