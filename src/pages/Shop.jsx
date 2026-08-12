import React, { useState, useMemo, useEffect } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/ui/ProductCard'
import { Pagination } from '../components/ui/Pagination'
import { productsData } from '../data/products'
import { Search, Filter } from 'lucide-react'

export function Shop() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 12

  const categories = [
    { label: 'All', id: 'All' },
    { label: 'Home Printers', id: 'home-printers' },
    { label: 'Office Printers', id: 'office-printers' },
    { label: 'Ink & Toner', id: 'ink-toner' },
    { label: 'Printer Accessories', id: 'printer-accessories' }
  ]

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.modelNumber?.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory
        
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        return 0
      })
  }, [searchQuery, selectedCategory, sortBy])

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  // Calculate Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-10 shadow-lg text-center overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-shop.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#172136]/85 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              SHOP CATALOG
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              BROWSE ALL <span className="text-[#0096D6]">PRODUCTS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Explore our complete inventory of high-performance printers, genuine ink, toner, and accessories.
            </p>
          </div>
        </div>

        {/* Catalog Search & Filters Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6] font-medium"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#0096D6] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0096D6]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Count & Range Info */}
          <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products Found
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>

          {/* Product Grid (12 Products Per Page) */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-bold text-sm">No products found matching your filter criteria.</p>
            </div>
          )}

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
