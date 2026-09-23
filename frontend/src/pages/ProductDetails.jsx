import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import products from '../data/products'

function ProductDetails() {

  const { slug } = useParams()

  const product = products.find(
    (item) => item.slug === slug
  )

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            ForgeX Catalogue
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Product Not Found
          </h1>

          <p className="text-neutral-400 mt-4">
            The product you are looking for does not exist
            or may have been removed.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to Catalogue
        </Link>


        {/* Product Header */}

        <section className="mt-10 grid lg:grid-cols-2 gap-16">

          {/* Left Side */}

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {product.category}
            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-4">
              {product.name}
            </h1>

            <p className="text-xl text-neutral-400 leading-relaxed mt-8">
              {product.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link
                to={`/quote?product=${product.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-lg font-semibold hover:bg-neutral-200 transition"
              >
                Request a Quote
                <ArrowUpRight size={18} />
              </Link>

              <a
                href="#specifications"
                className="inline-flex items-center justify-center border border-white/10 px-6 py-4 rounded-lg font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition"
              >
                View Specifications
              </a>

            </div>

          </div>


          {/* Right Side — Product Summary */}

          <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-8">

            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Engineering Overview
            </p>

            <div className="mt-8 space-y-6">

              <div className="border-b border-white/10 pb-5">

                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Material
                </p>

                <p className="text-lg text-white mt-2">
                  {product.material}
                </p>

              </div>


              <div className="border-b border-white/10 pb-5">

                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Manufacturing
                </p>

                <p className="text-lg text-white mt-2">
                  {product.manufacturing}
                </p>

              </div>


              <div>

                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Typical Lead Time
                </p>

                <p className="text-lg text-white mt-2">
                  {product.leadTime}
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* Applications */}

        <section className="mt-24">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Applications
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Built for demanding industries
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

            {product.applications.map((application) => (

              <div
                key={application}
                className="border border-white/10 rounded-xl p-5 bg-white/[0.03] flex items-center gap-3"
              >

                <CheckCircle2
                  size={20}
                  className="text-neutral-400"
                />

                <span className="text-neutral-200">
                  {application}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* Specifications */}

        <section
          id="specifications"
          className="mt-24"
        >

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Technical Data
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Specifications
          </h2>

          <div className="mt-8 border border-white/10 rounded-2xl overflow-hidden">

            {product.specifications.map((specification, index) => (

              <div
                key={specification.name}
                className={`grid grid-cols-2 px-6 py-5 ${
                  index !== product.specifications.length - 1
                    ? 'border-b border-white/10'
                    : ''
                }`}
              >

                <span className="text-neutral-500">
                  {specification.name}
                </span>

                <span className="text-neutral-200 text-right">
                  {specification.value}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* Bottom CTA */}

        <section className="mt-24 border border-white/10 rounded-2xl p-8 md:p-12 bg-white/[0.03]">

          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Engineering Support
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Need this component for your application?
            </h2>

            <p className="text-neutral-400 mt-4 leading-relaxed">
              Share your quantity, application requirements and
              technical specifications. Our engineering team can
              review the requirement and prepare a preliminary
              quotation.
            </p>

            <Link
              to={`/quote?product=${product.slug}`}
              className="inline-flex items-center gap-2 mt-8 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
            >
              Request a Quote
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </section>

      </div>

    </main>
  )
}

export default ProductDetails