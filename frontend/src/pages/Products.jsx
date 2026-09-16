import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function Products() {
  const products = [
    {
      name: 'Industrial Gear Assemblies',
      category: 'Power Transmission',
      description:
        'Precision-manufactured gear assemblies designed for high-load industrial applications.',
    },
    {
      name: 'Hydraulic Valve Systems',
      category: 'Fluid Control',
      description:
        'Reliable hydraulic valve systems engineered for accurate flow and pressure control.',
    },
    {
      name: 'Precision Shaft Components',
      category: 'Machined Components',
      description:
        'High-precision shafts manufactured for demanding mechanical and rotating applications.',
    },
    {
      name: 'Structural Fastener Kits',
      category: 'Industrial Hardware',
      description:
        'Industrial-grade fastening solutions designed for structural and heavy-duty applications.',
    },
  ]

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


        {/* Product Grid */}

        <div className="grid md:grid-cols-2 gap-5 mt-16">

          {products.map((product) => (

            <div
              key={product.name}
              className="border border-white/10 rounded-2xl p-7 bg-white/[0.03] hover:bg-white/[0.06] transition"
            >

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {product.category}
              </p>

              <h2 className="text-2xl font-semibold mt-4">
                {product.name}
              </h2>

              <p className="text-neutral-400 mt-4 leading-relaxed">
                {product.description}
              </p>

              <Link
                to="/quote"
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold"
              >
                Request Quote
                <ArrowRight size={16} />
              </Link>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}

export default Products