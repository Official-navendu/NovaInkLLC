import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  FileText, 
  RefreshCw 
} from 'lucide-react'

export function FindPrinter() {
  const navigate = useNavigate()
  // Controlled React state as specified
  const [selectedOption, setSelectedOption] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  // SEO Strict Noindex & Document Title
  useEffect(() => {
    document.title = "Find Printer | Nova Ink LLC"
    
    // Page-specific noindex, nofollow SEO directive
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
      // Revert or clean up robots directive on unmount
      if (createdRobots && robotsMeta) {
        robotsMeta.remove()
      } else if (robotsMeta && previousRobots !== null) {
        robotsMeta.setAttribute('content', previousRobots)
      } else if (robotsMeta) {
        robotsMeta.removeAttribute('content')
      }
    }
  }, [])

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

  // Handle Radio Option Change
  const handleOptionChange = (optionValue) => {
    setSelectedOption(optionValue)
    if (errorMessage && errorMessage.includes('select whether you want to set up')) {
      setErrorMessage('')
    }
    if (searchResult) {
      setSearchResult((prev) => prev ? { ...prev, mode: optionValue } : null)
    }
  }

  // Handle Search Input Change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    if (errorMessage && errorMessage.includes('enter your printer model')) {
      setErrorMessage('')
    }
  }

  // Handle Search Submission with strict validation
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    // 1. Check option selection
    if (!selectedOption) {
      setErrorMessage('Please select whether you want to set up a new printer or troubleshoot printer issues.')
      setSearchResult(null)
      return
    }

    // 2. Check search input query
    const query = searchQuery.trim()
    if (!query) {
      setErrorMessage('Please enter your printer model, product number or serial number.')
      setSearchResult(null)
      return
    }

    // 3. Clear errors and initiate controlled search loading state
    setErrorMessage('')
    setIsLoading(true)
    setSearchResult(null)

    // Simulate search delay (400ms) for realistic feedback then navigate to connected setup flow
    setTimeout(() => {
      setIsLoading(false)
      const encodedModel = encodeURIComponent(query)
      const encodedOption = encodeURIComponent(selectedOption)
      navigate(`/set-up-your-printer?model=${encodedModel}&option=${encodedOption}`)
    }, 400)
  }

  return (
    <div className="w-full min-h-screen lg:min-h-0 lg:h-screen lg:h-[100dvh] lg:max-h-[100dvh] bg-white text-slate-800 antialiased flex flex-col overflow-x-hidden lg:overflow-hidden selection:bg-[#0096D6] selection:text-white">
      
      {/* =========================================================================
          ROW 1: PRINTER SETUP HERO (~29% of viewport height on desktop)
          Clean white two-column layout matching reference
         ========================================================================= */}
      <section className="w-full bg-white flex-shrink-0 lg:h-[29%] min-h-0 flex items-center px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Supporting Text */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <h1 className="text-xl sm:text-2xl lg:text-[26px] xl:text-[32px] font-bold text-slate-900 tracking-tight leading-snug">
                We&apos;re here to help you set up your printer
              </h1>
              
              <p className="mt-2 lg:mt-2.5 text-xs sm:text-sm lg:text-[13px] xl:text-sm text-slate-600 leading-relaxed max-w-xl">
                Let&apos;s connect your printer to a Wi-Fi or wired network or to a computer using a USB cable. First, tell us your printer model.
              </p>
            </div>

            {/* Right Column: Premium Modern Printers Setup Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none flex justify-center lg:justify-end items-center">
                <img
                  src="/assets/find-printer-hero.webp"
                  alt="Modern desktop and compact home printers with printed test page and mobile setup app"
                  className="w-auto h-auto max-h-[125px] sm:max-h-[145px] lg:max-h-[20vh] xl:max-h-[190px] 2xl:max-h-[220px] object-contain select-none pointer-events-none"
                  loading="eager"
                  draggable={false}
                  width={600}
                  height={300}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ROW 2: FIND YOUR PRINTER (~54% of viewport height on desktop)
          Light grey section with interactive form, vertical divider & black laser printer visual
         ========================================================================= */}
      <section className="w-full bg-[#f8f9fa] border-y border-slate-200/80 flex-1 lg:h-[54%] min-h-0 flex items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Printer Search Form */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col text-left">
              
              {/* Radio Buttons: Unpack / Setup vs Troubleshoot */}
              <fieldset className="space-y-2 sm:space-y-2.5" role="radiogroup" aria-label="Support Type Selection">
                
                {/* Option 1: Unpack, Setup New Printer */}
                <label 
                  className={`flex items-center gap-3 cursor-pointer select-none group w-fit transition-colors ${
                    selectedOption === 'setup' ? 'text-slate-900' : 'text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="printer-support-type"
                    value="setup"
                    checked={selectedOption === 'setup'}
                    onChange={() => handleOptionChange('setup')}
                    className="w-4 h-4 text-[#0096D6] border-slate-300 focus:ring-[#0096D6] focus:ring-offset-0 cursor-pointer accent-[#0096D6]"
                  />
                  <span className={`text-xs sm:text-sm lg:text-[14px] ${
                    selectedOption === 'setup' ? 'font-semibold text-slate-900' : 'font-medium text-slate-700 group-hover:text-slate-900'
                  }`}>
                    Unpack, Setup New Printer
                  </span>
                </label>

                {/* Option 2: Troubleshoot Printer Issues */}
                <label 
                  className={`flex items-center gap-3 cursor-pointer select-none group w-fit transition-colors ${
                    selectedOption === 'troubleshoot' ? 'text-slate-900' : 'text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="printer-support-type"
                    value="troubleshoot"
                    checked={selectedOption === 'troubleshoot'}
                    onChange={() => handleOptionChange('troubleshoot')}
                    className="w-4 h-4 text-[#0096D6] border-slate-300 focus:ring-[#0096D6] focus:ring-offset-0 cursor-pointer accent-[#0096D6]"
                  />
                  <span className={`text-xs sm:text-sm lg:text-[14px] ${
                    selectedOption === 'troubleshoot' ? 'font-semibold text-slate-900' : 'font-medium text-slate-700 group-hover:text-slate-900'
                  }`}>
                    Troubleshoot Printer Issues
                  </span>
                </label>

              </fieldset>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="mt-3.5 sm:mt-4 lg:mt-3" noValidate>
                
                <label 
                  htmlFor="printer-search-input" 
                  className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5"
                >
                  Enter your serial number, product number or product name
                </label>

                <div className="max-w-md">
                  <div className="relative">
                    <input
                      id="printer-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      placeholder="Search"
                      aria-label="Enter your serial number, product number or product name"
                      aria-invalid={!!errorMessage}
                      aria-describedby={errorMessage ? "search-error-msg" : undefined}
                      className={`w-full bg-white border ${
                        errorMessage ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-[#0096D6] focus:ring-[#0096D6]/20'
                      } rounded-md px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 transition-all`}
                    />
                  </div>

                  {/* Inline Validation Error Display */}
                  {errorMessage && (
                    <div 
                      id="search-error-msg" 
                      className="mt-1.5 text-xs text-red-600 flex items-start gap-1 font-medium" 
                      role="alert"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-2.5 sm:mt-3">
                    <button
                      type="submit"
                      disabled={!selectedOption || isLoading}
                      aria-label="Submit printer search"
                      className={`font-semibold text-xs sm:text-sm px-5 py-2 sm:py-2.5 rounded-md transition-all inline-flex items-center justify-center gap-2 min-w-[90px] focus:outline-none ${
                        !selectedOption || isLoading
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-[#0096D6] hover:bg-[#0077B5] text-white cursor-pointer shadow-xs active:scale-[0.99]'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Searching...</span>
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>
                </div>

              </form>

              {/* Helpful Search Result / Next-Step Notification */}
              {searchResult && (
                <div 
                  className="mt-3 p-3 bg-white border border-slate-200 rounded-lg shadow-xs max-w-md transition-all"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {searchResult.mode === 'setup' 
                            ? 'Printer Setup Guidance' 
                            : 'Printer Troubleshooting Solution'}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {searchResult.timestamp}
                        </span>
                      </div>
                      
                      <p className="mt-0.5 text-[11px] text-slate-600 leading-tight truncate">
                        Guidance for &ldquo;<strong className="text-slate-800">{searchResult.query}</strong>&rdquo;
                      </p>

                      <div className="mt-2 flex flex-wrap sm:flex-nowrap gap-2">
                        {searchResult.mode === 'setup' ? (
                          <>
                            <Link
                              to="/easy-step-by-step-setup-guide#hp-setup-guide"
                              className="flex-1 bg-[#0096D6] hover:bg-[#0077B5] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-md inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs truncate"
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span className="truncate">Open Setup Guide</span>
                            </Link>
                            
                            <button
                              type="button"
                              onClick={handleOpenLiveChat}
                              className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1.5 rounded-md border border-slate-200 inline-flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
                            >
                              <MessageSquare className="w-3 h-3 text-[#0096D6]" />
                              <span>Live Chat</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/easy-step-by-step-setup-guide#hp-offline-troubleshooting"
                              className="flex-1 bg-[#0096D6] hover:bg-[#0077B5] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-md inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs truncate"
                            >
                              <RefreshCw className="w-3 h-3 shrink-0" />
                              <span className="truncate">View Fixes</span>
                            </Link>

                            <button
                              type="button"
                              onClick={handleOpenLiveChat}
                              className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1.5 rounded-md border border-slate-200 inline-flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
                            >
                              <MessageSquare className="w-3 h-3 text-[#0096D6]" />
                              <span>Live Chat</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Desktop Vertical Divider */}
            <div className="hidden lg:flex lg:col-span-1 justify-center items-center h-full" aria-hidden="true">
              <div className="w-px h-36 lg:h-40 xl:h-48 bg-slate-300/80" />
            </div>

            {/* Right Column: Front-Facing Black Laser Printer Visual */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none flex justify-center items-center">
                <img
                  src="/assets/find-printer-product.webp"
                  alt="Front-facing view of a modern compact black laser printer"
                  className="w-auto h-auto max-h-[160px] sm:max-h-[190px] lg:max-h-[26vh] xl:max-h-[235px] 2xl:max-h-[265px] object-contain select-none pointer-events-none drop-shadow-sm"
                  loading="lazy"
                  draggable={false}
                  width={600}
                  height={450}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ROW 3: SUPPORTING CONTENT (~17% of viewport height on desktop)
          Clean minimal white section below search area
         ========================================================================= */}
      <section className="w-full bg-white flex-shrink-0 lg:h-[17%] min-h-0 flex items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-3xl text-left">
            <p className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-slate-600 leading-relaxed">
              We&apos;ve made it easy to download printer software. Enter your product name and we&apos;ll help you find the right drivers and setup tools for your printer.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
export default FindPrinter
