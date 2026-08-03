import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('nova_ink_cart')
      return localData ? JSON.parse(localData) : []
    } catch (e) {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nova_ink_cart', JSON.stringify(cartItems))
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e)
    }
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id)
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex].quantity += quantity
        return updated
      }
      return [...prevItems, { ...product, quantity }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, delta) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : item
        }
        return item
      })
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
