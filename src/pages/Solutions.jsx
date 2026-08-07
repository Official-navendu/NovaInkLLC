import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { Link } from 'react-router-dom'
import { 
  Home, Building2, Droplets, HelpCircle, 
  Gauge, DollarSign, Wifi, AlertCircle, Sparkles, Star, ArrowRight 
} from 'lucide-react'

export function Solutions() {
  const solutionCards = [
    {
      icon: Home,
      title: "Working from Home? We've Got You Covered.",
      description: "Find printers that fit your space, connect easily, and handle everyday printing without hassle."
    },
    {
      icon: Building2,
      title: "Growing Business? Print Without Slowing Down.",
      description: "Upgrade to printers designed for higher workloads and dependable performance."
    },
    {
      icon: Droplets,
      title: "Tired of Replacing Ink Too Often?",
      description: "Explore printers and supplies that help you get more pages from every cartridge."
    },
    {
      icon: HelpCircle,
      title: "Need Advice Before You Buy?",
      description: "We'll help you compare models and choose the right printer for your home or business."
    }
  ]

  const commonProblems = [
    {
      icon: Gauge,
      title: "Printer Too Slow",
      description: "Find faster printers designed to keep up with your daily workload."
    },
    {
      icon: DollarSign,
      title: "Ink Costs Too Much",
      description: "Discover cost-effective printing solutions and high-yield cartridges."
    },
    {
      icon: Wifi,
      title: "Wi-Fi Won't Connect",
      description: "Choose printers with reliable wireless connectivity and easy setup."
    },
    {
      icon: AlertCircle,
      title: "Paper Jams",
      description: "Reduce interruptions with dependable printers built for smoother performance."
    },
    {
      icon: Sparkles,
      title: "Poor Print Quality",
      description: "Get crisp text and vibrant color with quality printers and genuine supplies."
    },
    {
      icon: HelpCircle,
      title: "Not Sure Which Printer to Buy",
      description: "Our team can help you compare models and recommend the right option."
    }
  ]

  const testimonials = [
    {
      stars: 5,
      quote: "I wasn't sure which printer would work best for my home office, but the product details made it easy to compare my options. Ordering was simple, and my printer arrived sooner than I expected.",
      author: "Sarah M.",
      location: "Austin, TX"
    },
    {
      stars: 5,
      quote: "Finding compatible ink cartridges has always been frustrating, but Nova Ink LLC made the process straightforward. Everything fit perfectly, and the checkout experience was smooth.",
      author: "James R.",
      location: "Chicago, IL"
    },
    {
      stars: 5,
      quote: "Our small business needed a reliable printer without spending a fortune. We found exactly what we were looking for, and the support team answered all our questions before we placed the order.",
      author: "Melissa T.",
      location: "Charlotte, NC"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24">
        
        {/* SECTION 1 — HERO SECTION */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#172136] to-[#0B132B] border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Printing Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              Everything You Need to <span className="text-[#0096D6]">Keep Printing</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Whether you're replacing an old printer, setting up a new workspace, or stocking up on supplies, we're here to help you find reliable products that fit your needs and your budget.
            </p>
          </div>
        </div>

        {/* 4 Solution Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionCards.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center mb-6 group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300 shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900 mb-3 group-hover:text-[#0096D6] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SECTION 2 — COMMON PRINTING PROBLEMS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Common Printing Problems
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase mb-3">
                Problems We Help You <span className="text-[#0096D6]">Solve</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                From choosing the right printer to fixing everyday printing frustrations, we're here to help you find reliable solutions that keep you productive.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {commonProblems.map((prob, idx) => {
                const Icon = prob.icon
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/90 hover:border-[#0096D6] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-xs group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0096D6] flex items-center justify-center mb-4 group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-[#0096D6] transition-colors">
                        {prob.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {prob.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3 — CUSTOMER TESTIMONIALS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              WHAT OUR CUSTOMERS SAY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              REAL REVIEWS FROM <span className="text-[#0096D6]">REAL CUSTOMERS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6 italic">
                    {t.quote}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">— {t.author}</span>
                  <span className="text-slate-400 font-semibold">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4 — FINAL CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-gradient-to-br from-white via-slate-50/40 to-blue-50/20 border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 text-slate-900 overflow-hidden shadow-xl relative text-center sm:text-left">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0096D6]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block">
                  Need Help?
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                  Still Not Sure <span className="text-[#0096D6]">Where to Start?</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                  Tell us how you print, and we'll help you find the right printer, supplies, or accessories.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap justify-center lg:justify-end gap-3 pt-2 lg:pt-0">
                <Link to="/shop">
                  <button className="bg-[#0096D6] text-white hover:bg-[#0077B5] font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md shadow-[#0096D6]/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
                    <span>Browse Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="bg-white border-2 border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6] hover:text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition-colors duration-200 cursor-pointer">
                    Contact Our Team
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
