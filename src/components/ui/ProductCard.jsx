import React from 'react'
import { Button } from './Button'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

export function ProductCard({ product }) {
  const { name, subtitle, price, originalPrice, image, id, slug } = product
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/product/${slug || id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1 cursor-pointer select-none"
    >
      <div>
        <div className="w-full h-44 bg-slate-50/50 rounded-lg p-3 flex items-center justify-center mb-4 overflow-hidden group-hover:bg-blue-50/20 transition-colors duration-300">
          <img
            src={image}
            alt={name}
            className="h-full max-h-36 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug line-clamp-1 group-hover:text-[#0096D6] transition-colors">
          {name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-3 line-clamp-1 font-normal">
          {subtitle}
        </p>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-extrabold text-slate-900 text-base md:text-lg">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          className="w-full uppercase text-xs tracking-wider font-bold"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  )
}
