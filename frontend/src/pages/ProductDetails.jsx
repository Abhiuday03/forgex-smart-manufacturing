import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getProductBySlug } from '../api/productApi'

function ProductDetails() {
  const { slug } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(slug)

        setProduct(data)
      } catch (error) {
        console.error('Failed to load product:', error)

        setError(
          'Unable to load this product. Please make sure the backend server is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-24">

        <div className="max-w-7xl mx-auto">

          <p className="text-neutral-400">
            Loading product...
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

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 text-sm text-white underline"
            >
              <ArrowLeft size={16} />
              Back to products
            </Link>

          </div>

        </div>

      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-24">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-semibold">
            Product not found
          </h1>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 text-sm text-white underline"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>

        </div>

      </main>
    )
  }

  const applications = product.applications
    ? product.applications
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  const industries = product.industries
    ? product.industries
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Back */}

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>


        {/* Product Header */}

        <section className="mt-10 max-w-4xl">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {product.category}
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            {product.name}
          </h1>

          <p className="text-xl text-neutral-400 mt-6 leading-relaxed">
            {product.shortDescription}
          </p>

        </section>


        {/* Main Content */}

        <section className="grid lg:grid-cols-3 gap-6 mt-16">

          {/* Description */}

          <div className="lg:col-span-2 border border-white/10 rounded-2xl p-8 bg-white/[0.03]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Product Overview
            </p>

            <h2 className="text-2xl font-semibold mt-4">
              Engineered for demanding applications
            </h2>

            <p className="text-neutral-400 mt-5 leading-relaxed">
              {product.description}
            </p>

          </div>


          {/* Quote CTA */}

          <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.03]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Need this component?
            </p>

            <h2 className="text-2xl font-semibold mt-4">
              Request a Quote
            </h2>

            <p className="text-neutral-400 mt-4 leading-relaxed">
              Tell us your quantity and application requirements.
              Our team can prepare a customized quotation.
            </p>

            <Link
              to={`/quote?product=${product.slug}`}
              className="mt-8 inline-flex items-center justify-center gap-2 w-full bg-white text-black px-5 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
            >
              Request Quote
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>


        {/* Specifications */}

        <section className="mt-16">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Technical Information
          </p>

          <h2 className="text-3xl font-semibold mt-4">
            Specifications
          </h2>


          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-wider text-neutral-600">
                Material
              </p>

              <p className="text-lg text-neutral-200 mt-2">
                {product.material || 'Not specified'}
              </p>

            </div>


            <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-wider text-neutral-600">
                Manufacturing Process
              </p>

              <p className="text-lg text-neutral-200 mt-2">
                {product.manufacturingProcess || 'Not specified'}
              </p>

            </div>


            <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-wider text-neutral-600">
                Tolerance
              </p>

              <p className="text-lg text-neutral-200 mt-2">
                {product.tolerance || 'Not specified'}
              </p>

            </div>

          </div>

        </section>


        {/* Applications */}

        <section className="mt-16">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Applications
          </p>

          <h2 className="text-3xl font-semibold mt-4">
            Designed for real-world use
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            {applications.map((application) => (

              <div
                key={application}
                className="border border-white/10 rounded-xl p-5 bg-white/[0.03] flex items-center gap-3"
              >

                <CheckCircle2
                  size={18}
                  className="text-neutral-400 shrink-0"
                />

                <span className="text-neutral-300">
                  {application}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* Industries */}

        <section className="mt-16">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Industries
          </p>

          <h2 className="text-3xl font-semibold mt-4">
            Built for industrial sectors
          </h2>

          <div className="flex flex-wrap gap-3 mt-8">

            {industries.map((industry) => (

              <span
                key={industry}
                className="border border-white/10 rounded-full px-5 py-2 text-sm text-neutral-300"
              >
                {industry}
              </span>

            ))}

          </div>

        </section>


        {/* Bottom CTA */}

        <section className="mt-20 border border-white/10 rounded-2xl p-10 md:p-14 bg-white/[0.03]">

          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              ForgeX Industrial Solutions
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold mt-4">
              Have a specific requirement?
            </h2>

            <p className="text-neutral-400 mt-5 leading-relaxed">
              Share your quantity, application, specifications, and
              requirements with our team.
            </p>

            <Link
              to={`/quote?product=${product.slug}`}
              className="mt-8 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
            >
              Request a Quote
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </div>

    </main>
  )
}

export default ProductDetails