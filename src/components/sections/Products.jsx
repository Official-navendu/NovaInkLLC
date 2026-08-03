import React, { useState } from 'react'
import { productTabs, productsData } from '../../data/products'
import { ProductCard } from '../ui/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { cn } from '../../utils/cn'

export function Products() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = activeTab === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeTab || activeTab === 'all')

  return (
    <section id="shop" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            SHOP BESTSELLING <span className="text-[#3897F0]">PRINTERS</span>
          </h2>
        </div>
        <a
          href="#shop"
          className="inline-flex items-center text-[11px] font-extrabold text-slate-700 hover:text-[#3897F0] uppercase tracking-wider transition-colors gap-1"
        >
          <span>View All Products</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
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
                ? 'bg-[#3897F0] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Slider Carousel with Left/Right Arrows */}
      <div className="relative group/slider">
        <button
          id="products-prev"
          aria-label="Previous products"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center hover:bg-[#3897F0] hover:text-white hover:border-[#3897F0] transition-all cursor-pointer disabled:opacity-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          id="products-next"
          aria-label="Next products"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 flex items-center justify-center hover:bg-[#3897F0] hover:text-white hover:border-[#3897F0] transition-all cursor-pointer disabled:opacity-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '#products-prev',
            nextEl: '#products-next'
          }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
            1280: { slidesPerView: 5, spaceBetween: 16 }
          }}
          className="py-1"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
