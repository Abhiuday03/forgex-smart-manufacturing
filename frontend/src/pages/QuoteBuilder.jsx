import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
} from 'lucide-react'

import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { getProducts } from '../api/productApi'
import { submitQuote } from '../api/quoteApi'

function QuoteBuilder() {
  const [searchParams] = useSearchParams()

  const productFromUrl = searchParams.get('product')

  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [productError, setProductError] = useState('')

  const [productSlug, setProductSlug] = useState(productFromUrl || '')
  const [quantity, setQuantity] = useState('')
  const [application, setApplication] = useState('')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [requirements, setRequirements] = useState('')
  const [fileName, setFileName] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  /*
   * Load products from Spring Boot
   */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()

        setProducts(data)

        /*
         * If a product was supplied through the URL,
         * make sure it exists in the API response.
         */
        if (
          productFromUrl &&
          data.some((product) => product.slug === productFromUrl)
        ) {
          setProductSlug(productFromUrl)
        }
      } catch (error) {
        console.error('Failed to load products:', error)

        setProductError(
          'Unable to load products. Please make sure the backend server is running.'
        )
      } finally {
        setLoadingProducts(false)
      }
    }

    loadProducts()
  }, [productFromUrl])

  /*
   * Find the currently selected product
   */
  const selectedProduct = useMemo(() => {
    return products.find(
      (product) => product.slug === productSlug
    )
  }, [products, productSlug])

  /*
   * Convert applications from database string
   * into an array for the dropdown.
   */
  const applications = useMemo(() => {
    if (!selectedProduct?.applications) {
      return []
    }

    return selectedProduct.applications
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }, [selectedProduct])

  /*
   * Estimated quote
   */
  const estimatedQuote = useMemo(() => {
    if (!selectedProduct || !quantity) {
      return null
    }

    const qty = Number(quantity)

    if (!qty || qty <= 0) {
      return null
    }

    let basePrice = 1000

    switch (selectedProduct.slug) {
      case 'industrial-gear-assemblies':
        basePrice = 1850
        break

      case 'hydraulic-valve-systems':
        basePrice = 2400
        break

      case 'precision-shaft-components':
        basePrice = 950
        break

      case 'structural-fastener-kits':
        basePrice = 650
        break

      default:
        basePrice = 1000
    }

    const subtotal = basePrice * qty

    const engineeringFee = 5000

    return {
      basePrice,
      subtotal,
      engineeringFee,
      total: subtotal + engineeringFee,
    }
  }, [selectedProduct, quantity])

  /*
   * Submit RFQ
   */
  async function handleSubmit(event) {
    event.preventDefault()

    setSubmitting(true)
    setError('')

    try {
      const quoteData = {
        product: selectedProduct?.name || '',
        quantity: Number(quantity),
        application,
        company,
        name,
        email,
        phone,
        requirements,
        fileName,
      }

      await submitQuote(quoteData)

      setSubmitted(true)
    } catch (error) {
      console.error('Quote submission failed:', error)

      setError(
        'Unable to submit your quote request. Please make sure the backend server is running.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  /*
   * Loading products
   */
  if (loadingProducts) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

        <div className="max-w-4xl mx-auto px-6">

          <p className="text-neutral-400">
            Loading quote builder...
          </p>

        </div>

      </main>
    )
  }

  /*
   * Product loading error
   */
  if (productError) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

        <div className="max-w-4xl mx-auto px-6">

          <div className="border border-red-500/20 bg-red-500/10 rounded-xl p-6">

            <p className="text-red-300">
              {productError}
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

  /*
   * Successful submission
   */
  if (submitted) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

        <div className="max-w-3xl mx-auto px-6">

          <div className="border border-white/10 rounded-2xl p-10 md:p-14 bg-white/[0.03] text-center">

            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">

              <CheckCircle2
                size={32}
                className="text-white"
              />

            </div>

            <h1 className="text-4xl font-bold mt-8">
              Quote Request Submitted
            </h1>

            <p className="text-neutral-400 mt-5 leading-relaxed">
              Thank you for your enquiry. Our team will review your
              requirements and contact you with the quotation.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
              >
                Browse Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 border border-white/10 px-6 py-3 rounded-lg font-semibold text-neutral-300 hover:text-white hover:border-white/30 transition"
              >
                Back Home
              </Link>

            </div>

          </div>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}

        <div className="max-w-3xl">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mt-10">
            ForgeX RFQ
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            Request a Quote
          </h1>

          <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
            Tell us what you need and our engineering team will
            prepare a quotation based on your requirements.
          </p>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-8"
        >

          {/* Product Selection */}

          <section className="border border-white/10 rounded-2xl p-7 bg-white/[0.03]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Step 01
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              Product Requirements
            </h2>


            <div className="grid md:grid-cols-2 gap-6 mt-8">

              {/* Product */}

              <div>

                <label className="block text-sm text-neutral-300 mb-2">
                  Product
                </label>

                <select
                  value={productSlug}
                  onChange={(event) => {
                    setProductSlug(event.target.value)
                    setApplication('')
                  }}
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30"
                >

                  <option value="">
                    Select a product
                  </option>

                  {products.map((product) => (

                    <option
                      key={product.id}
                      value={product.slug}
                    >
                      {product.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* Quantity */}

              <div>

                <label className="block text-sm text-neutral-300 mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  placeholder="Enter quantity"
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                />

              </div>


              {/* Application */}

              <div className="md:col-span-2">

                <label className="block text-sm text-neutral-300 mb-2">
                  Application / Industry
                </label>

                <select
                  value={application}
                  onChange={(event) => setApplication(event.target.value)}
                  required
                  disabled={!selectedProduct}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 disabled:opacity-50"
                >

                  <option value="">
                    Select application
                  </option>

                  {applications.map((item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  ))}

                </select>

              </div>

            </div>

          </section>


          {/* Contact Information */}

          <section className="border border-white/10 rounded-2xl p-7 bg-white/[0.03]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Step 02
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              Contact Information
            </h2>


            <div className="grid md:grid-cols-2 gap-6 mt-8">

              {/* Company */}

              <div>

                <label className="block text-sm text-neutral-300 mb-2">
                  Company
                </label>

                <input
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Company name"
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                />

              </div>


              {/* Name */}

              <div>

                <label className="block text-sm text-neutral-300 mb-2">
                  Contact Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                />

              </div>


              {/* Email */}

              <div>

                <label className="block text-sm text-neutral-300 mb-2">
                  Business Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                />

              </div>


              {/* Phone */}

              <div>

                <label className="block text-sm text-neutral-300 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Contact number"
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                />

              </div>

            </div>

          </section>


          {/* Requirements */}

          <section className="border border-white/10 rounded-2xl p-7 bg-white/[0.03]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Step 03
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              Additional Requirements
            </h2>


            <div className="mt-8">

              <label className="block text-sm text-neutral-300 mb-2">
                Requirements
              </label>

              <textarea
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                placeholder="Describe dimensions, specifications, delivery requirements, certifications, or any other important details..."
                rows="6"
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30 resize-none"
              />

            </div>


            {/* File */}

            <div className="mt-6">

              <label className="block text-sm text-neutral-300 mb-2">
                Upload Requirement Document
              </label>

              <label className="flex items-center gap-3 border border-dashed border-white/10 rounded-lg px-4 py-4 cursor-pointer hover:border-white/30 transition">

                <Upload size={18} className="text-neutral-400" />

                <span className="text-sm text-neutral-400">
                  {fileName || 'Choose a file'}
                </span>

                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0]

                    setFileName(file ? file.name : '')
                  }}
                />

              </label>

            </div>

          </section>


          {/* Estimated Quote */}

          {estimatedQuote && (

            <section className="border border-white/10 rounded-2xl p-7 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Estimated Quote
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div>

                  <p className="text-xs text-neutral-600 uppercase tracking-wider">
                    Unit Price
                  </p>

                  <p className="text-xl font-semibold mt-2">
                    ₹{estimatedQuote.basePrice.toLocaleString('en-IN')}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-neutral-600 uppercase tracking-wider">
                    Subtotal
                  </p>

                  <p className="text-xl font-semibold mt-2">
                    ₹{estimatedQuote.subtotal.toLocaleString('en-IN')}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-neutral-600 uppercase tracking-wider">
                    Estimated Total
                  </p>

                  <p className="text-2xl font-bold mt-2">
                    ₹{estimatedQuote.total.toLocaleString('en-IN')}
                  </p>

                </div>

              </div>

              <p className="text-xs text-neutral-500 mt-6">
                This is an indicative estimate. Final pricing may vary
                based on specifications, quantity, material, and
                engineering requirements.
              </p>

            </section>

          )}


          {/* Error */}

          {error && (

            <div className="border border-red-500/20 bg-red-500/10 rounded-lg px-4 py-3 text-sm text-red-300">
              {error}
            </div>

          )}


          {/* Submit */}

          <button
            type="submit"
            disabled={submitting || !selectedProduct}
            className="w-full bg-white text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {submitting
              ? 'Submitting...'
              : 'Submit RFQ'}

            {!submitting && (
              <ArrowRight size={18} />
            )}

          </button>

        </form>

      </div>

    </main>
  )
}

export default QuoteBuilder