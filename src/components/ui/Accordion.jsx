import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx

        return (
          <div
            key={item.id || idx}
            className={cn(
              'border rounded-xl transition-colors duration-200 overflow-hidden',
              isOpen ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-slate-900 text-sm md:text-base gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className={cn(isOpen && 'text-[#0096D6]')}>{item.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300',
                  isOpen && 'transform rotate-180 text-[#0096D6]'
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-4 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-blue-100/50">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
