import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ShieldCheck, Target, Heart, Award } from 'lucide-react'

export function AboutUs() {
  const values = [
    { icon: ShieldCheck, title: 'Authenticity & Trust', desc: 'We source exclusively from authorized distributors to guarantee genuine products.' },
    { icon: Target, title: 'Customer Satisfaction', desc: 'Dedicated to offering clear guidance, competitive rates, and responsive customer service.' },
    { icon: Heart, title: 'Eco-Friendly Tech', desc: 'Promoting energy-efficient laser printers and refillable mega-tank eco systems.' },
    { icon: Award, title: 'Quality Assurance', desc: 'Every product comes backed by official manufacturer warranties and guaranteed support.' }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#172136] to-[#0B132B] border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              ABOUT NOVA INK LLC
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              REDEFINING PRINTING <span className="text-[#0096D6]">EXCELLENCE</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Learn about our commitment to bringing top-quality printers, supplies, and personalized support to customers nationwide.
            </p>
          </div>
        </div>

        {/* Mission & Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-wider">OUR MISSION</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Empowering Businesses & Homes with Reliable Print Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Founded with a mission to simplify printer hardware purchasing, Nova Ink LLC provides curated, high-efficiency printing equipment and continuous supply services.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether equipping a home office with compact wireless all-in-ones or upgrading corporate infrastructure with continuous ink-tank printers, we deliver genuine products backed by dependable support.
              </p>
            </div>
            <div className="lg:col-span-6 flex justify-center">
              <img
                src="/images/hero_printer.webp"
                alt="Nova Ink LLC Mission"
                className="max-h-72 object-contain mix-blend-multiply drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">OUR CORE VALUES</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
