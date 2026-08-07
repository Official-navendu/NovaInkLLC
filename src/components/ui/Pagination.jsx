import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  // Generate page numbers
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-8 pb-4">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
          currentPage === 1
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
            : 'bg-white text-slate-700 hover:bg-[#0096D6] hover:text-white border border-slate-200 shadow-xs cursor-pointer'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Numbered Page Buttons */}
      <div className="flex items-center gap-1.5 px-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-9 h-9 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
              currentPage === page
                ? 'bg-[#0096D6] text-white shadow-md shadow-[#0096D6]/30 border border-[#0096D6]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
          currentPage === totalPages
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
            : 'bg-white text-slate-700 hover:bg-[#0096D6] hover:text-white border border-slate-200 shadow-xs cursor-pointer'
        }`}
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
