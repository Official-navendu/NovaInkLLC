import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/ui/ProductCard'
import { productsData } from '../data/products'
import { Search, ArrowLeft } from 'lucide-react'

export function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const results = query.trim()
    ? productsData.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#3897F0] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner */}
        <div className="bg-gradient-to-r from-[#130E26] via-[#1C1635] to-[#130E26] border-b border-[#261E45] text-white py-14 px-4 sm:px-6 lg:px-8 mb-10 shadow-lg text-center">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#3897F0] bg-[#3897F0]/10 border border-[#3897F0]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              SEARCH RESULTS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
              RESULTS FOR "{query}"
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Found {results.length} product{results.length === 1 ? '' : 's'} matching your search term.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="mb-6 flex items-center justify-between">
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3897F0] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Shop Catalog
            </Link>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto my-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#3897F0] mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">No Matching Products Found</h3>
              <p className="text-xs text-slate-500 mb-6">
                We couldn't find any products matching "{query}". Try checking your spelling or search for popular categories like HP, Laser, or Inkjet.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-[#3897F0] hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
