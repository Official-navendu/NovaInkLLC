import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { categoriesData } from '../data/categories'
import { Link } from 'react-router-dom'
import { ArrowRight, Tag, Truck, Headphones, ShieldCheck } from 'lucide-react'

export function CategoriesPage() {
  const featurePoints = [
    { icon: ShieldCheck, title: 'Genuine Products' },
    { icon: Tag, title: 'Competitive Pricing' },
    { icon: Truck, title: 'Fast U.S. Shipping' },
    { icon: Headphones, title: 'Dedicated Customer Support' }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Unified Subpage Hero Banner */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-categories.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#172136]/85 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              SHOP BY CATEGORY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              Our <span className="text-[#0096D6]">Categories</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
              Whether you're replacing an old printer, stocking up on ink, or looking for office essentials, you'll find everything you need in one place. Browse by category to quickly find the products that fit your home, office, or business.
            </p>
          </div>
        </div>

        {/* Main Categories Grid (4 Categories) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="w-full h-48 bg-slate-50 rounded-xl p-4 flex items-center justify-center mb-6 overflow-hidden group-hover:bg-blue-50/20 transition-colors">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0096D6] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0096D6] group-hover:underline">
                    <span>Browse Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Informational Section 1: Need Help Choosing? (Cleaned: Outer Container Card Removed) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block">
                Need Help Choosing?
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Find the Right Printer <span className="text-[#0096D6]">for Your Needs</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Not every printer is built for the same job. Some are better for everyday home printing, while others are made for busy offices with higher print volumes. If you're not sure where to start, we'll help you find a printer that fits your needs and your budget.
              </p>

              <div className="pt-2">
                <Link to="/contact">
                  <button className="bg-[#0096D6] text-white hover:bg-[#0077B5] font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-[#0096D6]/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
                    <span>Contact Our Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column: High Quality Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md flex items-center justify-center">
                <img
                  src="/images/cta_printer.webp"
                  alt="Printer Consultation"
                  className="max-h-72 object-contain drop-shadow-md rounded-xl"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Informational Section 2: Everything You Need for Everyday Printing (Cleaned: Outer Container Card Removed) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="w-full h-64 sm:h-80 rounded-2xl border border-slate-200/80 shadow-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('/images/backgrounds/stats-bg.jpg')` }}>
                <div className="w-full h-full bg-[#0096D6]/40 backdrop-blur-xs flex items-center justify-center p-6 text-white text-center">
                  <div className="bg-[#0B132B]/80 p-5 rounded-2xl border border-white/20 backdrop-blur-md">
                    <p className="text-xs font-black uppercase tracking-widest text-[#0096D6] mb-1">NOVA INK LLC</p>
                    <p className="text-sm font-extrabold text-white">Complete Workspace Printing Solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text & 4 Feature Points */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block">
                Everything You Need for Everyday Printing
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Complete Printing Solutions <span className="text-[#0096D6]">for Home, Office & Business</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <p>
                  Whether you're printing homework, business reports, shipping labels, or family photos, having the right equipment makes all the difference. At Nova Ink LLC, we've brought together printers, ink, toner, paper, and accessories in one place, so you can spend less time searching and more time getting things done.
                </p>
                <p>
                  Our collection includes options for home users, small businesses, schools, and professional workspaces. From compact wireless printers to high-volume office models, you'll find products that fit the way you work.
                </p>
              </div>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {featurePoints.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-center gap-2.5 bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0 border border-blue-100">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                        {item.title}
                      </span>
                    </div>
                  )
                })}
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
