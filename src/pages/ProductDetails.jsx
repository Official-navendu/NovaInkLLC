import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Newsletter } from '../components/sections/Newsletter'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/ui/ProductCard'
import { productsData } from '../data/products'
import { useCart } from '../context/CartContext'
import { Star, Truck, ShieldCheck, RotateCcw, Plus, Minus, ArrowLeft, ShoppingCart, Check, Tag } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = productsData.find(p => p.id === parseInt(id, 10)) || productsData[0]
  const relatedProducts = productsData.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

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
            <span className="text-slate-900 line-clamp-1">{product.name}</span>
          </div>

          {/* Main Product Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Product Gallery Left */}
              <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-8 flex items-center justify-center border border-slate-200/60 min-h-[360px] relative">
                {product.discountBadge && (
                  <span className="absolute top-4 left-4 bg-[#0096D6] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                    {product.discountBadge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-72 object-contain mix-blend-multiply drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info Right */}
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
                <div className="flex items-baseline gap-3 pt-2 border-t border-slate-100">
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

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {product.shortDescription || product.longDescription}
                </p>

                {/* Features Checklist */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2 text-xs text-slate-700 font-medium pt-1">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0096D6] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Quantity Selector & Add to Cart */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-extrabold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 uppercase font-extrabold tracking-wider px-8 py-3.5 shadow-md shadow-[#0096D6]/20"
                    icon={ShoppingCart}
                  >
                    Add To Cart
                  </Button>
                </div>

                {/* Trust Features */}
                <div className="grid grid-cols-3 gap-3 pt-4 text-center border-t border-slate-100 text-[11px] text-slate-600 font-semibold">
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

            {/* Technical Specifications Block */}
            {product.specs && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight mb-4">
                  TECHNICAL SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Print Technology</span>
                    <span className="font-extrabold text-slate-800">{product.specs.technology}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Print Speed</span>
                    <span className="font-extrabold text-slate-800">{product.specs.speed}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Connectivity</span>
                    <span className="font-extrabold text-slate-800">{product.specs.connectivity}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Functions</span>
                    <span className="font-extrabold text-slate-800">{product.specs.functions}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Paper Sizes Supported</span>
                    <span className="font-extrabold text-slate-800">{product.specs.paperSupport}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Warranty & Support</span>
                    <span className="font-extrabold text-slate-800">2-Year Official HP Coverage</span>
                  </div>
                </div>
              </div>
            )}

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
