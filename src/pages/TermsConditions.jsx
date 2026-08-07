import React, { useEffect } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { FileText, Mail, Clock } from 'lucide-react'

export function TermsConditions() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Nova Ink LLC'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', "Review the Terms & Conditions governing the use of Nova Ink LLC's website, products, and services.")
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Subpage Hero Banner */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-solutions.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#172136]/85 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              TERMS OF SERVICE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              Terms & <span className="text-[#0096D6]">Conditions</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-extrabold tracking-wider uppercase">
              Last Updated: August 2026
            </p>
          </div>
        </div>

        {/* Policy Content Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            
            <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
              Welcome to Nova Ink LLC.
            </p>

            <p>
              These Terms & Conditions explain the rules for using our website and purchasing products from us. By accessing our website or placing an order, you agree to follow these terms. If you do not agree with any part of these Terms & Conditions, please discontinue using our website.
            </p>

            <p>
              We encourage you to read this page carefully before making a purchase.
            </p>

            {/* Section 1 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                About Nova Ink LLC
              </h2>
              <p>
                Nova Ink LLC is an online retailer offering printers, printing supplies, accessories, and related products for customers across the United States.
              </p>
              <p>
                These Terms apply to everyone who visits our website, creates an account, or purchases products through our online store.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Using Our Website
              </h2>
              <p>
                You agree to use our website only for lawful purposes and in a way that does not interfere with its operation or prevent others from using it.
              </p>
              <p>When using our website, you agree that you will not:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Violate any applicable laws or regulations.</li>
                <li>Attempt to gain unauthorized access to our systems.</li>
                <li>Upload harmful software, viruses, or malicious code.</li>
                <li>Use our website for fraudulent or misleading activities.</li>
                <li>Copy or misuse website content without written permission.</li>
              </ul>
              <p className="pt-1">
                We reserve the right to restrict or suspend access if we believe our website is being used improperly.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Product Information
              </h2>
              <p>
                We work hard to provide accurate descriptions, specifications, pricing, and product images.
              </p>
              <p>However:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Product images are for illustration purposes and may vary slightly from the actual product.</li>
                <li>Specifications may change as manufacturers update their products.</li>
                <li>Colors may appear differently depending on your device or screen settings.</li>
                <li>Availability may change without prior notice.</li>
              </ul>
              <p className="pt-1">
                If we discover an error in product information or pricing, we reserve the right to correct it before processing an order.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Pricing
              </h2>
              <p>
                All prices displayed on our website are shown in U.S. Dollars (USD) unless otherwise stated.
              </p>
              <p>Prices may change at any time without prior notice.</p>
              <p>
                Taxes and shipping charges, where applicable, will be calculated during checkout before your order is completed.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Orders
              </h2>
              <p>
                After placing an order, you'll receive an email confirming that we've received it.
              </p>
              <p>This confirmation does not mean your order has been accepted.</p>
              <p>
                We reserve the right to cancel or decline an order for reasons including, but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Product availability</li>
                <li>Pricing errors</li>
                <li>Payment authorization issues</li>
                <li>Suspected fraudulent activity</li>
                <li>Incorrect shipping information</li>
              </ul>
              <p className="pt-1">
                If your order cannot be completed after payment has been received, any applicable refund will be processed using the original payment method.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Shipping & Delivery
              </h2>
              <p>We ship orders throughout the United States.</p>
              <p>
                Estimated delivery times are provided as a guide and may vary depending on:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Product availability</li>
                <li>Carrier schedules</li>
                <li>Weather conditions</li>
                <li>Shipping destination</li>
                <li>Other circumstances outside our control</li>
              </ul>
              <p className="pt-1">
                Once your order has been shipped, you'll receive tracking information when available.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Returns & Refunds
              </h2>
              <p>
                Our Returns & Refund Policy explains the eligibility requirements and process for returning products.
              </p>
              <p>
                Before requesting a return, please review that policy for complete details regarding:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Return eligibility</li>
                <li>Return timeframes</li>
                <li>Product condition requirements</li>
                <li>Refund processing</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Warranty Information
              </h2>
              <p>
                Warranty coverage, when available, is provided by the product manufacturer unless otherwise stated.
              </p>
              <p>
                Warranty terms, coverage periods, and conditions vary by product and manufacturer.
              </p>
              <p>
                Please refer to the warranty information included with your product or listed on the product page.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Intellectual Property
              </h2>
              <p>
                All content available on the Nova Ink LLC website, including:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Text</li>
                <li>Images</li>
                <li>Graphics</li>
                <li>Logos</li>
                <li>Icons</li>
                <li>Product layouts</li>
                <li>Website design</li>
                <li>Written content</li>
              </ul>
              <p className="pt-1">
                is owned by Nova Ink LLC or used with appropriate permission and is protected by applicable intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, publish, or commercially use any website content without our prior written consent.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Third-Party Links
              </h2>
              <p>
                Our website may include links to third-party websites for your convenience.
              </p>
              <p>
                These websites operate independently from Nova Ink LLC, and we are not responsible for their content, policies, products, or services.
              </p>
              <p>Visiting third-party websites is at your own discretion.</p>
            </div>

            {/* Section 11 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Nova Ink LLC shall not be responsible for indirect, incidental, consequential, or special damages arising from:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>The use of our website</li>
                <li>Delays in delivery</li>
                <li>Product availability</li>
                <li>Website interruptions</li>
                <li>Technical issues beyond our reasonable control</li>
              </ul>
              <p className="pt-1">
                Nothing in these Terms limits any rights that cannot legally be limited under applicable law.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Website Availability
              </h2>
              <p>We aim to keep our website available and up to date.</p>
              <p>
                However, we cannot guarantee uninterrupted access at all times. We may temporarily suspend, modify, or discontinue parts of the website for maintenance, updates, or other operational reasons.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Privacy
              </h2>
              <p>
                Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
              </p>
              <p>
                We encourage you to review our Privacy Policy alongside these Terms & Conditions.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms & Conditions from time to time as our business, products, or legal requirements change.
              </p>
              <p>
                Any updates will be published on this page along with the revised "Last Updated" date.
              </p>
              <p>
                By continuing to use our website after changes have been posted, you agree to the updated Terms.
              </p>
            </div>

            {/* Section 15 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Governing Law
              </h2>
              <p>
                These Terms & Conditions are governed by the laws applicable in the United States and, where appropriate, the state in which Nova Ink LLC operates.
              </p>
              <p>
                Any disputes arising from the use of this website or purchases made through it will be handled in accordance with applicable law.
              </p>
            </div>

            {/* Section 16: Contact Us */}
            <div className="pt-6 border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0096D6]" /> Contact Us
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  If you have any questions regarding these Terms & Conditions, you can reach us using the contact information below.
                </p>
                
                <div className="pt-2 text-xs space-y-2">
                  <div className="font-black text-slate-900 uppercase">Nova Ink LLC</div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Mail className="w-4 h-4 text-[#0096D6]" />
                    <span>Email: <a href="mailto:info@novainkllc.com" className="text-[#0096D6] hover:underline">info@novainkllc.com</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Clock className="w-4 h-4 text-[#0096D6]" />
                    <span>Business Hours: Monday – Friday | 9:00 AM – 6:00 PM (EST)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
