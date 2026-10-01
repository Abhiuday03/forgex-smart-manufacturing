import { useState } from 'react'

const API_URL = 'http://localhost:8080/api/quotes'

function QuoteBuilder() {
  const [form, setForm] = useState({
    product: '',
    quantity: '',
    application: '',
    company: '',
    name: '',
    email: '',
    phone: '',
    requirements: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: form.product,
          quantity: Number(form.quantity),
          application: form.application,
          company: form.company,
          name: form.name,
          email: form.email,
          phone: form.phone,
          requirements: form.requirements,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit quote request')
      }

      const data = await response.json()

      console.log('Quote created:', data)

      setSuccess(
        'Your quote request has been submitted successfully.'
      )

      setForm({
        product: '',
        quantity: '',
        application: '',
        company: '',
        name: '',
        email: '',
        phone: '',
        requirements: '',
      })
    } catch (err) {
      console.error(err)

      setError(
        'Unable to submit your request. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}

        <div className="max-w-2xl">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            ForgeX Sales
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-4">
            Request a Quote
          </h1>

          <p className="text-neutral-400 text-lg mt-6 leading-relaxed">
            Tell us what you need and our engineering team
            will review your requirements.
          </p>

        </div>


        {/* Success */}

        {success && (

          <div className="mt-10 border border-green-500/20 bg-green-500/10 rounded-xl p-5">

            <p className="text-green-300">
              {success}
            </p>

          </div>

        )}


        {/* Error */}

        {error && (

          <div className="mt-10 border border-red-500/20 bg-red-500/10 rounded-xl p-5">

            <p className="text-red-300">
              {error}
            </p>

          </div>

        )}


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-8"
        >

          {/* Product */}

          <section className="border border-white/10 rounded-2xl bg-white/[0.03] p-7">

            <h2 className="text-xl font-semibold">
              Product Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div>

                <label className="text-sm text-neutral-400">
                  Product
                </label>

                <input
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Precision Steel Bolt"
                  className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
                />

              </div>


              <div>

                <label className="text-sm text-neutral-400">
                  Quantity
                </label>

                <input
                  name="quantity"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 500"
                  className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
                />

              </div>

            </div>


            <div className="mt-5">

              <label className="text-sm text-neutral-400">
                Application
              </label>

              <input
                name="application"
                value={form.application}
                onChange={handleChange}
                required
                placeholder="Where will this component be used?"
                className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
              />

            </div>


            <div className="mt-5">

              <label className="text-sm text-neutral-400">
                Technical Requirements
              </label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows="5"
                placeholder="Material grade, dimensions, tolerances, certifications, delivery requirements..."
                className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30 resize-none"
              />

            </div>

          </section>


          {/* Company */}

          <section className="border border-white/10 rounded-2xl bg-white/[0.03] p-7">

            <h2 className="text-xl font-semibold">
              Company Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div>

                <label className="text-sm text-neutral-400">
                  Company
                </label>

                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="Company name"
                  className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
                />

              </div>


              <div>

                <label className="text-sm text-neutral-400">
                  Your Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
                />

              </div>


              <div>

                <label className="text-sm text-neutral-400">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
                />

              </div>


              <div>

                <label className="text-sm text-neutral-400">
                  Phone
                </label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30"
                />

              </div>

            </div>

          </section>


          {/* Submit */}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Submitting...'
                : 'Submit Quote Request'}
            </button>

            <p className="text-sm text-neutral-500">
              Your information will be sent securely to the
              ForgeX sales team.
            </p>

          </div>

        </form>

      </div>

    </main>
  )
}

export default QuoteBuilder