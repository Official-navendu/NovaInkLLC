import React from 'react'
import { faqData } from '../../data/faq'
import { Accordion } from '../ui/Accordion'
import { SupportCard } from '../ui/SupportCard'

export function FAQSection() {
  return (
    <section id="support" className="py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Column FAQ List */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight uppercase mb-6">
              FREQUENTLY ASKED <span className="text-[#3897F0]">QUESTIONS</span>
            </h2>
          </div>

          <Accordion items={faqData} defaultOpen={0} />
        </div>

        {/* Right Column Support Card */}
        <div className="lg:col-span-4 h-full">
          <SupportCard />
        </div>

      </div>
    </section>
  )
}
