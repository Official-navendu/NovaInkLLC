import React, { useEffect } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ShieldCheck, Mail, Clock } from 'lucide-react'

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Nova Ink LLC'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn how Nova Ink LLC collects, uses, stores, and protects your personal information when you use our website and services.')
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
              LEGAL & POLICIES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              Privacy <span className="text-[#0096D6]">Policy</span>
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
              At Nova Ink LLC, we value your privacy and believe you should always know what information we collect, why we collect it, and how it's used. Whether you're browsing our website, placing an order, or contacting our help team, we're committed to handling your personal information responsibly and transparently.
            </p>

            <p>
              This Privacy Policy explains how we collect, use, store, and protect your information when you visit or make a purchase through our website. By using our website, you agree to the practices described in this Privacy Policy.
            </p>

            {/* Section 1 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Information We Collect
              </h2>
              <p>
                To provide you with a smooth shopping experience, we collect certain information when you interact with our website.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">
                Information You Provide
              </h3>
              <p>
                When you place an order, create an account, subscribe to our newsletter, or contact us, you may provide information such as:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing address</li>
                <li>Shipping address</li>
                <li>Payment information</li>
                <li>Order details</li>
                <li>Messages or inquiries submitted through our contact forms</li>
              </ul>
              <p className="pt-1">
                Providing this information helps us process your orders, communicate with you, and provide customer help.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">
                Information Collected Automatically
              </h3>
              <p>
                Like most websites, we automatically collect certain technical information when you visit Nova Ink LLC. This may include:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time spent on our website</li>
                <li>Referring website</li>
                <li>Shopping activity</li>
                <li>General location information</li>
              </ul>
              <p className="pt-1">
                This information helps us understand how visitors use our website so we can improve its performance and user experience.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                How We Use Your Information
              </h2>
              <p>
                The information we collect allows us to provide a better shopping experience and operate our business efficiently.
              </p>
              <p>We may use your information to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Process and fulfill your orders</li>
                <li>Verify payments</li>
                <li>Ship products</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to customer inquiries</li>
                <li>Recommend relevant products</li>
                <li>Improve our website and services</li>
                <li>Prevent fraudulent activity</li>
                <li>Comply with legal obligations</li>
                <li>Send promotional emails (only when you've chosen to receive them)</li>
              </ul>
              <p className="pt-1">
                We only use your information for legitimate business purposes and never collect more than necessary.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Cookies & Similar Technologies
              </h2>
              <p>
                Our website uses cookies and similar technologies to improve your browsing experience.
              </p>
              <p>Cookies help us:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Remember items in your shopping cart</li>
                <li>Keep you signed in</li>
                <li>Understand website traffic</li>
                <li>Improve website performance</li>
                <li>Save your shopping preferences</li>
                <li>Measure the effectiveness of marketing campaigns</li>
              </ul>
              <p className="pt-1">
                Most browsers allow you to disable cookies through your browser settings. Please note that disabling cookies may affect certain features of our website.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Payment Information
              </h2>
              <p>Your payment security is important to us.</p>
              <p>
                Payments made through Nova Ink LLC are processed using trusted third-party payment providers. We do not store your complete credit card or debit card information on our servers.
              </p>
              <p>
                Payment providers securely process your payment information using industry-standard encryption and security measures.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                How We Share Your Information
              </h2>
              <p>We respect your privacy.</p>
              <p>We do not sell or rent your personal information to third parties.</p>
              <p>
                However, we may share information with trusted service providers when necessary to operate our business, including:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Payment processors</li>
                <li>Shipping carriers</li>
                <li>Order fulfillment partners</li>
                <li>Marketing service providers</li>
                <li>Website analytics providers</li>
                <li>Customer help platforms</li>
              </ul>
              <p className="pt-1">
                These companies only receive the information necessary to perform their services and are expected to protect your information appropriately.
              </p>
              <p>
                We may also disclose information if required by law or to protect our legal rights.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Email Communications
              </h2>
              <p>If you subscribe to our mailing list, we may occasionally send:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Product announcements</li>
                <li>Special offers</li>
                <li>Promotions</li>
                <li>Company updates</li>
                <li>Helpful printing tips</li>
              </ul>
              <p className="pt-1">
                You can unsubscribe at any time by clicking the unsubscribe link included in our emails or by contacting us directly.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Data Security
              </h2>
              <p>Protecting your personal information is a priority.</p>
              <p>
                We use reasonable administrative, technical, and physical safeguards to help protect your information from unauthorized access, disclosure, misuse, or alteration.
              </p>
              <p>
                While we take security seriously, no method of transmitting information over the internet or storing electronic data can be guaranteed to be completely secure. We encourage customers to use strong passwords and protect their account information.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Your Privacy Choices
              </h2>
              <p>
                Depending on where you live, you may have certain privacy rights regarding your personal information.
              </p>
              <p>These may include the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Access the personal information we hold about you</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your personal information (subject to legal obligations)</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about how your data is used</li>
              </ul>
              <p className="pt-1">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites for your convenience.
              </p>
              <p>
                Once you leave Nova Ink LLC's website, we are not responsible for the privacy practices or content of those external websites. We encourage you to review their privacy policies before providing personal information.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Children's Privacy
              </h2>
              <p>
                Nova Ink LLC is intended for individuals who are at least 18 years old or the age of majority in their jurisdiction.
              </p>
              <p>
                We do not knowingly collect personal information from children. If we become aware that information has been collected from a child without appropriate consent, we will take reasonable steps to delete that information.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Keeping Your Information
              </h2>
              <p>We keep your personal information only for as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 font-medium">
                <li>Complete your orders</li>
                <li>Provide customer help</li>
                <li>Meet legal and tax obligations</li>
                <li>Resolve disputes</li>
                <li>Prevent fraud</li>
                <li>Enforce our agreements</li>
              </ul>
              <p className="pt-1">
                When information is no longer required, we take reasonable steps to securely delete or anonymize it.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                Changes to This Privacy Policy
              </h2>
              <p>
                As our business grows and our services evolve, we may update this Privacy Policy from time to time.
              </p>
              <p>
                When changes are made, the updated version will be posted on this page along with a revised "Last Updated" date. We encourage you to review this page periodically to stay informed about how we protect your information.
              </p>
            </div>

            {/* Section 15: Contact Us */}
            <div className="pt-6 border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0096D6]" /> Contact Us
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  If you have any questions about this Privacy Policy or how your personal information is handled, we're here to help.
                </p>
                
                <div className="pt-2 text-xs space-y-2">
                  <div className="font-black text-slate-900 uppercase">Nova Ink LLC</div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Mail className="w-4 h-4 text-[#0096D6]" />
                    <span>Email: <a href="mailto:support@novainkllc.com" className="text-[#0096D6] hover:underline">support@novainkllc.com</a></span>
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
