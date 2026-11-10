import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { 
  Printer, 
  Check, 
  CheckCircle2, 
  X, 
  Loader2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react'

// Input sanitization to prevent XSS and limit length
function sanitizeInput(str) {
  if (typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/[<>'"/\\&]/g, '')
    .slice(0, 80)
}

export function SetUpYourPrinter() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Extract and sanitize query parameters
  const rawModel = searchParams.get('model') || ''
  const rawOption = searchParams.get('option') || 'setup'
  
  const model = useMemo(() => sanitizeInput(rawModel), [rawModel])
  const option = useMemo(() => sanitizeInput(rawOption) || 'setup', [rawOption])

  // Modal & Setup Simulation State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1, 2, 3, 4
  const [progressPercent, setProgressPercent] = useState(15)
  const [stepStatuses, setStepStatuses] = useState({
    1: 'processing', // 'pending' | 'processing' | 'done' | 'failed'
    2: 'pending',
    3: 'pending',
    4: 'pending'
  })

  // SEO Strict Noindex & Document Title
  useEffect(() => {
    document.title = "Set Up Your Printer | Nova Ink LLC"
    
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
      if (createdRobots && robotsMeta) {
        robotsMeta.remove()
      } else if (robotsMeta && previousRobots !== null) {
        robotsMeta.setAttribute('content', previousRobots)
      } else if (robotsMeta) {
        robotsMeta.removeAttribute('content')
      }
    }
  }, [])

  // Controlled Setup Preparation Sequence with Automatic Redirection on Failure
  useEffect(() => {
    if (!isModalOpen) {
      // Reset state on close
      setCurrentStep(1)
      setProgressPercent(15)
      setStepStatuses({ 1: 'processing', 2: 'pending', 3: 'pending', 4: 'pending' })
      return
    }

    let isCancelled = false
    let t1, t2, t3, t4

    // Step 1: Detecting Printer -> Done (35%)
    t1 = setTimeout(() => {
      if (isCancelled) return
      setStepStatuses(prev => ({ ...prev, 1: 'done', 2: 'processing' }))
      setCurrentStep(2)
      setProgressPercent(35)
    }, 900)

    // Step 2: Verifying Internet Connection -> Done (55%)
    t2 = setTimeout(() => {
      if (isCancelled) return
      setStepStatuses(prev => ({ ...prev, 2: 'done', 3: 'processing' }))
      setCurrentStep(3)
      setProgressPercent(55)
    }, 1800)

    // Step 3: Analyzing Printer Configuration -> Done (70%)
    t3 = setTimeout(() => {
      if (isCancelled) return
      setStepStatuses(prev => ({ ...prev, 3: 'done', 4: 'processing' }))
      setCurrentStep(4)
      setProgressPercent(70)
    }, 2700)

    // Step 4: Preparing Setup -> Final stage failure automatically redirects without requiring clicks
    t4 = setTimeout(() => {
      if (isCancelled) return
      setStepStatuses(prev => ({ ...prev, 4: 'failed' }))
      setProgressPercent(70)

      // Automatically navigate to error resolution page preserving printer model and option
      const encodedModel = encodeURIComponent(model || 'Printer')
      const encodedOption = encodeURIComponent(option)
      navigate(`/printer-setup-error?model=${encodedModel}&option=${encodedOption}&error=C0002`, { replace: true })
    }, 3800)

    return () => {
      isCancelled = true
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [isModalOpen, model, option, navigate])

  // Handle Close Modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Keyboard accessibility for modal (ESC key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, handleCloseModal])

  return (
    <div className="w-full min-h-screen lg:min-h-0 lg:h-screen lg:h-[100dvh] lg:max-h-[100dvh] bg-white text-slate-800 antialiased flex flex-col justify-center overflow-x-hidden lg:overflow-hidden selection:bg-[#0052cc] selection:text-white">
      
      {/* Main Content Area: Spacious Two-Column Layout fitting strictly within 100vh on Desktop */}
      <main className="flex-1 min-h-0 flex items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Eyebrow, Heading, Model Bar, 4 Guidance Steps & Install Button */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 mb-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-[#0052cc] tracking-wider uppercase">
                  PRINTER SETUP
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[38px] font-bold text-slate-900 tracking-tight leading-tight">
                Ready to Set Up Your Printer?
              </h1>

              {/* Supporting Text */}
              <p className="mt-2 text-xs sm:text-sm lg:text-[13px] xl:text-sm text-slate-600 leading-relaxed max-w-xl">
                {model ? (
                  <>Your printer has been identified. Follow the guided setup process to prepare your printer for use.</>
                ) : (
                  <>Follow the guided setup process for your printer.</>
                )}
              </p>

              {/* Printer Model Information Bar matching Reference Screenshot 1 */}
              <div className="mt-4 sm:mt-5 bg-[#edf2f7] border border-slate-200/80 rounded-lg px-4 py-2.5 sm:py-3 flex items-center justify-between max-w-xl shadow-2xs">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  PRINTER MODEL
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <Printer className="w-4 h-4 text-[#0052cc] shrink-0" />
                  <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {model || 'Identified Printer'}
                  </span>
                </div>
              </div>

              {/* Four Setup Guidance Items in a 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 sm:gap-y-4 mt-5 sm:mt-6 max-w-xl">
                
                {/* Step 1 */}
                <div className="flex flex-col text-left">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Identify your printer
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 pl-6 leading-relaxed">
                    Confirm your printer model before installation.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col text-left">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Prepare the connection
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 pl-6 leading-relaxed">
                    Make sure your printer is powered on and ready to connect.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col text-left">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Configure your printer
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 pl-6 leading-relaxed">
                    Follow the guided setup process for your device.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col text-left">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Get ready to print
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 pl-6 leading-relaxed">
                    Complete setup and prepare your printer for everyday use.
                  </p>
                </div>

              </div>

              {/* Install Now Button */}
              <div className="mt-6 sm:mt-7 max-w-xl">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Begin printer setup and installation"
                  className="w-full bg-[#0052cc] hover:bg-[#0043a8] text-white font-semibold py-3 sm:py-3.5 px-6 rounded-lg text-sm sm:text-base shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:ring-offset-2"
                >
                  <span>Install Now</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

            </div>

            {/* Right Column: Realistic Printer Setup Scene (No HP logos/branding) */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-md border border-slate-200/70 bg-white">
                <img
                  src="/images/setup-printer-scene.webp"
                  alt="Modern unbranded desktop and all-in-one printers arranged neatly in a bright workspace"
                  className="w-full h-auto max-h-[300px] sm:max-h-[360px] lg:max-h-[46vh] xl:max-h-[420px] object-cover select-none pointer-events-none"
                  loading="eager"
                  draggable={false}
                  width={1200}
                  height={896}
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* =========================================================================
          SETUP PROGRESS MODAL (Matching Reference Screenshot 2)
         ========================================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="setup-modal-title"
        >
          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative border border-slate-100 flex flex-col text-left animate-in zoom-in-95 duration-150">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close setup modal"
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Subtitle */}
            <h2 id="setup-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 pr-8">
              Preparing Your Printer Setup
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {stepStatuses[4] === 'failed' 
                ? 'Setup preparation stopped at the final stage.' 
                : 'Preparing installation software...'}
            </p>

            {/* Progress Percentage & Bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                <span className="font-semibold text-slate-700">Progress</span>
                <span className={`font-bold font-mono ${stepStatuses[4] === 'failed' ? 'text-red-600' : 'text-[#0052cc]'}`}>
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    stepStatuses[4] === 'failed' ? 'bg-red-500' : 'bg-[#0052cc]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Four Setup Stages List */}
            <div className="mt-5 space-y-2.5">
              
              {/* Stage 1: Detecting Printer */}
              <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                stepStatuses[1] === 'done' 
                  ? 'bg-emerald-50/50 border-emerald-100/80 text-slate-800' 
                  : stepStatuses[1] === 'processing' 
                  ? 'bg-blue-50/60 border-blue-200 text-slate-900' 
                  : 'bg-slate-50/60 border-slate-100 text-slate-400'
              }`}>
                <div className="flex items-center gap-2.5">
                  {stepStatuses[1] === 'done' ? (
                    <div className="w-5 h-5 rounded-full bg-[#00875a] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : stepStatuses[1] === 'processing' ? (
                    <div className="w-5 h-5 rounded-full bg-[#0052cc] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      1
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                      1
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    Detecting Printer
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {stepStatuses[1] === 'done' && (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Done
                    </span>
                  )}
                  {stepStatuses[1] === 'processing' && (
                    <span className="text-[#0052cc] flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Processing
                    </span>
                  )}
                </div>
              </div>

              {/* Stage 2: Verifying Internet Connection */}
              <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                stepStatuses[2] === 'done' 
                  ? 'bg-emerald-50/50 border-emerald-100/80 text-slate-800' 
                  : stepStatuses[2] === 'processing' 
                  ? 'bg-blue-50/60 border-blue-200 text-slate-900' 
                  : 'bg-slate-50/60 border-slate-100 text-slate-400'
              }`}>
                <div className="flex items-center gap-2.5">
                  {stepStatuses[2] === 'done' ? (
                    <div className="w-5 h-5 rounded-full bg-[#00875a] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : stepStatuses[2] === 'processing' ? (
                    <div className="w-5 h-5 rounded-full bg-[#0052cc] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      2
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                      2
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    Verifying Internet Connection
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {stepStatuses[2] === 'done' && (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Done
                    </span>
                  )}
                  {stepStatuses[2] === 'processing' && (
                    <span className="text-[#0052cc] flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Processing
                    </span>
                  )}
                </div>
              </div>

              {/* Stage 3: Analyzing Printer Configuration */}
              <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                stepStatuses[3] === 'done' 
                  ? 'bg-emerald-50/50 border-emerald-100/80 text-slate-800' 
                  : stepStatuses[3] === 'processing' 
                  ? 'bg-blue-50/60 border-blue-200 text-slate-900' 
                  : 'bg-slate-50/60 border-slate-100 text-slate-400'
              }`}>
                <div className="flex items-center gap-2.5">
                  {stepStatuses[3] === 'done' ? (
                    <div className="w-5 h-5 rounded-full bg-[#00875a] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : stepStatuses[3] === 'processing' ? (
                    <div className="w-5 h-5 rounded-full bg-[#0052cc] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      3
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                      3
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    Analyzing Printer Configuration
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {stepStatuses[3] === 'done' && (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Done
                    </span>
                  )}
                  {stepStatuses[3] === 'processing' && (
                    <span className="text-[#0052cc] flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Processing
                    </span>
                  )}
                </div>
              </div>

              {/* Stage 4: Preparing / Preparing Setup */}
              <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                stepStatuses[4] === 'failed' 
                  ? 'bg-red-50/60 border-red-200 text-slate-900' 
                  : stepStatuses[4] === 'processing' 
                  ? 'bg-blue-50/60 border-blue-200 text-slate-900' 
                  : 'bg-slate-50/60 border-slate-100 text-slate-400'
              }`}>
                <div className="flex items-center gap-2.5">
                  {stepStatuses[4] === 'failed' ? (
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                      <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : stepStatuses[4] === 'processing' ? (
                    <div className="w-5 h-5 rounded-full bg-[#0052cc] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      4
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                      4
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    Preparing
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {stepStatuses[4] === 'failed' && (
                    <span className="text-red-600 flex items-center gap-1">
                      Incomplete
                    </span>
                  )}
                  {stepStatuses[4] === 'processing' && (
                    <span className="text-[#0052cc] flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Processing
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default SetUpYourPrinter
