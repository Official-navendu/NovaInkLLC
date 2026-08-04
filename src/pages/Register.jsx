import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { User, Mail, Phone, Lock, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react'

export function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setSuccess('Account created successfully! Redirecting to login...')
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3">
              REGISTER
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              CREATE YOUR <span className="text-[#0096D6]">ACCOUNT</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Join Nova Ink LLC for express ordering, warranty tracking, and exclusive discounts.
            </p>
          </div>

          {/* Validation Messages */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6] transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6] transition-colors"
                />
              </div>
            </div>

            {/* Phone Number (Optional) */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6] transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] focus:ring-1 focus:ring-[#0096D6] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0096D6] hover:bg-[#0077B5] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md shadow-[#0096D6]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>
          </form>

          {/* Link to Login */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0096D6] font-extrabold hover:underline">
              Sign In Here
            </Link>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
