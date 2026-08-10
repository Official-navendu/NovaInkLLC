import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Newsletter } from '../components/sections/Newsletter'
import { blogsData } from '../data/blogs'
import { Calendar, Clock, User, ArrowLeft, ArrowRight, List, Share2, Facebook, Linkedin, Twitter, Mail, Copy, Check } from 'lucide-react'

export function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [copied, setCopied] = useState(false)

  const blog = blogsData.find((b) => b.slug === slug)
  const relatedBlogs = blogsData.filter((b) => b.slug !== slug)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (blog) {
      // Dynamic SEO Title & Meta Tags
      document.title = `${blog.metaTitle || blog.title} | Nova Ink LLC`
      
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', blog.metaDescription || blog.excerpt)

      // Open Graph Meta Tags
      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (!ogTitle) {
        ogTitle = document.createElement('meta')
        ogTitle.setAttribute('property', 'og:title')
        document.head.appendChild(ogTitle)
      }
      ogTitle.setAttribute('content', blog.metaTitle || blog.title)

      let ogDesc = document.querySelector('meta[property="og:description"]')
      if (!ogDesc) {
        ogDesc = document.createElement('meta')
        ogDesc.setAttribute('property', 'og:description')
        document.head.appendChild(ogDesc)
      }
      ogDesc.setAttribute('content', blog.metaDescription || blog.excerpt)

      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.setAttribute('content', blog.image)
    }
  }, [blog])

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between">
        <Navbar />
        <main className="pt-32 pb-16 text-center max-w-md mx-auto px-4 flex-1">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Article Not Found</h1>
          <p className="text-xs text-slate-500 mb-6">The requested blog post could not be located.</p>
          <button
            onClick={() => navigate('/blog')}
            className="bg-[#0096D6] hover:bg-[#0077B5] text-white text-xs font-extrabold px-6 py-3 rounded-full cursor-pointer"
          >
            Back to Blog
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Manrope',sans-serif] flex flex-col justify-between selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="pt-28 pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back to Blog Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-[#0096D6] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          {/* Featured Image */}
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-[24px] overflow-hidden mb-8 border border-slate-200/80 shadow-xs">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header Metadata Section */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {blog.title}
            </h1>

            {/* Article Category, Publish Date, and Reading Time placed directly below article title */}
            <div className="flex flex-wrap items-center gap-3 py-3 border-y border-slate-200 text-xs font-semibold text-slate-600 mb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-blue-50 text-[#0096D6] border border-blue-100 px-3 py-1 rounded-full">
                {blog.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-[#0096D6]" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-[#0096D6]" />
                {blog.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {blog.author}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {blog.subtitle}
            </p>
          </div>

          {/* Table of Contents */}
          {blog.toc && blog.toc.length > 0 && (
            <div className="mb-10 bg-slate-100/70 border border-slate-200 rounded-[16px] p-5 sm:p-6">
              <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-3">
                <List className="w-4 h-4 text-[#0096D6]" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2 text-xs font-bold text-slate-600">
                {blog.toc.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-[#0096D6] transition-colors flex items-start gap-2"
                    >
                      <span className="text-[#0096D6]">•</span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article HTML Content */}
          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-xs sm:text-sm font-medium
              [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:tracking-tight
              [&>h3]:text-base [&>h3]:sm:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-6 [&>h3]:mb-2
              [&>p]:mb-4 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul>li]:leading-relaxed
              [&>strong]:font-black [&>strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* SHARE THIS ARTICLE SECTION */}
          <div className="my-12 p-6 bg-white border border-slate-200/90 rounded-[20px] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#0096D6]" />
                  <span>Share This Article</span>
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Enjoyed this read? Pass it along to your colleagues or friends.
                </p>
              </div>

              {/* Social Share Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-[#1877F2] hover:text-white transition-all cursor-pointer"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-[#0A66C2] hover:text-white transition-all cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                  title="Share on X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(currentUrl)}`}
                  aria-label="Share via Email"
                  className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-[#0096D6] hover:text-white transition-all cursor-pointer"
                  title="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy Link"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-[#0096D6] text-slate-700 hover:text-white text-xs font-bold transition-all cursor-pointer relative"
                  title="Copy Link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white" />
                      <span className="text-emerald-600 font-extrabold">Link copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Related Articles
              </h2>
              <Link
                to="/blog"
                className="text-xs font-extrabold text-[#0096D6] hover:underline inline-flex items-center gap-1"
              >
                View All Posts
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-slate-200/90 rounded-[20px] overflow-hidden flex flex-col hover:border-[#0096D6]/40 hover:shadow-md transition-all duration-300 group"
                >
                  <Link to={`/blog/${rel.slug}`} className="relative aspect-video overflow-hidden block">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider bg-[#0096D6] text-white px-2.5 py-0.5 rounded-full">
                      {rel.category}
                    </span>
                  </Link>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#0096D6] transition-colors mb-2 line-clamp-2">
                        <Link to={`/blog/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mb-4">
                        {rel.excerpt}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${rel.slug}`}
                      className="text-xs font-extrabold text-[#0096D6] hover:text-[#0077B5] flex items-center gap-1.5"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  )
}
