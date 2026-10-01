import {
  Building2,
  ClipboardList,
  Package,
  RefreshCw,
} from 'lucide-react'

import { useEffect, useMemo, useState } from 'react'

import { getQuotes } from '../api/quoteApi'

function AdminDashboard() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadQuotes() {
    try {
      setLoading(true)
      setError('')

      const data = await getQuotes()

      setQuotes(data)
    } catch (error) {
      console.error('Failed to load quotes:', error)

      setError(
        'Unable to load quote requests. Please make sure the backend server is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuotes()
  }, [])

  const uniqueCompanies = useMemo(() => {
    return new Set(
      quotes
        .map((quote) => quote.company)
        .filter(Boolean)
    ).size
  }, [quotes])

  const uniqueProducts = useMemo(() => {
    return new Set(
      quotes
        .map((quote) => quote.product)
        .filter(Boolean)
    ).size
  }, [quotes])

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-28 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              ForgeX Management
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Sales Dashboard
            </h1>

            <p className="text-neutral-400 mt-4">
              Monitor incoming B2B quote requests and customer enquiries.
            </p>

          </div>

          <button
            onClick={loadQuotes}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 border border-white/10 rounded-lg px-4 py-3 text-sm text-neutral-300 hover:text-white hover:border-white/30 transition disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? 'animate-spin' : ''}
            />

            Refresh
          </button>

        </div>


        {/* Error */}

        {error && (

          <div className="mt-8 border border-red-500/20 bg-red-500/10 rounded-xl p-5">

            <p className="text-red-300">
              {error}
            </p>

          </div>

        )}


        {/* Statistics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          {/* Leads */}

          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

            <div className="flex items-center justify-between">

              <p className="text-sm text-neutral-500">
                Total Leads
              </p>

              <ClipboardList
                size={20}
                className="text-neutral-500"
              />

            </div>

            <p className="text-4xl font-bold mt-5">
              {quotes.length}
            </p>

            <p className="text-xs text-neutral-600 mt-2">
              Quote requests received
            </p>

          </div>


          {/* Companies */}

          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

            <div className="flex items-center justify-between">

              <p className="text-sm text-neutral-500">
                Companies
              </p>

              <Building2
                size={20}
                className="text-neutral-500"
              />

            </div>

            <p className="text-4xl font-bold mt-5">
              {uniqueCompanies}
            </p>

            <p className="text-xs text-neutral-600 mt-2">
              Unique businesses
            </p>

          </div>


          {/* Products */}

          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

            <div className="flex items-center justify-between">

              <p className="text-sm text-neutral-500">
                Products Requested
              </p>

              <Package
                size={20}
                className="text-neutral-500"
              />

            </div>

            <p className="text-4xl font-bold mt-5">
              {uniqueProducts}
            </p>

            <p className="text-xs text-neutral-600 mt-2">
              Different products
            </p>

          </div>


          {/* Status */}

          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">

            <div className="flex items-center justify-between">

              <p className="text-sm text-neutral-500">
                System Status
              </p>

              <span className="w-2 h-2 rounded-full bg-green-400" />

            </div>

            <p className="text-2xl font-bold mt-6">
              Operational
            </p>

            <p className="text-xs text-neutral-600 mt-2">
              API connected
            </p>

          </div>

        </div>


        {/* Quote Requests */}

        <section className="mt-12">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Lead Pipeline
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                Recent Quote Requests
              </h2>

            </div>

          </div>


          {/* Loading */}

          {loading && (

            <div className="border border-white/10 rounded-2xl p-10 mt-6 bg-white/[0.03]">

              <p className="text-neutral-500">
                Loading quote requests...
              </p>

            </div>

          )}


          {/* Empty */}

          {!loading && quotes.length === 0 && (

            <div className="border border-white/10 rounded-2xl p-10 mt-6 bg-white/[0.03] text-center">

              <ClipboardList
                size={32}
                className="mx-auto text-neutral-600"
              />

              <h3 className="text-lg font-semibold mt-5">
                No quote requests yet
              </h3>

              <p className="text-neutral-500 mt-2">
                Customer enquiries will appear here when submitted.
              </p>

            </div>

          )}


          {/* Requests */}

          {!loading && quotes.length > 0 && (

            <div className="mt-6 border border-white/10 rounded-2xl overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="bg-white/[0.03] border-b border-white/10">

                    <tr>

                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-neutral-500">
                        Company
                      </th>

                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-neutral-500">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-neutral-500">
                        Product
                      </th>

                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-neutral-500">
                        Quantity
                      </th>

                      <th className="px-6 py-4 text-xs uppercase tracking-wider text-neutral-500">
                        Application
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {quotes.map((quote) => (

                      <tr
                        key={quote.id}
                        className="border-b border-white/5 hover:bg-white/[0.03] transition"
                      >

                        <td className="px-6 py-5">

                          <p className="font-medium">
                            {quote.company || 'Unknown'}
                          </p>

                        </td>


                        <td className="px-6 py-5">

                          <p className="text-sm text-neutral-300">
                            {quote.name || 'Unknown'}
                          </p>

                          <p className="text-xs text-neutral-600 mt-1">
                            {quote.email || ''}
                          </p>

                        </td>


                        <td className="px-6 py-5">

                          <p className="text-sm text-neutral-300">
                            {quote.product || 'Unknown'}
                          </p>

                        </td>


                        <td className="px-6 py-5">

                          <p className="text-sm text-neutral-300">
                            {quote.quantity || '-'}
                          </p>

                        </td>


                        <td className="px-6 py-5">

                          <span className="text-xs border border-white/10 rounded-full px-3 py-1 text-neutral-400">
                            {quote.application || 'Not specified'}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </section>

      </div>

    </main>
  )
}

export default AdminDashboard