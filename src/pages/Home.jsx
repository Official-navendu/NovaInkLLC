import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { FeatureStrip } from '../components/sections/FeatureStrip'
import { CompanySection } from '../components/sections/CompanySection'
import { Categories } from '../components/sections/Categories'
import { Stats } from '../components/sections/Stats'
import { Products } from '../components/sections/Products'
import { WhyChoose } from '../components/sections/WhyChoose'
import { HowItWorks } from '../components/sections/HowItWorks'
import { CTA } from '../components/sections/CTA'
import { FAQSection } from '../components/sections/FAQSection'
import { Testimonials } from '../components/sections/Testimonials'
import { Newsletter } from '../components/sections/Newsletter'

export function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] overflow-x-hidden selection:bg-[#0096D6] selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Complete Homepage Sections */}
      <main className="flex-grow">
        <Hero />
        <FeatureStrip />
        <CompanySection />
        <Categories />
        <Stats />
        <Products />
        <WhyChoose />
        <HowItWorks />
        <CTA />
        <FAQSection />
        <Testimonials />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
