import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProducts } from '../api/productApi'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()

        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)

        setError(
          'Unable to load products. Please make sure the backend server is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchTerm = search.toLowerCase()

      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.shortDescription?.toLowerCase().includes(searchTerm)

      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, search, selectedCategory])

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-neutral-400">
            Loading products...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="border border-red-500/20 bg-red-500/10 rounded-xl p-6">
            <p className="text-red-300">
              {error}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="max-w-3xl">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            ForgeX Catalogue
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            Industrial Components
          </h1>

          <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
            Explore precision-engineered components designed for
            demanding industrial applications.
          </p>

        </div>


        {/* Search */}

        <div className="mt-12">

          <div className="relative max-w-2xl">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search components..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
            />

          </div>

        </div>


        {/* Filters */}

        <div className="mt-6 flex flex-wrap gap-3">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selectedCategory === category
                  ? 'bg-white text-black border-white'
                  : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
              }`}
            >
              {category}
            </button>

          ))}

        </div>


        {/* Result Count */}

        <div className="flex items-center gap-2 mt-10 text-sm text-neutral-500">

          <SlidersHorizontal size={16} />

          <span>
            {filteredProducts.length} components found
          </span>

        </div>


        {/* Products */}

        {filteredProducts.length > 0 ? (

          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="border border-white/10 rounded-2xl p-7 bg-white/[0.03] hover:bg-white/[0.06] transition"
              >

                {/* Category */}

                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {product.category}
                </p>


                {/* Product Name */}

                <h2 className="text-2xl font-semibold mt-4">
                  {product.name}
                </h2>


                {/* Description */}

                <p className="text-neutral-400 mt-4 leading-relaxed">
                  {product.shortDescription}
                </p>


                {/* Product Metadata */}

                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div>

                    <p className="text-xs text-neutral-600 uppercase tracking-wider">
                      Material
                    </p>

                    <p className="text-sm text-neutral-300 mt-1">
                      {product.material || 'Not specified'}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-neutral-600 uppercase tracking-wider">
                      Manufacturing
                    </p>

                    <p className="text-sm text-neutral-300 mt-1">
                      {product.manufacturingProcess || 'Not specified'}
                    </p>

                  </div>

                </div>


                {/* Applications */}

                {product.applications && (

                  <div className="mt-6">

                    <p className="text-xs text-neutral-600 uppercase tracking-wider">
                      Applications
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">

                      {product.applications
                        .split(',')
                        .map((application) => application.trim())
                        .filter(Boolean)
                        .map((application) => (

                          <span
                            key={application}
                            className="text-xs border border-white/10 rounded-full px-3 py-1 text-neutral-400"
                          >
                            {application}
                          </span>

                        ))}

                    </div>

                  </div>

                )}


                {/* Actions */}

                <div className="flex items-center gap-4 mt-8">

                  <Link
                    to={`/products/${product.slug}`}
                    className="bg-white text-black px-5 py-3 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/quote?product=${product.slug}`}
                    className="text-sm font-semibold text-neutral-300 hover:text-white"
                  >
                    Request Quote
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty State */

          <div className="border border-white/10 rounded-2xl p-12 text-center mt-6">

            <h2 className="text-xl font-semibold">
              No components found
            </h2>

            <p className="text-neutral-500 mt-2">
              Try another search term or category.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('All')
              }}
              className="mt-6 text-sm underline"
            >
              Clear filters
            </button>

          </div>

        )}

      </div>

    </main>
  )
}

export default Products