import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { Printer, ShieldCheck, Zap, Headphones, CheckCircle2 } from 'lucide-react'

export function Solutions() {
  const solutionsList = [
    {
      icon: Printer,
      title: 'Home & Small Office Printing',
      description: 'Compact, eco-friendly wireless printers designed for everyday document printing, homework, and family photo printing with ultra-low cost ink refills.'
    },
    {
      icon: Zap,
      title: 'Enterprise High-Volume Workflows',
      description: 'Heavy-duty laser and continuous ink tank systems capable of outputting 50+ pages per minute with advanced networking and departmental security.'
    },
    {
      icon: ShieldCheck,
      title: 'Managed Print Services (MPS)',
      description: 'Automated ink and toner replenishments, regular maintenance coverage, and fleet management to keep your business operating without downtime.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Technical Support',
      description: '24/7 priority phone and live support from certified printing specialists for troubleshooting, driver setups, and network configurations.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#172136] to-[#0B132B] border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              PRINTING SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              TAILORED PRINTING <span className="text-[#0096D6]">SOLUTIONS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Customized hardware, supplies, and support packages designed for personal, small business, and corporate enterprise needs.
            </p>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionsList.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center mb-6 group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-3 group-hover:text-[#0096D6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0096D6]">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6]" />
                    <span>Includes 2-Year Full Coverage Warranty</span>
                  </div>
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
