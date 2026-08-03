import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { productsData } from '../../data/products'
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef(null)

  // Debounce search query ~300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(handler)
  }, [query])

  // Focus input on open & handles Escape key
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setIsSearchOpen])

  if (!isSearchOpen) return null

  const searchResults = debouncedQuery.trim()
    ? productsData.filter(p =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : []

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setIsSearchOpen(false)
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false)
    navigate(`/product/${productId}`)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1635] backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in slide-in-from-top duration-300 z-10">
        
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-slate-100 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#3897F0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search printers by model, category (e.g. HP, Laser, EcoTank)..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Live Search Suggestions List */}
        <div className="max-h-96 overflow-y-auto p-4">
          {debouncedQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Matching Products ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1 border border-slate-200/60"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs group-hover:text-[#3897F0] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-normal">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900 text-xs">
                        ${product.price.toFixed(2)}
                      </span>
                      <CornerDownLeft className="w-4 h-4 text-slate-400 group-hover:text-[#3897F0] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No products found matching "<span className="font-semibold text-slate-800">{debouncedQuery}</span>"
              </div>
            )
          ) : (
            <div className="py-6 text-center text-slate-400 text-xs">
              Type to search products or categories instantly...
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {debouncedQuery.trim() && searchResults.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={handleSearchSubmit}
              className="text-xs font-bold text-[#3897F0] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all results for "{debouncedQuery}"</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
