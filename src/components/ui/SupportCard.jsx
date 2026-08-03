import React from 'react'
import { Headphones } from 'lucide-react'
import { Button } from './Button'

export function SupportCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center h-full">
      <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-[#3897F0]">
        <Headphones className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Need Help?
      </h3>
      <p className="text-sm text-slate-600 mb-6 max-w-xs leading-relaxed">
        Our support team is ready to assist you.
      </p>
      <Button variant="primary" size="md" className="w-full uppercase font-bold tracking-wider">
        Contact Support
      </Button>
    </div>
  )
}
