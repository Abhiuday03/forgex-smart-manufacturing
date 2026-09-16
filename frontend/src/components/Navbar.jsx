import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">

            <div className="w-9 h-9 bg-white text-black rounded-md flex items-center justify-center font-black">
              F
            </div>

            <div>
              <div className="font-bold tracking-wide">
                FORGEX
              </div>

              <div className="text-[10px] text-neutral-500 tracking-[0.2em]">
                INDUSTRIAL SOLUTIONS
              </div>
            </div>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">

            <Link
              to="/products"
              className="hover:text-white transition"
            >
              Products
            </Link>

            <Link
              to="/"
              className="hover:text-white transition"
            >
              Industries
            </Link>

            <Link
              to="/"
              className="hover:text-white transition"
            >
              About
            </Link>

          </nav>

          {/* Desktop CTA */}
          <Link
            to="/quote"
            className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-3 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition"
          >
            Request a Quote
            <ArrowUpRight size={16} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-6 space-y-4">

            <Link
              to="/products"
              className="block text-neutral-300"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/"
              className="block text-neutral-300"
              onClick={() => setMobileOpen(false)}
            >
              Industries
            </Link>

            <Link
              to="/"
              className="block text-neutral-300"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            <Link
              to="/quote"
              className="block text-center bg-white text-black py-3 rounded-lg font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Request a Quote
            </Link>

          </div>
        )}

      </div>
    </header>
  )
}

export default Navbar