import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/ui/ProductCard'
import { productsData } from '../data/products'
import { useCart } from '../context/CartContext'
import { Star, Truck, ShieldCheck, RotateCcw, Plus, Minus, ArrowLeft, ShoppingCart, Check, Package, FileText, Wrench, CreditCard } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  // Find product by SEO slug or backward compatible numeric ID
  const product = productsData.find(p => p.slug === slug || String(p.id) === slug) || productsData[0]

  // Backward compatibility redirect if accessed via numeric ID
  useEffect(() => {
    if (product && slug && !isNaN(Number(slug))) {
      navigate(`/product/${product.slug}`, { replace: true })
    }
  }, [product, slug, navigate])

  // Reset selected image and quantity on product change
  useEffect(() => {
    setSelectedImageIndex(0)
    setQuantity(1)
    setActiveTab('description')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Construct gallery images (supports product.images array or fallback 5-image set)
  const galleryImages = (product.images && product.images.length > 0)
    ? product.images
    : [
        product.image,
        '/images/hero/hero-1.webp',
        '/images/hero/hero-2.webp',
        '/images/hero/hero-3.webp',
        '/images/hero/hero-4.webp'
      ]

  // Related Products (strictly from the same category)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && (p.slug !== product.slug && p.id !== product.id))
    .slice(0, 4)

  const handleImageChange = (index) => {
    if (index === selectedImageIndex) return
    setIsFading(true)
    setTimeout(() => {
      setSelectedImageIndex(index)
      setIsFading(false)
    }, 150)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  // Specifications data table structure
  const specsTable = [
    { label: 'Brand', value: product.brand || 'HP' },
    { label: 'Model Number', value: product.modelNumber || 'HP Series' },
    { label: 'SKU / Part Number', value: product.sku || `HP-${product.id}` },
    { label: 'Category', value: product.categoryName || 'Printers & Supplies' },
    { label: 'Print Technology', value: product.specs?.technology || 'HP Thermal Inkjet / Precision Laser' },
    { label: 'Functions', value: product.specs?.functions || 'Print, Scan, Copy, Wireless' },
    { label: 'Print Speed', value: product.specs?.speed || 'Up to 22 ppm ISO black, 18 ppm color' },
    { label: 'Connectivity', value: product.specs?.connectivity || 'Dual-Band Wi-Fi 802.11b/g/n, Bluetooth 5.0, USB 2.0' },
    { label: 'Paper Sizes Supported', value: product.specs?.paperSupport || 'Letter, Legal, Executive, Statement, 4x6 in' },
    { label: 'Monthly Duty Cycle', value: 'Up to 20,000 pages' },
    { label: 'Display Panel', value: '2.7" Color Touchscreen Graphic Display' },
    { label: 'Warranty', value: product.warranty || '2-Year Official HP Manufacturer Warranty' },
    { label: 'Shipping & Delivery', value: product.shippingInfo || 'Dispatched within 24 business hours with door-to-door tracking' }
  ]

  // Key Features
  const defaultFeatures = [
    'Automatic wireless setup with self-healing connection',
    'Official HP precision engineering for long-lasting quality',
    'Energy Star certified power efficient operation',
    'Includes 2-Year official manufacturer warranty coverage'
  ]
  const featureList = (product.features && product.features.length > 0) ? product.features : defaultFeatures

  // What's Included
  const whatsIncluded = [
    'HP Hardware Unit',
    'Official Power Cord & Adapter',
    'Full/Starter HP Ink or Toner Cartridge',
    'Setup & User Reference Manual',
    'USB Interface Cable'
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Manrope',sans-serif] selection:bg-[#0096D6] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0096D6] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#0096D6]">Shop</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-[#0096D6]">{product.categoryName || 'Category'}</Link>
            <span>/</span>
            <span className="text-slate-900 line-clamp-1">{product.name}</span>
          </div>

          {/* Main Product Section (Cleaned: Outer Card Container Removed) */}
          <div className="mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Product Image Gallery (Left Column) */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Main Featured Image Box */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 flex items-center justify-center border border-slate-200/80 min-h-[360px] sm:min-h-[420px] relative overflow-hidden group shadow-xs">
                  {product.discountBadge && (
                    <span className="absolute top-4 left-4 bg-[#0096D6] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs z-10">
                      {product.discountBadge}
                    </span>
                  )}
                  <img
                    src={galleryImages[selectedImageIndex]}
                    alt={product.name}
                    className={`max-h-72 sm:max-h-88 object-contain mix-blend-multiply drop-shadow-md transition-all duration-300 ${
                      isFading ? 'opacity-20 scale-[0.98]' : 'opacity-100 scale-100'
                    }`}
                  />
                </div>

                {/* 4–6 Thumbnail Images Row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                  {galleryImages.map((imgSrc, idx) => {
                    const isActive = selectedImageIndex === idx
                    return (
                      <button
                        key={idx}
                        onClick={() => handleImageChange(idx)}
                        className={`appearance-none bg-white relative w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-[12px] overflow-hidden p-2 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0096D6] ${
                          isActive
                            ? 'border-2 border-[#0096D6]'
                            : 'border-slate-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-[#0096D6]/60'
                        }`}
                        title={`View image ${idx + 1}`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={imgSrc}
                          alt={`${product.name} view ${idx + 1}`}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </button>
                    )
                  })}
                </div>

              </div>

              {/* Product Summary Info (Right Column - Short Description Removed) */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-extrabold text-[#0096D6] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {product.brand || 'HP'} • {product.categoryName || 'Printer'}
                    </span>
                    {product.sku && (
                      <span className="text-[11px] font-mono text-slate-400">
                        SKU: {product.sku}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {product.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    {product.subtitle}
                  </p>
                </div>

                {/* Rating & Stock Status */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="font-extrabold text-slate-900 ml-1">
                      {product.rating || 4.9} ({product.reviewCount || 240} Reviews)
                    </span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {product.availability || 'In Stock & Ready to Ship'}
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 pt-2 border-t border-slate-200/80">
                  <span className="text-3xl font-black text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Key Features Quick Checklist */}
                <ul className="space-y-2 text-xs text-slate-700 font-medium pt-1">
                  {featureList.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0096D6] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Quantity Selector & Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-slate-200/80">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-extrabold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleAddToCart}
                      className="flex-1 uppercase font-extrabold tracking-wider px-6 py-3.5 shadow-md shadow-[#0096D6]/20 cursor-pointer"
                      icon={ShoppingCart}
                    >
                      Add To Cart
                    </Button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#0B132B] hover:bg-[#172136] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-[#0096D6]" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Trust Highlights */}
                <div className="grid grid-cols-3 gap-3 pt-4 text-center border-t border-slate-200/80 text-[11px] text-slate-600 font-semibold">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-[#0096D6]" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-[#0096D6]" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#0096D6]" />
                    <span>Official Warranty</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Product Details Section (Cleaned: Outer Card Container Removed) */}
          <div className="mb-14">
            
            {/* Tab Navigation Header */}
            <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none">
              {[
                { id: 'description', label: 'Product Description', icon: FileText },
                { id: 'specifications', label: 'Specifications', icon: Wrench },
                { id: 'shipping', label: 'Shipping & Returns', icon: Truck },
                { id: 'reviews', label: `Reviews (${product.reviewCount || 240})`, icon: Star }
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 border-b-2 cursor-pointer shrink-0 ${
                      isActive
                        ? 'border-[#0096D6] text-[#0096D6] bg-transparent'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0096D6]' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Body Content (Sits directly on default page background) */}
            <div>
              
              {/* TAB 1: DESCRIPTION */}
              {activeTab === 'description' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">
                      PRODUCT OVERVIEW
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {product.longDescription || `${product.name} is engineered for exceptional reliability, sharp print output, and seamless connectivity. Designed for home offices, academic workflows, and enterprise environments, this high-performance printing solution handles heavy monthly workloads with crystal-clear text and vibrant color reproduction.`}
                    </p>
                  </div>

                  {/* Key Features Bullet List */}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide mb-4">
                      KEY FEATURES
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {featureList.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                          <Check className="w-4 h-4 text-[#0096D6] shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide mb-4">
                      WHAT'S IN THE BOX
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {whatsIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs text-xs font-extrabold text-slate-800">
                          <Package className="w-4 h-4 text-[#0096D6] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">System Compatibility</span>
                      <span className="font-extrabold text-slate-800">{product.compatibility || 'Compatible with Windows 11/10, macOS 12+, iOS, Android, & HP Smart App'}</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Warranty Coverage</span>
                      <span className="font-extrabold text-slate-800">{product.warranty || '2-Year Official HP Manufacturer Warranty'}</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Shipping & Dispatch</span>
                      <span className="font-extrabold text-slate-800">{product.shippingInfo || 'Dispatched within 24 business hours with door-to-door tracking'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECIFICATIONS */}
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">
                    TECHNICAL SPECIFICATIONS
                  </h3>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="divide-y divide-slate-200">
                      {specsTable.map((spec, idx) => (
                        <div
                          key={idx}
                          className={`grid grid-cols-1 sm:grid-cols-12 p-4 text-xs ${
                            idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                          }`}
                        >
                          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                            {spec.label}
                          </span>
                          <span className="sm:col-span-8 font-extrabold text-slate-900 mt-1 sm:mt-0">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SHIPPING & RETURNS */}
              {activeTab === 'shipping' && (
                <div className="space-y-6 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
                    <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#0096D6]" /> Fast U.S. Nationwide Shipping
                    </h3>
                    <p className="text-xs text-slate-600">
                      {product.shippingInfo || 'Orders placed before 3:00 PM EST are processed within 24 business hours. Enjoy insured door-to-door delivery with real-time tracking updates sent directly to your email.'}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
                    <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 text-[#0096D6]" /> 30-Day Hassle-Free Return Policy
                    </h3>
                    <p className="text-xs text-slate-600">
                      We stand behind the quality of every HP product we sell. If you are not completely satisfied with your purchase, eligible unopened hardware and factory-sealed supplies can be returned within 30 days of delivery.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Rating Header */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="text-center sm:text-left">
                      <div className="text-4xl font-black text-slate-900">4.9</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <div className="text-xs text-slate-500 font-bold">Based on {product.reviewCount || 240} Verified Customer Reviews</div>
                    </div>
                  </div>

                  {/* Customer Review Cards */}
                  <div className="space-y-4">
                    {[
                      {
                        name: 'David R.',
                        date: '2 days ago',
                        rating: 5,
                        comment: 'Fast shipping and 100% genuine HP printer. Setup took under 10 minutes with the HP Smart app. Excellent print speed and crystal clear text!'
                      },
                      {
                        name: 'Sarah M.',
                        date: '1 week ago',
                        rating: 5,
                        comment: 'Great price and reliable wireless connection. Perfect for my home office document printing needs.'
                      },
                      {
                        name: 'Robert K.',
                        date: '2 weeks ago',
                        rating: 5,
                        comment: 'Nova Ink LLC delivered exactly as promised. Sealed factory hardware with complete warranty documentation.'
                      }
                    ].map((rev, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-xs">{rev.name}</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-extrabold">Verified Buyer</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Related Products Recommendation */}
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
              RELATED HP PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
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
