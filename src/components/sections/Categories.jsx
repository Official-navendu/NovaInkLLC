import React from 'react'
import { Link } from 'react-router-dom'
import { categoriesData } from '../../data/categories'
import { ChevronRight } from 'lucide-react'

export function Categories() {
  return (
    <section id="categories" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
          WHAT WE <span className="text-[#0096D6]">SELL</span>
        </h2>
        <Link
          to="/categories"
          className="inline-flex items-center text-[11px] font-extrabold text-slate-700 hover:text-[#0096D6] uppercase tracking-wider transition-colors gap-1"
        >
          <span>View All Categories</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Cards Grid: 1 on Mobile, 2 on Tablet, 4 on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categoriesData.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group text-center cursor-pointer hover:-translate-y-1"
          >
            <div>
              <div className="w-full h-36 sm:h-40 bg-slate-50 rounded-xl p-3 flex items-center justify-center mb-4 group-hover:bg-blue-50/30 transition-colors">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="max-h-28 sm:max-h-32 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase group-hover:text-[#0096D6] transition-colors mb-1.5">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
