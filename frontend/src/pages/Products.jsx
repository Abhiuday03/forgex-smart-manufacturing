import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import products from '../data/products'

function Products() {

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory

      return matchesSearch && matchesCategory

    })

  }, [search, selectedCategory])

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

                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {product.category}
                </p>

                <h2 className="text-2xl font-semibold mt-4">
                  {product.name}
                </h2>

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
                      {product.material}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 uppercase tracking-wider">
                      Manufacturing
                    </p>

                    <p className="text-sm text-neutral-300 mt-1">
                      {product.manufacturing}
                    </p>
                  </div>

                </div>


                {/* Actions */}

                <div className="flex items-center gap-4 mt-8">

                  <Link
                    to={`/products/${product.slug}`}
                    className="bg-white text-black px-5 py-3 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition"
                  >
                    View Details
                  </Link>

                  <Link
                    to="/quote"
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