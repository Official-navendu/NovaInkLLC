import React from 'react'
import { statsData } from '../../data/stats'

export function Stats() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="relative rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-2xl overflow-hidden bg-cover bg-center bg-no-repeat sm:bg-fixed bg-scroll"
        style={{
          backgroundImage: `url('/images/backgrounds/stats-bg.jpg')`
        }}
      >
        {/* Brand Color Overlay (approx 65% opacity for text readability & visible background image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0096D6]/75 via-[#0B132B]/80 to-[#0096D6]/75 pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center relative z-10">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105 ${
                index !== statsData.length - 1 ? 'md:border-r md:border-white/20' : ''
              }`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-blue-100 uppercase tracking-wider mt-2 drop-shadow-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
