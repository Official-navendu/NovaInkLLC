import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { productTabs, productsData } from '../../data/products'
import { ProductCard } from '../ui/ProductCard'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Products() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = activeTab === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeTab || activeTab === 'all')

  // Display 15 products in 3 rows × 5 columns on desktop
  const displayedProducts = filteredProducts.slice(0, 15)

  return (
    <section id="shop" className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            SHOP BESTSELLING <span className="text-[#0096D6]">PRINTERS</span>
          </h2>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center text-[11px] font-extrabold text-slate-700 hover:text-[#0096D6] uppercase tracking-wider transition-colors gap-1"
        >
          <span>View All Products</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {productTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer select-none',
              activeTab === tab.id
                ? 'bg-[#0096D6] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Static Product Grid: 5 cols (xl), 4 cols (lg), 3 cols (md), 2 cols (sm), 1 col (base) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
