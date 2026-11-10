import React, { useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  AlertTriangle, 
  AlertCircle, 
  Check, 
  Phone, 
  PhoneCall, 
  MessageSquare,
  RotateCcw
} from 'lucide-react'

// Input sanitization to prevent XSS and limit length
function sanitizeInput(str) {
  if (typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/[<>'"/\\&]/g, '')
    .slice(0, 80)
}

export function PrinterSetupError() {
  const [searchParams] = useSearchParams()

  // Extract query parameters
  const rawModel = searchParams.get('model') || ''
  const rawOption = searchParams.get('option') || 'setup'
  const rawError = searchParams.get('error') || 'C0002'

  const model = useMemo(() => sanitizeInput(rawModel), [rawModel])
  const option = useMemo(() => sanitizeInput(rawOption), [rawOption])
  const errorCode = useMemo(() => sanitizeInput(rawError) || 'C0002', [rawError])

  // SEO Strict Noindex & Document Title
  useEffect(() => {
    document.title = "Setup Incomplete | Nova Ink LLC"
    
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

  return (
    <div className="w-full min-h-screen lg:min-h-0 lg:h-screen lg:h-[100dvh] lg:max-h-[100dvh] bg-white text-slate-800 antialiased flex flex-col justify-center overflow-x-hidden lg:overflow-hidden selection:bg-[#0096D6] selection:text-white">
      
      {/* Main Area: Two-Column Layout fitting strictly within 100vh on Desktop */}
      <main className="flex-1 min-h-0 flex items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* Left Column: Error Details & Diagnostic Status (Matching Reference Screenshot 3) */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 mb-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-[#0052cc] tracking-wider uppercase">
                  PRINTER SETUP
                </span>
              </div>

              {/* Main Heading with Red Warning Icon */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-100/80 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-bold text-slate-900 tracking-tight leading-tight">
                  Setup <span className="text-red-600">Incomplete</span>
                </h1>
              </div>

              {/* Supporting Text */}
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We couldn&apos;t complete your printer setup.
              </p>

              {/* Error Notification Banner */}
              <div className="mt-4 p-3 sm:p-3.5 bg-red-50/70 border border-red-200 border-l-4 border-l-red-500 rounded-md flex items-center gap-2.5 text-xs text-red-700 font-medium shadow-2xs max-w-xl">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span className="leading-snug">
                  Setup could not be completed during the final preparation stage.
                </span>
              </div>

              {/* Printer Details Box: PRINTER MODEL & ERROR CODE */}
              <div className="mt-4 sm:mt-5 bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 max-w-xl shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                    PRINTER MODEL
                  </div>
                  <div className="mt-1 font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {model || 'Identified Printer'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                    ERROR CODE
                  </div>
                  <div className="mt-1">
                    <span className="inline-block bg-red-50 text-red-600 border border-red-200/80 font-mono font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded">
                      {errorCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Status List */}
              <div className="mt-4 sm:mt-5 max-w-xl">
                <h2 className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                  DIAGNOSTIC STATUS
                </h2>

                <div className="space-y-2">
                  
                  {/* Stage 1 */}
                  <div className="flex items-center justify-between px-3.5 py-2 sm:py-2.5 bg-emerald-50/40 border border-emerald-100 rounded-lg">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>Detecting Printer</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>

                  {/* Stage 2 */}
                  <div className="flex items-center justify-between px-3.5 py-2 sm:py-2.5 bg-emerald-50/40 border border-emerald-100 rounded-lg">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>Verifying Internet Connection</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>

                  {/* Stage 3 */}
                  <div className="flex items-center justify-between px-3.5 py-2 sm:py-2.5 bg-emerald-50/40 border border-emerald-100 rounded-lg">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>Analyzing Printer Configuration</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>

                  {/* Stage 4 - Failed */}
                  <div className="flex items-center justify-between px-3.5 py-2 sm:py-2.5 bg-red-50/50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-700">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span>Preparing Your Printer Setup</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      Incomplete
                    </span>
                  </div>

                </div>
              </div>

              {/* Retry / Return Link */}
              <div className="mt-3.5 max-w-xl flex items-center gap-4 text-xs">
                <Link
                  to={`/set-up-your-printer?model=${encodeURIComponent(model)}&option=${encodeURIComponent(option)}`}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Retry Setup Preparation</span>
                </Link>
                <span className="text-slate-300">&bull;</span>
                <Link
                  to="/find-printer"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Choose Different Model
                </Link>
              </div>

            </div>

            {/* Right Column: Subtle Light-Blue Support Panel (Matching Reference Screenshot 3) */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="w-full max-w-md bg-[#f0f8ff] border border-sky-100 rounded-2xl p-6 sm:p-7 xl:p-8 flex flex-col items-center text-center shadow-xs">
                
                {/* Heading */}
                <h3 className="text-lg sm:text-xl xl:text-2xl font-bold text-slate-900 mt-1 sm:mt-2 leading-snug">
                  Need help completing your printer setup?
                </h3>

                {/* Supporting Text */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs">
                  Our dedicated customer support team is available to assist you with installation and setup completion.
                </p>

                {/* Toll-Free Support Box */}
                <div className="w-full bg-white border-2 border-[#0096D6] rounded-xl p-3.5 sm:p-4 mt-5 sm:mt-6 shadow-xs">
                  <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    TOLL-FREE SUPPORT
                  </span>
                  <a 
                    href="tel:+18332355889" 
                    className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 hover:text-[#0096D6] transition-colors inline-flex items-center justify-center gap-2 group"
                    aria-label="Call toll-free customer support at +1 833-235-5889"
                  >
                    <Phone className="w-5 h-5 text-[#0096D6] group-hover:scale-110 transition-transform" />
                    <span>+1 833-235-5889</span>
                  </a>
                </div>

                {/* Button 1: Call Customer Support */}
                <a
                  href="tel:+18332355889"
                  className="w-full mt-3.5 bg-[#0096D6] hover:bg-[#0077B5] text-white font-semibold py-3 px-5 rounded-lg text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span>Call Customer Support</span>
                </a>

                {/* Button 2: Chat Assistance */}
                <button
                  type="button"
                  onClick={handleOpenLiveChat}
                  className="w-full mt-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-5 rounded-lg text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 text-[#0096D6] shrink-0" />
                  <span>Chat Assistance</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  )
}

export default PrinterSetupError
