import React from 'react'
import { statsData } from '../../data/stats'

export function Stats() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0B132B] border border-[#2A3855] rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0096D6]/5 via-transparent to-[#0096D6]/5 pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105 ${
                index !== statsData.length - 1 ? 'md:border-r md:border-[#2A3855]' : ''
              }`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-sm">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
