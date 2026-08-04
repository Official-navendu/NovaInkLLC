import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { CategoriesPage } from './pages/CategoriesPage'
import { CategoryDetail } from './pages/CategoryDetail'
import { Solutions } from './pages/Solutions'
import { AboutUs } from './pages/AboutUs'
import { SupportPage } from './pages/SupportPage'
import { ContactUs } from './pages/ContactUs'
import { SearchResults } from './pages/SearchResults'
import { ProductDetails } from './pages/ProductDetails'

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}
