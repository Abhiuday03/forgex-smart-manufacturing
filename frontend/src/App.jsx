
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import QuoteBuilder from './pages/QuoteBuilder'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/quote" element={<QuoteBuilder />} />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App