import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { FAQSection } from '../components/sections/FAQSection'
import { Truck, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react'

export function SupportPage() {
  const policies = [
    {
      icon: Truck,
      title: 'Fast & Reliable Shipping',
      desc: 'Free standard shipping on orders over $99. Most orders dispatch within 24 business hours.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Hassle-Free Returns',
      desc: 'Not completely satisfied? Return unused products in original packaging within 30 days for a full refund.'
    },
    {
      icon: ShieldCheck,
      title: '2-Year Hardware Warranty',
      desc: 'All hardware comes covered by official manufacturer warranties and lifetime customer support.'
    },
    {
      icon: HelpCircle,
      title: 'Live Technical Help',
      desc: 'Our printing experts are available via phone and email to guide driver installations and troubleshooting.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#3897F0] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#130E26] via-[#1C1635] to-[#130E26] border-b border-[#261E45] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#3897F0] bg-[#3897F0]/10 border border-[#3897F0]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              HELP & SUPPORT
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              CUSTOMER SUPPORT & <span className="text-[#3897F0]">FAQS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Find answers to frequently asked questions, learn about our policies, or get in touch with our team.
            </p>
          </div>
        </div>

        {/* Policy Badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#3897F0] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
