import { ArrowUpRight, Cog } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="group border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:bg-white/[0.06] transition">

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-8">
        <Cog size={24} className="text-neutral-300" />
      </div>

      {/* Category */}
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        {product.category}
      </p>

      {/* Product Name */}
      <h3 className="text-2xl font-semibold mt-3">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-neutral-400 mt-4 leading-relaxed">
        {product.description}
      </p>

      {/* Applications */}
      <div className="mt-6 flex flex-wrap gap-2">

        {product.applications.map((application) => (
          <span
            key={application}
            className="text-xs border border-white/10 rounded-full px-3 py-1 text-neutral-400"
          >
            {application}
          </span>
        ))}

      </div>

      {/* Link */}
      <Link
        to={`/products/${product.slug}`}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
      >
        View specifications

        <ArrowUpRight
          size={16}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
        />

      </Link>

    </div>
  )
}

export default ProductCard