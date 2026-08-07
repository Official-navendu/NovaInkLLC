import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { blogsData } from '../data/blogs'
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'

export function Blog() {
  useEffect(() => {
    document.title = "Blog & Printing Guides | Nova Ink LLC"
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore printer buying guides, ink savings tips, laserjet vs inkjet comparisons, and productivity insights from Nova Ink LLC.')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        
        {/* Unified Subpage Hero Banner - Exact Same Style as About, Support, Contact */}
        <div
          className="relative bg-cover bg-center sm:bg-fixed border-b border-[#2A3855] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 mb-16 shadow-lg overflow-hidden"
          style={{ backgroundImage: `url('/images/hero/hero-support.jpg')` }}
        >
          {/* Overlay Gradient to maintain exact brand theme & 100% text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#172136]/90 to-[#0B132B]/90 backdrop-blur-xs pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Side: Hero Text Content */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0096D6] bg-[#0096D6]/10 border border-[#0096D6]/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  Resources & Insights
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Printing Tips, Buying Guides & <span className="text-[#0096D6]">Industry Insights</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                  Explore helpful articles, printer buying advice, maintenance tips, productivity ideas, and expert guidance designed to help you get the most from your printing setup.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogsData.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200/90 rounded-[20px] overflow-hidden flex flex-col hover:border-[#0096D6]/50 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Featured Image */}
                <Link to={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-wider bg-[#0096D6] text-white px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </Link>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#0096D6] transition-colors mb-2.5">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0096D6] hover:text-[#0077B5] transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
