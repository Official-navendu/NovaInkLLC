import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Hero() {
  const features = [
    'Genuine Products',
    'Fast U.S. Shipping',
    'Secure Shopping',
    'Dedicated Customer Support'
  ]

  const heroImages = [
    { id: 1, src: '/images/hero/hero-1.webp', alt: 'HP Smart Printing Solutions', title: 'Smart All-in-One' },
    { id: 2, src: '/images/hero/hero-2.webp', alt: 'HP Office LaserJet Pro Printer', title: 'Office LaserJet Pro' },
    { id: 3, src: '/images/hero/hero-3.webp', alt: 'HP ENVY Wireless Color Printer', title: 'ENVY Wireless Color' },
    { id: 4, src: '/images/hero/hero-4.webp', alt: 'HP Smart Tank Photo Printer', title: 'Smart Tank Photo' }
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  // Auto-switch image every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      triggerImageChange((activeIndex + 1) % heroImages.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [activeIndex])

  const triggerImageChange = (newIndex) => {
    if (newIndex === activeIndex) return
    setIsFading(true)
    setTimeout(() => {
      setActiveIndex(newIndex)
      setIsFading(false)
    }, 200)
  }

  return (
    <section className="relative pt-24 lg:pt-32 pb-14 lg:pb-18 text-slate-900 overflow-hidden min-h-[580px] flex flex-col justify-center border-b border-slate-100 font-['Manrope',sans-serif]">
      
      {/* Preload first hero image for zero layout shift */}
      <link rel="preload" as="image" href="/images/hero/hero-1.webp" />

      {/* Layer 1: Background Image with Parallax Scroll Effect */}
      <div
        className="absolute inset-0 bg-cover bg-right-bottom bg-no-repeat sm:bg-fixed pointer-events-none opacity-45 z-0"
        style={{ backgroundImage: `url('/images/hero/hero-bg.png')` }}
      />

      {/* Layer 2: Brand Color Overlay (approx 65% opacity for text readability & visible background image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/80 to-blue-50/60 pointer-events-none z-0" />

      {/* Premium Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#0096D6]/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#0096D6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Side Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50/80 border border-blue-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs mb-3 font-['Manrope',sans-serif]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6]" />
                GENUINE HP PRINTING SOLUTIONS
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
                Find the Right Printer for Every Space
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              Whether you’re printing school papers at home or handling big projects at the office, Nova Ink LLC is here to help. We provide reliable printers, genuine supplies, and all the accessories you need to keep things running smoothly.
            </p>

            {/* Checklist items horizontal row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0096D6] flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-3 h-3 fill-current stroke-current stroke-[2]" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" fill="none" />
                    </svg>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/shop">
                <button className="bg-[#0096D6] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-[#0096D6]/25 hover:bg-[#0077B5] hover:shadow-xl hover:shadow-[#0096D6]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  SHOP HP CATALOG
                </button>
              </Link>
              <Link to="/solutions">
                <button className="bg-white border-2 border-[#0096D6] text-[#0096D6] font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl hover:bg-blue-50/80 hover:-translate-y-0.5 shadow-xs transition-all duration-200 cursor-pointer">
                  EXPLORE SOLUTIONS
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side Content - Clean Natural Floating Image Gallery */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-xl flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
              
              {/* Main Featured Image (Floating directly on Hero background) */}
              <div className="relative flex-1 w-full flex flex-col items-center justify-center">
                <img
                  src={heroImages[activeIndex].src}
                  alt={heroImages[activeIndex].alt}
                  width="500"
                  height="400"
                  className={`w-full h-72 sm:h-88 lg:h-[360px] object-contain drop-shadow-[0_20px_35px_rgba(0,150,214,0.14)] transition-all duration-300 ${
                    isFading ? 'opacity-20 scale-[0.98]' : 'opacity-100 scale-100'
                  }`}
                  loading="eager"
                />

                {/* Slide Indicators (Mobile/Tablet helper) */}
                <div className="flex items-center gap-1.5 mt-3 lg:hidden">
                  {heroImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => triggerImageChange(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx ? 'w-6 bg-[#0096D6]' : 'w-1.5 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 4 Floating Thumbnails (Vertical on Desktop, Horizontal on Mobile/Tablet) */}
              <div className="flex flex-row lg:flex-col gap-2.5 sm:gap-3 w-full lg:w-auto justify-center lg:justify-start shrink-0 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {heroImages.map((img, idx) => {
                  const isActive = activeIndex === idx
                  return (
                    <button
                      key={img.id}
                      onClick={() => triggerImageChange(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 rounded-2xl p-1.5 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white border-2 border-[#0096D6] shadow-md shadow-[#0096D6]/20 ring-2 ring-[#0096D6]/20 scale-105'
                          : 'bg-white/80 border border-slate-200/90 hover:border-[#0096D6]/60 hover:bg-white opacity-80 hover:opacity-100'
                      }`}
                      title={img.title}
                      aria-label={`Select ${img.title}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        width="80"
                        height="80"
                        className="w-full h-full object-contain rounded-xl"
                        loading="lazy"
                      />
                    </button>
                  )
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
