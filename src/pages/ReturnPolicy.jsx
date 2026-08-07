import React, { useEffect } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { RotateCcw, ShieldCheck, Mail, Clock, CheckCircle2, AlertCircle, Package, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ReturnPolicy() {
  useEffect(() => {
    document.title = 'Return Policy | Nova Ink LLC'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Review Nova Ink LLC Refund & Return Policy explaining return eligibility, non-returnable items, step-by-step return process, and refund details.')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Subpage Hero Banner */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-lg text-center overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-support.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#172136]/85 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              CUSTOMER SATISFACTION GUARANTEE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              Refund & Return <span className="text-[#0096D6]">Policy</span>
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
              At Nova Ink LLC, we want you to feel confident when shopping with us. We understand that sometimes a product may not be the right fit or an unexpected issue may arise.
            </p>

            <p>
              This Refund & Return Policy explains when a return or refund may be available, how the process works, and what to expect if you need to send an item back.
            </p>

            <p className="font-semibold text-slate-800">
              Please read this policy carefully before making a purchase.
            </p>

            {/* Section 1: Return Eligibility */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0096D6]" /> Return Eligibility
              </h2>
              <p>
                Most eligible products may be returned within the return period specified on the product page or order confirmation.
              </p>
              <p>To qualify for a return, items should:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Be in their original condition.</li>
                <li>Include all original accessories, manuals, and packaging.</li>
                <li>Show no signs of misuse, damage, or excessive wear.</li>
                <li>Be accompanied by proof of purchase or your order number.</li>
              </ul>
              <p className="pt-1">
                Certain products may have different return requirements. If so, those details will be clearly stated on the product page.
              </p>
            </div>

            {/* Section 2: Items That Cannot Be Returned */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#0096D6]" /> Items That Cannot Be Returned
              </h2>
              <p>
                For health, safety, or product integrity reasons, some items may not be eligible for return.
              </p>
              <p>These may include:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Opened or used consumables such as ink cartridges or toner cartridges.</li>
                <li>Products damaged after delivery due to misuse or improper handling.</li>
                <li>Clearance or final sale items.</li>
                <li>Special-order or customized products.</li>
                <li>Items returned without the original packaging when packaging is required.</li>
              </ul>
              <p className="pt-1">
                If you're unsure whether your item qualifies, please contact us before sending it back.
              </p>
            </div>

            {/* Section 3: Damaged, Defective, or Incorrect Items */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <Package className="w-5 h-5 text-[#0096D6]" /> Damaged, Defective, or Incorrect Items
              </h2>
              <p>
                If your order arrives damaged, defective, or you receive the wrong item, please let us know as soon as possible.
              </p>
              <p>To help us review your request quickly, please include:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Your order number.</li>
                <li>Photos of the product.</li>
                <li>Photos of the shipping package (if applicable).</li>
                <li>A brief description of the issue.</li>
              </ul>
              <p className="pt-1">
                We'll review the information and work with you to determine the appropriate next steps.
              </p>
            </div>

            {/* Section 4: Change of Mind */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Change of Mind
              </h2>
              <p>We understand that plans can change.</p>
              <p>If you decide you no longer need a product, you may request a return provided:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>The item has not been used.</li>
                <li>It remains in its original packaging.</li>
                <li>It meets our return eligibility requirements.</li>
              </ul>
              <p className="pt-1">
                Shipping charges, where applicable, are generally non-refundable unless the return is the result of our error.
              </p>
            </div>

            {/* Section 5: Order Cancellations */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Order Cancellations
              </h2>
              <p>
                Orders may be canceled before they enter processing or shipment.
              </p>
              <p>
                Once an order has been prepared for shipment or handed over to the carrier, cancellation may no longer be possible.
              </p>
              <p>
                If your order has already shipped, you may need to follow the standard return process after delivery, if the item is eligible for return.
              </p>
            </div>

            {/* Section 6: How to Start a Return */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#0096D6]" /> How to Start a Return
              </h2>
              <p>Starting a return is simple.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="text-[#0096D6] font-black text-xs uppercase tracking-wider mb-1">Step 1</div>
                  <p className="text-xs text-slate-700 font-medium">
                    Contact Nova Ink LLC with your order number, name, email address, and reason for the return.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="text-[#0096D6] font-black text-xs uppercase tracking-wider mb-1">Step 2</div>
                  <p className="text-xs text-slate-700 font-medium">
                    If your return is eligible, we'll provide instructions on how to return your item.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="text-[#0096D6] font-black text-xs uppercase tracking-wider mb-1">Step 3</div>
                  <p className="text-xs text-slate-700 font-medium">
                    Package the item securely, including any original accessories and documentation.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="text-[#0096D6] font-black text-xs uppercase tracking-wider mb-1">Step 4</div>
                  <p className="text-xs text-slate-700 font-medium">
                    Once we receive and inspect the returned item, we'll notify you of the outcome.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7: Refund Process */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Refund Process
              </h2>
              <p>
                If your return is approved, your refund will be issued to the original payment method used during checkout.
              </p>
              <p>
                Depending on your payment provider or financial institution, it may take several business days for the funds to appear in your account after the refund has been processed.
              </p>
            </div>

            {/* Section 8: Shipping Charges */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Shipping Charges
              </h2>
              <p>Shipping charges are generally non-refundable unless:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>You received the wrong product.</li>
                <li>The item arrived damaged.</li>
                <li>The item has a verified manufacturing defect.</li>
                <li>The return is the result of an error on our part.</li>
              </ul>
              <p className="pt-1">
                For all other eligible returns, original shipping charges may not be refunded.
              </p>
            </div>

            {/* Section 9: Return Shipping */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Return Shipping
              </h2>
              <p>
                Unless the return is due to our error or an approved product issue, customers are generally responsible for return shipping costs.
              </p>
              <p>
                We recommend using a trackable shipping service whenever returning an item, as we cannot guarantee receipt of packages that are lost during transit.
              </p>
            </div>

            {/* Section 10: Inspection of Returned Items */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Inspection of Returned Items
              </h2>
              <p>Every returned item is inspected before a refund is approved.</p>
              <p>We reserve the right to decline a refund if:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>The product has been used beyond reasonable inspection.</li>
                <li>Parts or accessories are missing.</li>
                <li>The item has been damaged after delivery.</li>
                <li>The product does not meet our return requirements.</li>
              </ul>
              <p className="pt-1">
                This helps ensure a fair process for all customers.
              </p>
            </div>

            {/* Section 11: Exchanges */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Exchanges
              </h2>
              <p>
                If you received the wrong item or a product with a verified defect, we may offer an exchange instead of a refund, depending on product availability.
              </p>
              <p>
                Exchange requests are reviewed on a case-by-case basis.
              </p>
            </div>

            {/* Section 12: Late or Missing Refunds */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Late or Missing Refunds
              </h2>
              <p>If you've been notified that your refund has been processed but haven't received it:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Check your bank or card account again.</li>
                <li>Contact your credit card provider, as processing times may vary.</li>
                <li>Contact your bank, as some refunds take additional time to post.</li>
              </ul>
              <p className="pt-1">
                If you've completed these steps and still haven't received your refund, please get in touch with us.
              </p>
            </div>

            {/* Section 13: Policy Updates */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Policy Updates
              </h2>
              <p>
                We may update this Refund & Return Policy from time to time to reflect changes in our products, services, or business practices.
              </p>
              <p>
                Any updates will be posted on this page along with the revised Last Updated date.
              </p>
            </div>

            {/* Section 14: Contact Us */}
            <div className="pt-6 border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0096D6]" /> Contact Us
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  If you have questions about returns, refunds, or exchanges, you can reach us at:
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

                <div className="pt-4">
                  <Link to="/contact">
                    <button className="bg-[#0096D6] text-white hover:bg-[#0077B5] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer inline-flex items-center gap-2">
                      <span>Contact Support Team</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
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
