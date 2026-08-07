import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ScrollToTop } from './components/common/ScrollToTop'
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
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Checkout } from './pages/Checkout'
import { OrderSuccess } from './pages/OrderSuccess'
import { MyOrders } from './pages/MyOrders'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsConditions } from './pages/TermsConditions'
import { ReturnPolicy } from './pages/ReturnPolicy'
import { BuyersGuide } from './pages/BuyersGuide'
import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetail />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/buyers-guide" element={<BuyersGuide />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}
