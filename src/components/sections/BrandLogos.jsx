import React from 'react'
import { brandsData } from '../../data/brands'

export function BrandLogos() {
  return (
    <section className="py-10 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-8">
          TOP BRANDS. TRUSTED QUALITY.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brandsData.map((brand) => (
            <div
              key={brand.id}
              className="w-full flex items-center justify-center p-2"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-9 sm:h-11 w-auto max-w-[140px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
