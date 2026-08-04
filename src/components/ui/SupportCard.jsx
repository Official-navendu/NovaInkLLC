import React from 'react'
import { Headphones } from 'lucide-react'
import { Button } from './Button'
import { Link } from 'react-router-dom'

export function SupportCard() {
  return (
    <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-md text-center flex flex-col items-center justify-center h-full">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-[#0096D6] shrink-0">
        <Headphones className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">
        NEED PURCHASING ASSISTANCE?
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6 max-w-xs leading-relaxed">
        Our printing specialists are ready to recommend the ideal HP printer model, calculate monthly supply costs, and answer setup questions before you buy.
      </p>
      <Link to="/contact" className="w-full">
        <Button variant="primary" size="md" className="w-full uppercase font-extrabold text-xs tracking-wider py-3 shadow-md shadow-[#0096D6]/20">
          Speak With a Specialist
        </Button>
      </Link>
    </div>
  )
}
