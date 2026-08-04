import React, { useState } from 'react'
import { Mail, CheckCircle2, ShieldCheck, Lock } from 'lucide-react'
import { Button } from '../ui/Button'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 -mb-[24px] sm:-mb-[30px] relative z-20">
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-100 py-7 md:py-9 px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 items-center">
          
          {/* Column 1: Icon & Header */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#0096D6] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
                STAY UPDATED
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Subscribe for exclusive offers & updates.
              </p>
            </div>
          </div>

          {/* Column 2: Email Input */}
          <div className="pt-3 sm:pt-0 sm:pl-5 lg:pl-6">
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed Successfully!</span>
              </div>
            ) : (
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6] font-medium"
              />
            )}
          </div>

          {/* Column 3: Subscribe Button */}
          <div className="pt-3 sm:pt-0 sm:pl-5 lg:pl-6">
            <Button
              onClick={handleSubscribe}
              variant="primary"
              size="sm"
              className="w-full uppercase font-extrabold text-xs tracking-wider py-2.5"
            >
              Subscribe Now
            </Button>
          </div>

          {/* Column 4: Trust Information */}
          <div className="pt-3 sm:pt-0 sm:pl-5 lg:pl-6 flex flex-col gap-1 text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0096D6] shrink-0" />
              <span>100% Spam Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#0096D6] shrink-0" />
              <span>Privacy Guaranteed</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
