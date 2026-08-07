import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { Stats } from '../components/sections/Stats'
import { Heart, ShieldCheck, TrendingUp, Users, Home, Building2, GraduationCap, Stethoscope, Briefcase, ShoppingBag } from 'lucide-react'

export function AboutUs() {
  const values = [
    {
      icon: Heart,
      title: 'Customer-First Approach',
      desc: "Everything we do starts with our customers. From hand-picking reliable printers to offering clear, responsive support, we're dedicated to making your experience effortless and hassle-free."
    },
    {
      icon: Users,
      title: 'Quality & Reliability',
      desc: 'We don\'t believe in carrying products just to fill a catalog. We carefully select dependable printers and genuine supplies that deliver consistent, high-quality results.'
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
      desc: 'Fast, secure printing equipment for medical practices, clinics, and administrative offices.'
    },
    {
      icon: Briefcase,
      title: 'Corporate Offices',
      desc: 'High-volume printers and supplies built to handle demanding office workloads without interruption.'
    },
    {
      icon: ShoppingBag,
      title: 'Retail & Hospitality',
      desc: 'Durable, compact printing hardware for receipts, invoices, shipping labels, and daily operations.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner - Clean 2-Column Layout */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 mb-16 shadow-lg overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-about.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#172136]/90 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Side: All Existing Hero Text Content */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block">
                  ABOUT NOVA INK LLC
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Making Printing Simpler, <span className="text-[#0096D6]">One Order at a Time</span>
                </h1>
                <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
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

              {/* Right Side: Uploaded Image (No Extra Box or Container Wrapper) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <img
                  src="/images/about_hero_person.jpg"
                  alt="Nova Ink LLC Printing Specialists"
                  className="w-full h-auto max-h-[520px] object-contain rounded-3xl drop-shadow-2xl border border-white/20"
                />
              </div>

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

        {/* Who We Serve Section (Cleaned: Outer Container Card Removed) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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
                <div key={item.title} className="p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-[#0096D6] shadow-xs transition-all hover:-translate-y-0.5 group">
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

        {/* Company Stats Section (Reused Homepage Stats Component) */}
        <Stats />

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
