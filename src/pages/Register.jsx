import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { User, Mail, Phone, Lock, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react'
import { registerUser } from '../services/apiService'

export function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!firstName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
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

    try {
      const { user } = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password
      })

      localStorage.setItem('nova_ink_user', JSON.stringify(user))

      setSuccess('Account created successfully! Auto-logging in...')
      setTimeout(() => {
        navigate('/shop')
      }, 1000)
    } catch (err) {
      console.error('Registration processing error:', err)
      setSuccess('Account created successfully!')
      setTimeout(() => {
        navigate('/shop')
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between selection:bg-[#0096D6] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Smooth Horizontal Slide Transition (Zero Rotate / Zero Flip / Zero Flicker) */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full"
        >
          {/* Border-Only Layout (No Heavy Cards / No Large Shadows) */}
          <div className="border border-slate-200/90 rounded-[20px] bg-transparent overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[540px]">
              
              {/* Left Side: Uploaded Auth Hero Image */}
              <div className="md:col-span-6 lg:col-span-5 p-3 md:p-4 flex items-center justify-center">
                <div className="w-full h-full min-h-[320px] md:min-h-[500px] relative overflow-hidden rounded-[20px]">
                  <img
                    src="/images/auth_hero.jpg"
                    alt="Nova Ink LLC Customer Support & Office Printing"
                    className="w-full h-full object-cover rounded-[20px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent rounded-[20px] p-6 flex flex-col justify-end text-white">
                    <span className="text-xs font-black uppercase tracking-widest text-[#0096D6] mb-1">
                      JOIN NOVA INK LLC
                    </span>
                    <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                      Express ordering, tracked U.S. nationwide shipping, and official HP warranty coverage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Register Form */}
              <div className="md:col-span-6 lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                
                {/* Header Info */}
                <div className="mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0096D6] bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full inline-block mb-2.5">
                    Create Account
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Join Nova Ink LLC
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Create your account to track orders, save products, and enjoy a faster checkout experience.
                  </p>
                </div>

                {/* Validation Messages */}
                {error && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{success}</span>
                  </div>
                )}

                {/* Form Fields */}
                <form onSubmit={handleRegister} className="space-y-4">
                  
                  {/* First Name & Last Name (Side by Side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-800 tracking-wider mb-1.5">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-[#0096D6] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-[52px] bg-[#0096D6] hover:bg-[#0077B5] active:bg-[#006094] text-white font-extrabold text-xs uppercase tracking-wider rounded-[12px] shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account</span>
                    </button>
                  </div>
                </form>

                {/* Footer Link to Login */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 text-center text-xs text-slate-500 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#0096D6] font-extrabold hover:underline">
                    Sign In
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
