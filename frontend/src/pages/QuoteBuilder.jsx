import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import products from '../data/products'
import { submitQuote } from '../api/quoteApi'

function QuoteBuilder() {

  const [searchParams] = useSearchParams()

  const productFromUrl = searchParams.get('product')

  const initialProduct =
    products.find((product) => product.slug === productFromUrl)?.slug || ''

  const [productSlug, setProductSlug] = useState(initialProduct)
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

  const selectedProduct = useMemo(() => {
    return products.find(
      (product) => product.slug === productSlug
    )
  }, [productSlug])


  const estimatedQuote = useMemo(() => {

    if (!selectedProduct || !quantity) {
      return null
    }

    const qty = Number(quantity)

    if (!qty || qty <= 0) {
      return null
    }

    let basePrice = 0

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


  if (submitted) {

    return (
      <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

        <div className="max-w-3xl mx-auto px-6">

          <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-8 md:p-12 text-center">

            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">

              <CheckCircle2 size={32} />

            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mt-8">
              Request Received
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-4">
              RFQ Submitted
            </h1>

            <p className="text-neutral-400 mt-6 leading-relaxed">
              Thank you, {name || 'for your enquiry'}.
              Your requirement has been recorded for review by
              the ForgeX engineering team.
            </p>

            {selectedProduct && (
              <div className="mt-8 border border-white/10 rounded-xl p-5 text-left">

                <p className="text-xs uppercase tracking-wider text-neutral-500">
                  Requested Product
                </p>

                <p className="text-lg font-semibold mt-2">
                  {selectedProduct.name}
                </p>

                <p className="text-sm text-neutral-500 mt-1">
                  Quantity: {quantity}
                </p>

              </div>
            )}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
            >
              Back to Catalogue
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </main>
    )
  }


  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}

        <div className="max-w-3xl">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to Catalogue
          </Link>

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mt-10">
            ForgeX RFQ
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            Build Your Requirement
          </h1>

          <p className="text-lg text-neutral-400 mt-6 leading-relaxed">
            Tell us what you need. Provide your application,
            quantity and technical requirements so our engineering
            team can prepare a preliminary quotation.
          </p>

        </div>


        {/* Main Layout */}

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8 mt-12"
        >

          {/* Form */}

          <div className="lg:col-span-2 space-y-8">


            {/* Product Information */}

            <section className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.03]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Step 01
                  </p>

                  <h2 className="text-2xl font-semibold mt-2">
                    Product Requirement
                  </h2>

                </div>

              </div>


              <div className="mt-6">

                <label className="text-sm text-neutral-400">
                  Product
                </label>

                <select
                  value={productSlug}
                  onChange={(event) => setProductSlug(event.target.value)}
                  required
                  className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30"
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


              <div className="grid md:grid-cols-2 gap-5 mt-5">

                <div>

                  <label className="text-sm text-neutral-400">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    placeholder="e.g. 100"
                    required
                    className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                  />

                </div>


                <div>

                  <label className="text-sm text-neutral-400">
                    Application / Industry
                  </label>

                  <select
                    value={application}
                    onChange={(event) => setApplication(event.target.value)}
                    required
                    className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30"
                  >

                    <option value="">
                      Select application
                    </option>

                    <option value="Automotive">
                      Automotive
                    </option>

                    <option value="Energy">
                      Energy
                    </option>

                    <option value="Construction">
                      Construction
                    </option>

                    <option value="Manufacturing">
                      Manufacturing
                    </option>

                    <option value="Industrial Automation">
                      Industrial Automation
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

            </section>


            {/* Company Information */}

            <section className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Step 02
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                Company Information
              </h2>


              <div className="grid md:grid-cols-2 gap-5 mt-6">

                <div>

                  <label className="text-sm text-neutral-400">
                    Company Name
                  </label>

                  <input
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Your company"
                    required
                    className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                  />

                </div>


                <div>

                  <label className="text-sm text-neutral-400">
                    Contact Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                  />

                </div>


                <div>

                  <label className="text-sm text-neutral-400">
                    Business Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                  />

                </div>


                <div>

                  <label className="text-sm text-neutral-400">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30"
                  />

                </div>

              </div>

            </section>


            {/* Technical Requirements */}

            <section className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Step 03
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                Technical Requirements
              </h2>

              <textarea
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                rows="6"
                placeholder="Describe dimensions, tolerances, operating conditions, standards, drawings or any other technical requirements..."
                className="w-full mt-6 bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-white/30 resize-none"
              />


              <label className="mt-5 border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.03] transition">

                <Upload
                  size={24}
                  className="text-neutral-500"
                />

                <span className="text-sm text-neutral-300 mt-3">
                  Upload drawing or specification
                </span>

                <span className="text-xs text-neutral-600 mt-1">
                  PDF, DOC, PNG or JPG
                </span>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0]

                    if (file) {
                      setFileName(file.name)
                    }
                  }}
                />

              </label>


              {fileName && (

                <p className="text-sm text-neutral-400 mt-3">
                  Selected file: {fileName}
                </p>

              )}

            </section>


            {/* Submit */}

            {error && (
  <div className="border border-red-500/20 bg-red-500/10 rounded-lg px-4 py-3 text-sm text-red-300">
    {error}
  </div>
)}

<button
  type="submit"
  disabled={submitting}
  className="w-full bg-white text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {submitting ? 'Submitting...' : 'Submit RFQ'}

  {!submitting && <ArrowRight size={18} />}
</button>

          </div>


          {/* Quote Summary */}

          <aside className="lg:sticky lg:top-28 h-fit">

            <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.03]">

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Requirement Summary
              </p>

              <h2 className="text-2xl font-semibold mt-3">
                Preliminary Estimate
              </h2>


              {!selectedProduct ? (

                <p className="text-neutral-500 mt-6 text-sm leading-relaxed">
                  Select a product and quantity to see a
                  preliminary estimate.
                </p>

              ) : (

                <div className="mt-8">

                  <div className="border-b border-white/10 pb-5">

                    <p className="text-xs uppercase tracking-wider text-neutral-600">
                      Product
                    </p>

                    <p className="text-sm font-medium mt-2">
                      {selectedProduct.name}
                    </p>

                  </div>


                  <div className="border-b border-white/10 py-5">

                    <p className="text-xs uppercase tracking-wider text-neutral-600">
                      Quantity
                    </p>

                    <p className="text-sm mt-2">
                      {quantity || '—'}
                    </p>

                  </div>


                  {estimatedQuote && (

                    <>

                      <div className="border-b border-white/10 py-5">

                        <div className="flex justify-between text-sm">

                          <span className="text-neutral-500">
                            Estimated unit price
                          </span>

                          <span>
                            ₹{estimatedQuote.basePrice.toLocaleString('en-IN')}
                          </span>

                        </div>

                        <div className="flex justify-between text-sm mt-3">

                          <span className="text-neutral-500">
                            Components
                          </span>

                          <span>
                            ₹{estimatedQuote.subtotal.toLocaleString('en-IN')}
                          </span>

                        </div>

                        <div className="flex justify-between text-sm mt-3">

                          <span className="text-neutral-500">
                            Engineering
                          </span>

                          <span>
                            ₹{estimatedQuote.engineeringFee.toLocaleString('en-IN')}
                          </span>

                        </div>

                      </div>


                      <div className="pt-5">

                        <p className="text-xs uppercase tracking-wider text-neutral-600">
                          Preliminary Total
                        </p>

                        <p className="text-3xl font-bold mt-2">
                          ₹{estimatedQuote.total.toLocaleString('en-IN')}
                        </p>

                        <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                          Demo estimate only. Final pricing depends
                          on specifications, material, tolerances,
                          quantity and delivery requirements.
                        </p>

                      </div>

                    </>

                  )}

                </div>

              )}

            </div>

          </aside>

        </form>

      </div>

    </main>
  )
}

export default QuoteBuilder