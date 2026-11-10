import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { 
  Printer, 
  Laptop, 
  Monitor, 
  Wifi, 
  Image as ImageIcon, 
  Download, 
  Headphones, 
  ChevronRight, 
  ChevronLeft, 
  Wrench,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Info,
  AlertTriangle,
  Package,
  Power,
  Droplets,
  Settings,
  Server,
  RefreshCw,
  RotateCw,
  Network,
  FileText
} from 'lucide-react'

// Custom sleek Scanner icon matching reference
function ScannerIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="2" y="14" width="20" height="6" rx="2" />
      <path d="M18 17h.01" />
      <path d="M22 14L15 4a1.5 1.5 0 0 0-1.2-.6H4a1.5 1.5 0 0 0-1.4 2.1L5 14" />
    </svg>
  )
}

// Printer with Plus badge icon
function PrinterPlusIcon({ className = "w-7 h-7" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Printer className="w-full h-full" strokeWidth={1.8} />
      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-50 rounded-full flex items-center justify-center">
        <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#0096D6] flex items-center justify-center font-bold text-[9px] text-[#0096D6] leading-none bg-blue-50">
          +
        </span>
      </span>
    </div>
  )
}

// Printer with Offline / Alert badge icon
function PrinterOfflineIcon({ className = "w-7 h-7" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Printer className="w-full h-full" strokeWidth={1.8} />
      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-50 rounded-full flex items-center justify-center">
        <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#0096D6] flex items-center justify-center font-bold text-[9px] text-[#0096D6] leading-none bg-blue-50">
          !
        </span>
      </span>
    </div>
  )
}

export function EasyStepByStepSetupGuide() {
  // Hero Carousel State & Slides
  const heroSlides = [
    {
      id: 'setup-guide-1',
      image: '/assets/printer-setup-guide-1.jpg',
      alt: 'Person connecting and setting up a modern printer in an office'
    },
    {
      id: 'setup-guide-2',
      image: '/assets/printer-setup-guide-2.jpg',
      alt: 'Close-up of modern printer setup with laptop showing installation process'
    }
  ]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      setTouchStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextSlide()
      } else {
        handlePrevSlide()
      }
    }
    setTouchStartX(null)
  }

  // Open JivoChat widget programmatically
  const handleOpenLiveChat = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    if (typeof window !== 'undefined') {
      if (window.jivo_api && typeof window.jivo_api.open === 'function') {
        window.jivo_api.open()
      } else {
        let attempts = 0
        const interval = setInterval(() => {
          attempts++
          if (window.jivo_api && typeof window.jivo_api.open === 'function') {
            window.jivo_api.open()
            clearInterval(interval)
          } else if (attempts > 25) {
            clearInterval(interval)
          }
        }, 200)
      }
    }
  }

  useEffect(() => {
    document.title = "Easy Step-by-Step Printer Setup Guide | Nova Ink LLC"
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content', 
        'Follow our step-by-step printer setup and troubleshooting guide. Clear instructions for driver installation, Wi-Fi connectivity, offline printer resolution, and test printing.'
      )
    }

    // Apply page-specific noindex, nofollow SEO directive
    let robotsMeta = document.querySelector('meta[name="robots"]')
    let createdRobots = false
    const previousRobots = robotsMeta ? robotsMeta.getAttribute('content') : null

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
      createdRobots = true
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow')

    window.scrollTo(0, 0)

    return () => {
      // Revert or clean up robots directive on unmount so other pages remain unaffected
      if (createdRobots && robotsMeta) {
        robotsMeta.remove()
      } else if (robotsMeta && previousRobots !== null) {
        robotsMeta.setAttribute('content', previousRobots)
      } else if (robotsMeta) {
        robotsMeta.removeAttribute('content')
      }
    }
  }, [])

  // 6 Quick Help Categories
  const quickHelpCards = [
    {
      id: 'new-printer',
      title: 'New Printer Installation',
      icon: <PrinterPlusIcon className="w-7 h-7 text-[#0096D6]" />
    },
    {
      id: 'printer-offline',
      title: 'Printer Showing Offline',
      icon: <PrinterOfflineIcon className="w-7 h-7 text-[#0096D6]" />
    },
    {
      id: 'wifi-issues',
      title: 'Wi-Fi Connection Issues',
      icon: <Wifi className="w-7 h-7 text-[#0096D6]" strokeWidth={1.8} />
    },
    {
      id: 'not-printing',
      title: 'Printer Not Printing',
      icon: <ImageIcon className="w-7 h-7 text-[#0096D6]" strokeWidth={1.8} />
    },
    {
      id: 'driver-install',
      title: 'Driver Installation',
      icon: <Download className="w-7 h-7 text-[#0096D6]" strokeWidth={1.8} />
    },
    {
      id: 'scanner-issues',
      title: 'Scanner Not Working',
      icon: <ScannerIcon className="w-7 h-7 text-[#0096D6]" strokeWidth={1.8} />
    }
  ]

  // Section 4: Four Image-Based Setup Cards
  const setupSteps = [
    {
      id: 'download-software',
      title: 'Download the Latest Software',
      description: 'Get the latest printer drivers and software designed for optimal performance and compatibility. Always download the official version to ensure smooth installation and reliable printing results.',
      image: '/assets/setup-download-software.webp',
      imageAlt: 'Laptop displaying printer software download instructions'
    },
    {
      id: 'connect-printer',
      title: 'Connect Your Printer',
      description: 'Connect your printer via USB cable or Wi-Fi network using the printer’s setup options. For wireless connections, make sure your printer and device are on the same network before proceeding.',
      image: '/assets/setup-connect-printer.webp',
      imageAlt: 'Connecting a printer to a laptop using a USB cable'
    },
    {
      id: 'install-drivers',
      title: 'Install the Printer Drivers',
      description: 'Run the downloaded setup file and follow the on-screen instructions to install the required drivers. This ensures your printer communicates correctly with your computer or mobile device.',
      image: '/assets/setup-install-drivers.webp',
      imageAlt: 'Computer displaying printer driver installation'
    },
    {
      id: 'test-printer',
      title: 'Test the Printer',
      description: 'Once installation is complete, print a test page to confirm that your printer is working properly. Adjust settings as needed for the best print quality and performance.',
      image: '/assets/setup-test-print.webp',
      imageAlt: 'Printer producing a sample color test page'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 flex flex-col font-['Manrope',sans-serif] antialiased selection:bg-[#0096D6] selection:text-white overflow-x-hidden">
      {/* 
        NOTE: Header/Navbar is deliberately excluded per requirements.
        This standalone page has no navigation header.
      */}

      {/* TOP PROGRESS AND PRINTER SELECTOR BAR */}
      <section className="border-b border-slate-200/90 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Progress Steps (Visual only) */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-900">
              {/* Step 1 */}
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  1
                </span>
                <span>Identify Your Printer</span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />

              {/* Step 2 */}
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  2
                </span>
                <span>Download Drivers</span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />

              {/* Step 3 */}
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0096D6] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  3
                </span>
                <span>Install &amp; Set Up</span>
              </div>
            </div>

            {/* Right Divider & Printer Type Selector (Visual only) */}
            <div className="flex items-center gap-4 lg:gap-6 self-start lg:self-center">
              <div className="hidden lg:block h-6 w-px bg-slate-200" aria-hidden="true" />

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  Choose Your Printer Type:
                </span>

                <div className="flex items-center gap-2" role="group" aria-label="Printer types">
                  {/* Printer (Active/Selected visual state) */}
                  <div
                    title="Printer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0096D6] text-white flex items-center justify-center shadow-xs cursor-default select-none transition-transform"
                    aria-label="Printer"
                  >
                    <Printer className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                  </div>

                  {/* Laptop */}
                  <div
                    title="Laptop"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-600 border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-default select-none transition-colors"
                    aria-label="Laptop"
                  >
                    <Laptop className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
                  </div>

                  {/* Desktop / Monitor */}
                  <div
                    title="Desktop"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-600 border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-default select-none transition-colors"
                    aria-label="Desktop"
                  >
                    <Monitor className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
                  </div>

                  {/* Scanner */}
                  <div
                    title="Scanner"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-600 border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-default select-none transition-colors"
                    aria-label="Scanner"
                  >
                    <ScannerIcon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Text & Action Buttons */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Eyebrow */}
                <span className="inline-block text-[11px] sm:text-xs font-bold tracking-wider text-[#0096D6] uppercase bg-blue-50 px-3.5 py-1.5 rounded-full mb-4 border border-blue-100">
                  PRINTER SETUP MADE SIMPLE
                </span>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Set Up Your Printer with{' '}
                  <span className="text-[#0096D6]">Easy, Step-by-Step Guidance</span>
                </h1>

                {/* Supporting Paragraph */}
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  From first-time installation to wireless connectivity and everyday printing issues, find clear instructions to get your printer working smoothly.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                  <Link
                    to="/find-printer"
                    aria-label="Start Printer Setup - Go to Find Printer page"
                    className="bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-[#0096D6]/20 inline-flex items-center justify-center gap-2.5 cursor-pointer transition-all focus:outline-none"
                  >
                    <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                    <span>Start Printer Setup</span>
                  </Link>

                  <Link
                    to="/find-printer"
                    aria-label="Explore Troubleshooting - Go to Find Printer page"
                    className="bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl border border-slate-300 shadow-xs inline-flex items-center justify-center gap-2.5 cursor-pointer transition-all focus:outline-none"
                  >
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" strokeWidth={2} />
                    <span>Explore Troubleshooting</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: 2-Image Carousel with functional controls */}
              <div className="lg:col-span-5 flex justify-center">
                <div 
                  className="relative w-full max-w-md lg:max-w-none select-none"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Printer setup guide image gallery"
                >
                  {/* Slide Container with fixed 4:3 aspect ratio to prevent CLS */}
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm bg-slate-50 aspect-[4/3]">
                    {heroSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                          index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
                        aria-hidden={index !== currentSlide}
                      >
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          className="w-full h-full object-cover select-none"
                          loading={index === 0 ? "eager" : "lazy"}
                          draggable={false}
                          width={600}
                          height={450}
                        />
                      </div>
                    ))}

                    {/* Functional Previous Arrow Button */}
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous slide"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0096D6]"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                    </button>

                    {/* Functional Next Arrow Button */}
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next slide"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0096D6]"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Carousel Pagination Dots */}
                  <div className="flex items-center justify-center gap-2 mt-3.5" role="tablist" aria-label="Slide indicators">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-selected={index === currentSlide}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0096D6] ${
                          index === currentSlide 
                            ? 'w-7 bg-[#0096D6]' 
                            : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SIX QUICK HELP CATEGORIES */}
        <section className="py-6 sm:py-8 lg:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
              {quickHelpCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 text-center shadow-xs hover:shadow-md transition-shadow cursor-default flex flex-col items-center justify-center min-h-[160px] sm:min-h-[175px]"
                >
                  {/* Soft-blue rounded icon box */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0096D6] flex items-center justify-center mb-4 flex-shrink-0">
                    {card.icon}
                  </div>

                  {/* Category Title */}
                  <h3 className="text-slate-900 font-bold text-xs sm:text-sm leading-snug">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* ASSISTANCE MESSAGE (Full-width pale-blue info strip) */}
            <div className="mt-8 sm:mt-10 bg-[#EFF6FC] border border-blue-100 rounded-2xl px-6 py-4 sm:py-4.5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
              <Headphones className="w-5 h-5 text-[#0096D6] flex-shrink-0" strokeWidth={2.2} />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0096D6] font-bold">Need Help? </strong>
                Our support team can assist with printer setup, connectivity, driver installation, and common printing problems.
              </p>
            </div>

          </div>
        </section>

        {/* FAST & SIMPLE 123 HP COM PRINTER SETUP GUIDE */}
        <section className="pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Heading & Introduction */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Fast &amp; Simple 123 Hp Com Printer Setup Guide
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Start your 123 Hp Com Setup (123.hp.com/setup) right here. Our streamlined guide walks you through downloading drivers and connecting to Wi-Fi to ensure your new or existing printer is configured and ready to print without the hassle.
              </p>
            </div>

            {/* Four Image-Based Setup Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {setupSteps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full cursor-default"
                >
                  {/* Top Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full h-full object-cover select-none"
                      loading="lazy"
                      draggable={false}
                      width={400}
                      height={300}
                    />
                  </div>

                  {/* Content Area with light blush or soft neutral background */}
                  <div className="p-5 sm:p-6 bg-[#FAF2F2] flex-1 flex flex-col justify-start">
                    <h3 className="text-base sm:text-lg font-bold text-[#0096D6] mb-2.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Highlighted Guidance Text */}
            <div className="mt-10 sm:mt-12 text-center max-w-3xl mx-auto px-4">
              <p className="text-sm sm:text-base font-bold text-red-600 leading-relaxed">
                Your 123 hp com setup (123.hp.com/setup) doesn’t have to be complicated. Follow this detailed guide to install, connect, and configure your device successfully. Each step includes visual guidance and expert troubleshooting tips to ensure your printer is running smoothly in minutes.
              </p>
            </div>

          </div>
        </section>

                {/* DETAILED TECHNICAL DOCUMENTATION & TROUBLESHOOTING GUIDE (PREMIUM CARD-BASED UI) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* =========================================================================
                SECTION 1: 123.hp.com/setup – Easy HP Printer Setup and Installation
               ========================================================================= */}
            <article id="hp-setup-guide" className="mb-14 sm:mb-20">
              <div className="text-center sm:text-left mb-8 sm:mb-12 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#0096D6] uppercase bg-blue-50 border border-blue-100 mb-3.5">
                  Installation Walkthrough
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  123.hp.com/setup – Easy HP Printer Setup and Installation
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                  Printer setup involves preparing the hardware, installing supplies, configuring initial preferences, establishing a connection, installing compatible software, and verifying the final print configuration. Follow this comprehensive walkthrough to get your printer up and running smoothly. Exact steps and menu options may vary depending on your specific printer model, computer operating system, and chosen connectivity method.
                </p>
              </div>

              {/* 2-Column Responsive Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Step 1 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">1</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 1: Unbox &amp; Prepare the Printer
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Place the printer on a stable, level, and well-ventilated surface near an easily accessible power outlet.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Remove all external packaging tape, protective plastic film, cardboard retainers, and foam inserts from around the chassis.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Open the cartridge access area and scanner lid to remove internal protective covers, safety strips, and carriage transit locks as instructed in the printer documentation.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Check that the input and output paper trays are correctly seated and fully extended.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Load compatible plain white paper into the input tray, then slide the paper width guides gently against the paper edges without bending the sheets.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Close all doors, covers, and paper trays securely.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Important Packaging Note:</strong>
                      <span>Completely removing all internal shipping materials and tape strips before connecting power is essential. Leaving internal tape or locks in place can cause paper jams or mechanical carriage stalls during the initial power-on sequence.</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">2</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 2: Power On &amp; Initial Settings
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Power className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Connect the supplied power cable directly into the back of the printer and plug the other end directly into a suitable wall outlet.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Avoid using overloaded extension cords, ungrounded multi-plugs, or shared power strips that can cause voltage drops during boot-up.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Turn on the printer using its power button and allow it to complete its initial mechanical startup sequence.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>On the control panel or touchscreen display, choose your preferred language and country or region when prompted.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Review and confirm any initial date, time, or basic environment preference settings available on the screen.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Wait until the printer reaches a quiet, idle ready state before proceeding to supply installation.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Model Variation Note:</strong>
                      <span>Exact control panel prompts, button layouts, and setup screens vary widely across different printer lines. Screenless compact models may use status indicator lights instead of an interactive LCD display.</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">3</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 3: Install Ink Cartridges
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Droplets className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Open the cartridge access door and wait for the ink carriage to move to the center and become completely stationary and silent.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Unpack each setup cartridge carefully, pulling the designated pull-tab or protective plastic wrap.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Remove the protective tape without touching the copper-colored electrical contacts or ink nozzles, as fingerprints can cause electrical or ink delivery failures.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Match each cartridge to its correct color slot (black, cyan, magenta, yellow) based on the color-coded guide on the carriage.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Insert each cartridge firmly into its corresponding slot at the recommended angle until it snaps securely into place.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Close the cartridge access door and allow the printer to automatically initialize the ink system.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>If prompted by the printer display, print the automated alignment page, then place it face-down on the scanner glass and scan it to complete calibration.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Setup Cartridges Note:</strong>
                      <span>Setup ink cartridges provided in new printer boxes contain specialized ink formulations required to prime the printhead during initial setup. Always use the provided setup cartridges and follow the specific insertion directions for your model.</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">4</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 4: Connect to a Wi-Fi Network
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Wifi className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm that your wireless router is active, broadcasting normally, and operating within compatible range.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Open <strong>Wireless Settings</strong>, <strong>Network Setup</strong>, or the <strong>Wireless Setup Wizard</strong> on the printer control panel.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Select your Wi-Fi network name (SSID) from the list of discovered networks.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Enter your Wi-Fi password carefully, taking care to match exact uppercase and lowercase characters.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Wait a few moments for the printer to negotiate wireless security protocols and establish its local network connection.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Check the wireless status indicator or print a wireless network test report to confirm successful association.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm that your computer, laptop, or smartphone is connected to the exact same Wi-Fi network and subnet.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Wireless Troubleshooting Notes inside Card 4 */}
                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#0096D6] shrink-0" />
                      <span>Wireless Troubleshooting Notes:</span>
                    </div>
                    <p>
                      <strong>Incorrect Passwords:</strong> If the connection fails, re-enter your network key carefully, ensuring Caps Lock is off.
                    </p>
                    <p>
                      <strong>Weak Signals &amp; Distance:</strong> Position the printer within 10 to 15 feet of your router during initial setup to prevent signal drops.
                    </p>
                    <p>
                      <strong>Network Band Configuration:</strong> Many printers support only 2.4 GHz wireless networks. If your router combines 2.4 GHz and 5 GHz bands under a single name, temporarily separate the bands or enable a 2.4 GHz guest network.
                    </p>
                    <p>
                      <strong>Indicator Behavior:</strong> Wireless indicator lights vary by model—some use solid blue LEDs, while others display animated icons or status bars on the LCD.
                    </p>
                  </div>
                </div>

                {/* Step 5 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">5</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 5: Download Compatible Printer Software
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Download className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Identify your exact printer model number from the front bezel or the product label located on the back or bottom of the printer.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm your computer’s operating system and version (such as Windows 11, Windows 10 64-bit, or macOS).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Open a web browser and visit the manufacturer’s official support portal (<a href="https://123.hp.com/setup" target="_blank" rel="noopener noreferrer" className="text-[#0096D6] hover:underline font-semibold">123.hp.com/setup</a>).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Enter your specific printer model in the search box to access verified software and drivers for your hardware.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Review the available installation packages: download the <strong>HP Smart App</strong> for guided mobile and cloud features, or the <strong>Full Feature Driver</strong> for comprehensive local printing and scanning controls.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Save the installation package directly to your local computer drive.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block mb-0.5 text-amber-900">Security Warning:</strong>
                      <span>Always obtain printer software from official manufacturer support resources. Avoid third-party driver download websites, unknown driver updaters, or unverified executable files that may install unwanted software or cause system instability.</span>
                    </div>
                  </div>
                </div>

                {/* Step 6 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">6</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 6: Complete Software Installation
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Laptop className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Open the downloaded installation file from your Downloads folder.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Review the installation prompts and grant administrative permissions when requested by your operating system.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Accept the software licensing agreements only after reviewing them.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Select your preferred connection method (<strong>Wireless / Network</strong> or <strong>USB Cable</strong>) as prompted by the wizard.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Choose your detected printer model when it appears in the network discovery window.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Follow the remaining on-screen instructions to finalize driver registration and complete optional scanning utilities.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Allow the installer to complete all background configuration steps before disconnecting cables or closing the installation program.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0" />
                    <span>Installer handles driver configuration, port registration, and system utilities automatically.</span>
                  </div>
                </div>

                {/* Step 7 Card - Spans 2 columns on desktop for strong visual finish */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">7</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Step 7: Verify the Printer Setup
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Open your operating system’s printer list (in Windows: <em>Settings &rarr; Bluetooth &amp; devices &rarr; Printers &amp; scanners</em>; in macOS: <em>System Settings &rarr; Printers &amp; Scanners</em>).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm that your printer appears in the list and that its status reports <strong>Ready</strong>, <strong>Idle</strong>, or <strong>Online</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Select the printer and choose <strong>Print a test page</strong> to verify communication between your computer and printer hardware.</span>
                      </li>
                    </ul>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Review the test output: confirm that text is sharp, alignment is straight, and all color bands print cleanly without streaks or missing lines.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>If your printer includes a scanner, test scanning by placing a sample document on the flatbed and scanning it to your computer.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>If the test fails, systematically verify whether the disruption stems from network connectivity, driver registration, paper alignment, or ink supply.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Setup Complete:</strong>
                      <span>When your printer prints a crisp test page and shows an active ready status across your network, your printer is properly configured and prepared for everyday personal or office use.</span>
                    </div>
                  </div>
                </div>

              </div>
            </article>

            {/* SEPARATOR BETWEEN SECTION 1 & 2 */}
            <div className="border-t border-slate-200/80 my-12 sm:my-16" />

            {/* HP PARTNER LOCATOR BANNER */}
            <div className="mb-12 sm:mb-16">
              <a
                href="https://locator.hp.com/us/en/?ml___task=search_zip&ml___id=577399&ml___ml_skip_interstitial=1&ml___url_share_action=1&ml___lang=en-US%20(1)&ml___redirect_commercial_destination_Itemid=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow group cursor-pointer"
                aria-label="Official HP Partner - View Nova Ink LLC on the HP Partner Locator (opens in a new tab)"
              >
                <img
                  src="/images/hp-partner-banner.png"
                  alt="Official HP Partner - View Nova Ink LLC on the official HP Partner Locator"
                  className="w-full h-auto object-cover select-none group-hover:scale-[1.005] transition-transform duration-300"
                  loading="lazy"
                  width={1200}
                  height={350}
                />
              </a>
            </div>

            {/* =========================================================================
                SECTION 2: Fix HP Printer Offline Issue – Quick Solutions
               ========================================================================= */}
            <article id="hp-offline-troubleshooting" className="mb-14 sm:mb-20">
              <div className="text-center sm:text-left mb-8 sm:mb-10 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#0096D6] uppercase bg-blue-50 border border-blue-100 mb-3.5">
                  Connectivity Diagnostics
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Fix HP Printer Offline Issue – Quick Solutions
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                  Seeing an &apos;HP Printer Offline&apos; message generally indicates that your computer cannot currently communicate with the selected printer over your Wi-Fi network or USB connection. It rarely means that the printer is permanently damaged. Common causes include temporary wireless network disconnects, USB port sleep states, incorrect default printer assignments, stalled documents in the print queue, driver communication errors, or changed network IP addresses. Follow these practical steps to diagnose and restore connection.
                </p>
              </div>

              {/* Overview Card: Common Causes */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs mb-8 sm:mb-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    Common Causes of Offline Status:
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                    <span>Temporary Wi-Fi network drops or router sleep</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                    <span>Loose or unpowered USB cable connections</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                    <span>Printer powered off or in deep sleep mode</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                    <span>Incorrect default printer or &apos;Use Printer Offline&apos; checked</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                    <span>Stuck or corrupted documents blocking the print queue</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0096D6] shrink-0" />
                    <span>Shifted printer IP address following router restart</span>
                  </div>
                </div>
              </div>

              {/* Offline Troubleshooting Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Offline Step 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">1</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 1: Check Printer Power and Connection
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Power className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm that the printer is powered on and that its control panel or power light is steadily illuminated.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Check the printer display for any active hardware warnings, open door notices, or paper jam messages that may halt operations.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Verify that paper trays are filled and that cartridge alerts are not preventing the printer from becoming ready.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>For Wi-Fi printers, check that the wireless indicator is steady and that the printer is associated with your primary network.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>For USB printers, inspect both cable ends, ensure the cable is firmly seated, and try an alternate USB port directly on your computer (avoid unpowered USB hubs).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm that your computer and printer are connected through the expected network and are not separated by VPN client software or guest network isolation.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Diagnostic Distinction:</strong>
                      <span>Distinguish between a connectivity issue and a physical printer warning. If the printer display shows an active hardware error (such as a door open or empty paper tray), the offline status in Windows is often a secondary symptom that resolves automatically once the hardware condition is addressed.</span>
                    </div>
                  </div>
                </div>

                {/* Offline Step 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">2</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 2: Set the Correct Printer as Default
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-3">
                      Windows may inadvertently direct print jobs to an inactive, duplicate, or virtual printer profile. Follow these steps to verify your default printer:
                    </p>

                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1">Open Windows <strong>Settings</strong> (press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono">Win + I</kbd>).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1">Navigate to <strong>Bluetooth &amp; devices</strong> &rarr; <strong>Printers &amp; scanners</strong>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1">Locate your printer model. If duplicate entries appear (e.g., &apos;Copy 1&apos;), select the active connected instance.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1">Open the printer overview and click <strong>Set as default</strong>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1">In the legacy <em>Control Panel &rarr; Devices and Printers</em>, right-click the printer, select <strong>Set as Default Printer</strong>, open <em>See what&apos;s printing</em>, and uncheck <strong>Use Printer Offline</strong> under the Printer menu.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Windows Setting Note:</strong>
                      <span>The setting &apos;Let Windows manage my default printer&apos; (under Printers &amp; scanners) automatically changes your default device based on the last printer used at your current location, which can sometimes redirect print commands away from your intended hardware.</span>
                    </div>
                  </div>
                </div>

                {/* Offline Step 3 - Full Width for Sequenced Multi-Device Restart */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">3</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Step 3: Restart the Printer, Router, and Computer
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                      <RotateCw className="w-5 h-5" strokeWidth={2} />
                    </div>
                  </div>

                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-4">
                    Power cycling refreshes IP assignments, clears corrupted network sockets, and resets buffer memory across your devices. Perform this exact sequence:
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1">Cancel active print jobs where possible to prevent buffer errors.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1">Turn off the printer using its power button, then unplug its power cord.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1">Restart your computer through the Start menu.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1">If connected via Wi-Fi, unplug your wireless router and modem for 30 seconds.</span>
                      </li>
                    </ol>

                    <ol start="5" className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1">Plug the router back in and wait 2 to 3 minutes for all status lights to fully stabilize.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">6</span>
                        <span className="flex-1">Reconnect the printer power cord and turn the printer on.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">7</span>
                        <span className="flex-1">Wait for the printer to reconnect to the network, and verify your computer is on the exact same SSID.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block mb-0.5 text-amber-900">Safety Caution:</strong>
                      <span>Never unplug equipment while a firmware update or self-maintenance sequence is actively running, as power interruptions can corrupt device memory.</span>
                    </div>
                  </div>
                </div>

                {/* Offline Step 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">4</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 4: Clear Stuck Print Jobs
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-3">
                      Stuck or damaged print spool files can lock the Windows print pipeline and cause the spooler to flag the printer offline:
                    </p>

                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1">Open <strong>Settings</strong> &rarr; <strong>Bluetooth &amp; devices</strong> &rarr; <strong>Printers &amp; scanners</strong>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1">Select your affected printer and click <strong>Open print queue</strong>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1">Review the list of pending documents for entries marked &apos;Error - Printing&apos; or &apos;Paused&apos;.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1">Click <strong>Printer</strong> &rarr; <strong>Cancel All Documents</strong> (or right-click individual stuck jobs and click Cancel).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1">Wait for the queue to clear completely.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">6</span>
                        <span className="flex-1">Submit a simple single-page plain text test document to verify normal queue processing.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Queue Tip:</strong>
                      <span>Print jobs can remain stuck because of sudden network drops, incompatible document encoding, or spooler service crashes. If jobs refuse to delete, restarting the Print Spooler service clears the lock.</span>
                    </div>
                  </div>
                </div>

                {/* Offline Step 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">5</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Step 5: Check Printer Driver and Communication Settings
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Settings className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Confirm that the correct, model-specific printer driver is actively associated with the printer rather than a generic fallback driver.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Operating system updates can occasionally alter printer port bindings or disrupt driver permissions.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Under <em>Printers &amp; scanners</em>, open <strong>Printer properties</strong>, click the <strong>Ports</strong> tab, and verify that the checked port matches your connection method (Standard TCP/IP Port for network printing or USB001 for direct cable).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Reinstall or update the compatible driver from the manufacturer&apos;s official support site if driver communication errors persist.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span>Restart the computer after installing or updating printer drivers to refresh system services.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0" />
                    <span>Maintaining matching port assignments prevents OS-level driver disconnects.</span>
                  </div>
                </div>

                {/* Offline Step 6 - Full Width Advanced Fix Card */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#0096D6] text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">6</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Step 6: Advanced Fix — Review IP Configuration
                      </h3>
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Advanced Fix
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                      <Network className="w-5 h-5" strokeWidth={2} />
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                      <span>Print or display the printer&apos;s <strong>Network Configuration Page</strong> or <strong>Wireless Network Test Report</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                      <span>Note the assigned IP address (e.g., <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">192.168.1.120</code>).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                      <span>Open a web browser on your computer and type the printer’s IP address into the address bar to confirm direct browser communication with the printer&apos;s Embedded Web Server (EWS).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                      <span>Check whether the printer&apos;s IP address shifted after a recent router reboot due to standard DHCP lease expiration.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                      <span>If your router supports it, configure a <strong>DHCP IP Reservation</strong> through your router administration console to assign a stable, permanent IP to the printer&apos;s MAC address.</span>
                    </li>
                  </ul>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold block mb-0.5 text-amber-900">Network Advisory:</strong>
                        <span>Do not manually assign a static IP address directly on the printer without checking your router&apos;s DHCP pool range and subnet configuration. Assigning an incorrect or conflicting IP address can disrupt your printer&apos;s connectivity entirely.</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                      <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 font-semibold block mb-0.5">Diagnostic Escalation Note:</strong>
                        <span>If your printer remains offline after completing these checks, investigate your router firewall settings, local network discovery rules (mDNS / SNMP), or consider reinstalling the complete printer software package.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </article>

            {/* SEPARATOR BETWEEN SECTION 2 & 3 */}
            <div className="border-t border-slate-200/80 my-12 sm:my-16" />

            {/* =========================================================================
                SECTION 3: HP Printer Troubleshooting Guide – Common Errors
               ========================================================================= */}
            <article id="hp-troubleshooting-guide" className="mb-8">
              <div className="text-center sm:text-left mb-8 sm:mb-10 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#0096D6] uppercase bg-blue-50 border border-blue-100 mb-3.5">
                  Error Resolution Guide
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  HP Printer Troubleshooting Guide – Common Errors
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                  Printer problems can originate from hardware components, chemical consumables, local Wi-Fi connectivity, operating system settings, or software drivers. Identifying the exact symptom before attempting fixes helps you resolve issues systematically and prevents unnecessary supply replacements. Work through the troubleshooting checks below in order.
                </p>
              </div>

              {/* Problem Cards Responsive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Problem 1 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-blue-50 text-[#0096D6] border border-blue-100 shrink-0">
                          Problem 1
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Poor Print Quality
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <Droplets className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-3.5">
                      <strong>Common Symptoms:</strong> Faded text, missing black or color ink, horizontal streaks, broken lines, blurry characters, or incorrect color reproduction.
                    </p>

                    <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span><strong>Review ink or toner levels:</strong> Check the printer display or utility software to replace depleted or critically low cartridges.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span><strong>Confirm media settings:</strong> Verify that the paper loaded matches the paper type and print quality selected in your software application.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span><strong>Verify genuine, compatible supplies:</strong> Ensure compatible cartridges are securely latched and that all protective nozzle tape has been removed.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span><strong>Run the automated cleaning utility:</strong> Open printer maintenance settings and perform a Level 1 printhead cleaning.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span><strong>Perform printhead alignment:</strong> Run the automated alignment tool to recalibrate color registration.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0096D6] mt-2 shrink-0" />
                        <span><strong>Inspect test output:</strong> Check diagnostic print samples after each cleaning cycle before resuming high-volume printing.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Maintenance Note:</strong>
                      <span>Automated printhead cleaning flushes ink through nozzles to dissolve dried residue and consumes ink. Avoid running more than 2 to 3 consecutive cycles without allowing the printhead to rest.</span>
                    </div>
                  </div>
                </div>

                {/* Problem 2 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-blue-50 text-[#0096D6] border border-blue-100 shrink-0">
                          Problem 2
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Printer Not Printing
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-3">
                      <strong>Possible Causes:</strong> Printer is offline or paused, empty paper tray, paper jam, low ink, stalled print queue, or driver communication failures.
                    </p>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">Ordered Troubleshooting Process:</p>
                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1"><strong>Check power and display status:</strong> Ensure the printer is awake and showing no active error icons.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1"><strong>Check paper and consumables:</strong> Verify paper is loaded without binding and cartridges have adequate ink.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1"><strong>Confirm the selected printer:</strong> Ensure jobs are not sent to virtual PDF writers or decommissioned printers.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1"><strong>Check if printing is paused:</strong> Open the print queue and ensure <em>Pause Printing</em> is unchecked.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1"><strong>Clear pending print jobs:</strong> Cancel any blocked documents in the print queue.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">6</span>
                        <span className="flex-1"><strong>Restart the printer and computer:</strong> Power cycle both devices to clear temporary buffer locks.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">7</span>
                        <span className="flex-1"><strong>Run a test print:</strong> Submit a simple test document directly from Windows printer properties.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0096D6] shrink-0" />
                    <span>Always verify driver destination before printing multi-page documents.</span>
                  </div>
                </div>

                {/* Problem 3 Card - Full Width for Spooler Configuration & System Safety */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-blue-50 text-[#0096D6] border border-blue-100 shrink-0">
                        Problem 3
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Print Spooler Error
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                      <Server className="w-5 h-5" strokeWidth={2} />
                    </div>
                  </div>

                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-4">
                    <strong>What the Print Spooler Does:</strong> The Windows Print Spooler service (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">spoolsv.exe</code>) manages all print jobs sent from applications to printers, ordering and queuing documents before sending them to hardware.
                  </p>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">Step-by-Step Resolution:</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono">Windows + R</kbd> on your keyboard.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1">Type <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold font-mono">services.msc</code> and press Enter.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1">Scroll down to locate <strong>Print Spooler</strong> in the services list.</span>
                      </li>
                    </ol>

                    <ol start="4" className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1">Right-click <strong>Print Spooler</strong> and click <strong>Restart</strong> (or click <em>Start</em> if the service was stopped).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1">Verify the Startup Type is set to <strong>Automatic</strong>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">6</span>
                        <span className="flex-1">Close the Services window and submit a small test print.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">System Safety Guidance:</strong>
                      <span>If the Print Spooler repeatedly crashes, the cause is typically a corrupted print file in <code className="text-xs bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-mono">C:\Windows\System32\spool\PRINTERS</code> or an incompatible third-party driver. Do not delete Windows core system files or modify advanced registry settings as a routine troubleshooting step.</span>
                    </div>
                  </div>
                </div>

                {/* Problem 4 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-blue-50 text-[#0096D6] border border-blue-100 shrink-0">
                          Problem 4
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Driver Issues After an Operating System Update
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <RefreshCw className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-3">
                      <strong>Common Signs:</strong> Printer missing from the device list, installation error codes, &apos;Driver Unavailable&apos; warnings, or scanning features disabled after major OS updates.
                    </p>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">Troubleshooting Steps:</p>
                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1">Confirm the exact printer model name and your computer&apos;s OS version and bit architecture (e.g., Windows 11 64-bit).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1">Check for available Windows Updates or macOS system patches that may include driver updates.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1">Visit the official manufacturer support portal to download the latest compatible driver package.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1">Remove an outdated or conflicting driver installation from <em>Settings &rarr; Bluetooth &amp; devices &rarr; Printers &amp; scanners</em> only when appropriate.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1">Run the downloaded driver package and follow the installation wizard.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">6</span>
                        <span className="flex-1">Restart the computer if prompted.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">7</span>
                        <span className="flex-1">Recheck printer and scanner functionality with a test page.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Compatibility Note:</strong>
                      <span>The latest software package released by a manufacturer may not always support older operating systems. Verify that the software specifically supports your installed operating system version.</span>
                    </div>
                  </div>
                </div>

                {/* Problem 5 Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wider bg-blue-50 text-[#0096D6] border border-blue-100 shrink-0">
                          Problem 5
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          Scanner Not Working
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                        <ScannerIcon className="w-5 h-5 text-[#0096D6]" />
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-3">
                      <strong>Common Causes:</strong> Scanner not detected, USB or Wi-Fi communication drops, missing scan driver components, disabled background scanner services, or incorrect application source selection.
                    </p>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">Diagnostic Checks:</p>
                    <ol className="space-y-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">1</span>
                        <span className="flex-1">Confirm the printer hardware supports scanning (flatbed or automatic document feeder).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">2</span>
                        <span className="flex-1">Verify USB cable or Wi-Fi network connectivity between printer and computer.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">3</span>
                        <span className="flex-1">Check whether the scanner appears in the operating system device list.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">4</span>
                        <span className="flex-1">Open compatible scanning software (HP Smart, HP Scan, or Windows Scan app).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">5</span>
                        <span className="flex-1">Select the correct scanner profile if multiple devices are listed.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">6</span>
                        <span className="flex-1">Verify that &apos;Scan to Computer&apos; is enabled in your scanning utility if using network push-scanning.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">7</span>
                        <span className="flex-1">Update or reinstall the Full Feature Driver package to restore missing WIA/TWAIN scanner drivers.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0096D6] text-xs font-bold shrink-0 mt-0.5 border border-blue-100">8</span>
                        <span className="flex-1">Test scanning with a simple document on the scanner glass.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">Feature Note:</strong>
                      <span>Scanning features, software options, and network scan protocols differ between printer models and operating systems. Refer to your model documentation for specialized scan-to-cloud or scan-to-email workflows.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Final Troubleshooting Guidance Closing Card */}
              <div className="mt-8 sm:mt-10 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-semibold block mb-1">Further Assistance:</strong>
                  <span>If the issue continues after these checks, note the exact error message, printer model, operating system, and connection method. This information helps identify the underlying problem more accurately.</span>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* FINAL CUSTOMER SUPPORT CTA SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#EFF6FC] rounded-3xl border border-blue-100/90 p-8 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(0,150,214,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Content & CTA */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  <span className="inline-block text-[11px] sm:text-xs font-bold tracking-wider text-[#0096D6] uppercase bg-white px-3.5 py-1.5 rounded-full mb-4 border border-blue-100">
                    PERSONALIZED PRINTER SUPPORT
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Still Need Help with HP Printer Setup &amp; Troubleshooting?
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    If you&apos;re still experiencing issues after following the setup and troubleshooting instructions, our support team is here to help. Get personalized guidance for printer installation, offline errors, Wi-Fi connectivity, driver issues, and scanning problems.
                  </p>

                  <div className="mt-7 flex flex-col items-stretch sm:items-start w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleOpenLiveChat}
                      aria-label="Click for Live Chat Assistance - Open Live Chat"
                      className="bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-[#0096D6]/20 inline-flex items-center justify-center gap-2.5 cursor-pointer transition-all focus:outline-none w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                      <span>Click for Live Chat Assistance</span>
                    </button>

                    <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-normal text-center sm:text-left">
                      Get guidance for setup, connectivity, and common printer problems.
                    </p>
                  </div>
                </div>

                {/* Right Column: Support Agent Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-lg lg:max-w-none overflow-hidden rounded-2xl border border-slate-200/90 shadow-md bg-white">
                    <img
                      src="/assets/printer-support-agent.webp"
                      alt="Customer support representative wearing a headset at a computer"
                      className="w-full h-auto aspect-[4/3] object-cover select-none"
                      loading="lazy"
                      draggable={false}
                      width={640}
                      height={480}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
