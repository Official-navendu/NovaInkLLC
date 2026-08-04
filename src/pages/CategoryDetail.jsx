import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/ui/ProductCard'
import { productsData } from '../data/products'
import { categoriesData } from '../data/categories'
import { Search, Filter, ArrowLeft } from 'lucide-react'

export function CategoryDetail() {
  const { categoryId } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  // Find category metadata or default to first
  const category = categoriesData.find(
    (c) => c.id === categoryId || c.slug === categoryId
  ) || categoriesData[0]

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    const targetId = category.id || categoryId
    return productsData
      .filter((product) => {
        const matchesCategory = product.category === targetId
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.modelNumber?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        return 0
      })
  }, [categoryId, category.id, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#172136] to-[#0B132B] border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-10 shadow-lg text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              OFFICIAL HP CATEGORY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              {category.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              {category.description} • Showing {categoryProducts.length} Premium HP Products
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          
          {/* Breadcrumb & Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0096D6] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Categories
            </Link>
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            
            {/* Category Product Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search in ${category.title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6] font-medium"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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

          {/* Product Grid (16+ HP Products per Category) */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-bold text-sm">
                No HP products found matching your search in this category.
              </p>
            </div>
          )}

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
