import React from 'react'
import { cn } from '../../utils/cn'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3897F0] focus:ring-offset-2 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary: 'bg-[#3897F0] hover:bg-[#2563EB] text-white shadow-md shadow-[#3897F0]/20 border border-transparent',
    outline: 'border-2 border-[#3897F0] text-[#3897F0] hover:bg-[#3897F0] hover:text-white bg-transparent shadow-sm',
    white: 'bg-white text-[#3897F0] hover:bg-slate-50 shadow-md border border-slate-100',
    dark: 'bg-[#130E26] text-white hover:bg-[#1C1635] shadow-md border border-[#261E45]',
    ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-transparent'
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5'
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  )
}
