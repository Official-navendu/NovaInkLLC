import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { categoriesData } from '../data/categories'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#172136] to-[#0B132B] border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              PRODUCT CATEGORIES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              EXPLORE OUR <span className="text-[#0096D6]">CATEGORIES</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Find exactly what you need with our organized collection of printers, ink, toner, and accessories.
            </p>
          </div>
        </div>

        {/* Main Categories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.map((cat) => (
              <div
                key={cat.id}
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
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0096D6] group-hover:underline"
                  >
                    <span>Browse Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
