import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { Mail, Phone, MapPin, Clock, Send, Printer, PackageCheck, RotateCcw, Building2 } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  const helpCards = [
    {
      icon: Printer,
      title: 'Product Recommendations',
      desc: "Need help choosing the right printer? We'll point you in the right direction."
    },
    {
      icon: PackageCheck,
      title: 'Order Questions',
      desc: "Need an update on your order or shipping? We're happy to help."
    },
    {
      icon: RotateCcw,
      title: 'Returns & Exchanges',
      desc: "Questions about returns? We'll explain the process and next steps."
    },
    {
      icon: Building2,
      title: 'Business Orders',
      desc: 'Looking to purchase in bulk? Contact us for business inquiries and volume pricing.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Unified Subpage Hero Banner */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-contact.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#172136]/85 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              CONTACT OUR <span className="text-[#0096D6]">SPECIALISTS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Have questions about printer models, bulk supplies, or order status? Send us a message and our team will get back to you promptly.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact Details Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">
                  Direct Contact Info
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase">Email Us</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">info@novainkllc.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase">Call Us</h4>
                    <a href="tel:+12137565298" className="text-xs text-slate-600 font-medium mt-0.5 block hover:text-[#0096D6] transition-colors">
                      +1 213-756-5298
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase">Corporate HQ</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">8787 Shenandoah Park Dr, Apt 826</p>
                    <p className="text-xs text-slate-600 font-medium">Shenandoah, TX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096D6] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase">Business Hours</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">Monday – Friday: 8:00 AM – 6:00 PM CST</p>
                    <p className="text-xs text-slate-600 font-medium">Saturday: 9:00 AM – 2:00 PM CST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Right */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
                <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">
                  Send Us a Message
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">
                  Fill out the form below and a representative will get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center">
                    <h4 className="text-sm font-extrabold uppercase mb-1">Message Sent Successfully!</h4>
                    <p className="text-xs">Thank you for reaching out to Nova Ink LLC. We will review your message and reply shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry regarding printer model or quote..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message *</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message or inquiry here..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0096D6]"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full uppercase font-extrabold text-xs tracking-wider" icon={Send} iconPosition="right">
                      Submit Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* What Can We Help You With Section (Cleaned: Outer Container Card Removed) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              CUSTOMER ASSISTANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
              What Can We <span className="text-[#0096D6]">Help You With?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Whether you're shopping for a printer, tracking an order, or looking for business solutions, our team is here to help.
            </p>
          </div>

          {/* 4 Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 hover:border-[#0096D6] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-xs group flex flex-col justify-between cursor-default"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0096D6] flex items-center justify-center mb-5 group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300 shrink-0">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-[#0096D6] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
