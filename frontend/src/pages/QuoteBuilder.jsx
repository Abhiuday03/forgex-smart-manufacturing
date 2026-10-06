import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Factory,
  LoaderCircle,
  Send,
} from 'lucide-react'

import { getProducts } from '../api/productApi'
import { submitQuote } from '../api/quoteApi'

const initialForm = {
  quantity: '100',
  application: '',
  company: '',
  name: '',
  email: '',
  phone: '',
  requirements: '',
}

function QuoteBuilder() {
  const [searchParams] = useSearchParams()
  const requestedProductSlug = searchParams.get('product')

  const [products, setProducts] = useState([])
  const [selectedProductSlug, setSelectedProductSlug] = useState('')
  const [form, setForm] = useState(initialForm)

  const [loadingProducts, setLoadingProducts] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true)
        setError('')

        const data = await getProducts()
        const productList = Array.isArray(data) ? data : []

        setProducts(productList)

        const matchingProduct = productList.find(
          (product) => product.slug === requestedProductSlug
        )

        if (matchingProduct) {
          setSelectedProductSlug(matchingProduct.slug)
        } else if (productList.length > 0) {
          setSelectedProductSlug(productList[0].slug)
        }
      } catch (err) {
        console.error('Failed to load products:', err)
        setError(
          'Unable to load products. Make sure the ForgeX backend is running.'
        )
      } finally {
        setLoadingProducts(false)
      }
    }

    loadProducts()
  }, [requestedProductSlug])

  const selectedProduct = products.find(
    (product) => product.slug === selectedProductSlug
  )

  const applications = selectedProduct?.applications
    ? selectedProduct.applications
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleProductChange(event) {
    setSelectedProductSlug(event.target.value)
    setForm((previous) => ({
      ...previous,
      application: '',
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess(false)

    if (!selectedProduct) {
      setError('Please select a product before submitting your request.')
      return
    }

    if (Number(form.quantity) < 1) {
      setError('Quantity must be at least 1.')
      return
    }

    try {
      setSubmitting(true)

      await submitQuote({
        product: selectedProduct.name,
        quantity: Number(form.quantity),
        application: form.application,
        company: form.company.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        requirements: form.requirements.trim(),
      })

      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Quote submission failed:', err)

      setError(
        err.response?.data?.message ||
          'Your request could not be submitted. Please check that the backend is running and try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            ForgeX Industrial Solutions
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Request a <span className="text-orange-400">Quote</span>
          </h1>

          <p className="mt-4 leading-7 text-neutral-400">
            Tell us what your project needs. Our team can review your
            requirements and follow up with you about the next steps.
          </p>
        </div>

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-800 bg-emerald-950/40 p-5">
            <CheckCircle2
              className="mt-0.5 shrink-0 text-emerald-400"
              size={22}
            />

            <div>
              <h2 className="font-semibold text-emerald-300">
                Quote request submitted
              </h2>
              <p className="mt-1 text-sm text-neutral-300">
                Your request has been sent successfully. Our team can review
                the details and contact you.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-8"
          >
            <section>
              <h2 className="mb-6 text-xl font-semibold">
                01. Product requirements
              </h2>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="product"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Select product *
                  </label>

                  <select
                    id="product"
                    value={selectedProductSlug}
                    onChange={handleProductChange}
                    required
                    disabled={loadingProducts || products.length === 0}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {loadingProducts
                        ? 'Loading products...'
                        : 'Choose a product'}
                    </option>

                    {products.map((product) => (
                      <option key={product.id ?? product.slug} value={product.slug}>
                        {product.name}
                      </option>
                    ))}
                  </select>

                  {!loadingProducts && products.length === 0 && (
                    <p className="mt-2 text-sm text-neutral-400">
                      No products are available. Add products to your database
                      before submitting a quote.
                    </p>
                  )}
                </div>

                {selectedProduct && (
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                      {selectedProduct.category}
                    </p>

                    <h3 className="mt-2 font-semibold">
                      {selectedProduct.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                      {selectedProduct.shortDescription ||
                        selectedProduct.description}
                    </p>

                    {selectedProduct.material && (
                      <p className="mt-3 text-sm text-neutral-300">
                        <span className="text-neutral-500">Material:</span>{' '}
                        {selectedProduct.material}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-2 block text-sm font-medium text-neutral-300"
                    >
                      Required quantity *
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={form.quantity}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="application"
                      className="mb-2 block text-sm font-medium text-neutral-300"
                    >
                      Application *
                    </label>

                    <select
                      id="application"
                      name="application"
                      required
                      value={form.application}
                      onChange={handleChange}
                      disabled={!selectedProduct}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400 disabled:opacity-50"
                    >
                      <option value="">Choose application</option>

                      {applications.map((application) => (
                        <option key={application} value={application}>
                          {application}
                        </option>
                      ))}

                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="requirements"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Technical requirements
                  </label>

                  <textarea
                    id="requirements"
                    name="requirements"
                    rows="4"
                    value={form.requirements}
                    onChange={handleChange}
                    placeholder="Describe dimensions, specifications, delivery expectations, or other requirements..."
                    className="w-full resize-y rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-neutral-800" />

            <section>
              <h2 className="mb-6 text-xl font-semibold">
                02. Contact information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Company name *
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    maxLength="150"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Contact person *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength="100"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Business email *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength="150"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Phone number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength="30"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Contact number"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting || loadingProducts || !selectedProduct}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-4 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="animate-spin" size={19} />
                  Submitting request...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit quote request
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-xs leading-5 text-neutral-500">
              Your submitted details will be sent to the ForgeX backend for
              processing.
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              <Factory size={25} />
            </div>

            <h2 className="text-lg font-semibold">
              Built around your requirements
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Provide accurate quantities and technical details to help the
              team understand your manufacturing needs.
            </p>

            <div className="my-6 border-t border-neutral-800" />

            <h3 className="text-sm font-semibold text-neutral-200">
              Before submitting
            </h3>

            <ul className="mt-4 space-y-3 text-sm leading-5 text-neutral-400">
              <li>• Select the correct product.</li>
              <li>• Enter the approximate quantity required.</li>
              <li>• Choose the intended application.</li>
              <li>• Provide valid contact information.</li>
              <li>• Include any important technical specifications.</li>
            </ul>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300"
            >
              Explore products
              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default QuoteBuilder