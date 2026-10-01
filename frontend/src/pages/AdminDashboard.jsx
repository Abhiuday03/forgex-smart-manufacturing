import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, ShieldCheck } from 'lucide-react'

const API_URL = 'http://localhost:8080/api/quotes'

const STATUS_OPTIONS = [
  'NEW',
  'CONTACTED',
  'QUOTED',
  'WON',
  'LOST',
]

function AdminDashboard() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  async function loadQuotes() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to load quote requests')
      }

      const data = await response.json()

      setQuotes(data)
    } catch (err) {
      console.error(err)

      setError(
        'Unable to load quote requests. Make sure the Spring Boot backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuotes()
  }, [])

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id)

      const response = await fetch(
        `${API_URL}/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const updatedQuote = await response.json()

      setQuotes((currentQuotes) =>
        currentQuotes.map((quote) =>
          quote.id === id
            ? updatedQuote
            : quote
        )
      )
    } catch (err) {
      console.error(err)

      alert(
        'Could not update the lead status. Please try again.'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const stats = useMemo(() => {
    return {
      total: quotes.length,

      newLeads: quotes.filter(
        (quote) => quote.status === 'NEW'
      ).length,

      contacted: quotes.filter(
        (quote) => quote.status === 'CONTACTED'
      ).length,

      quoted: quotes.filter(
        (quote) => quote.status === 'QUOTED'
      ).length,

      won: quotes.filter(
        (quote) => quote.status === 'WON'
      ).length,

      lost: quotes.filter(
        (quote) => quote.status === 'LOST'
      ).length,
    }
  }, [quotes])

  const conversionRate =
    stats.total > 0
      ? ((stats.won / stats.total) * 100).toFixed(1)
      : '0.0'

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              ForgeX Management
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mt-4">
              Sales Dashboard
            </h1>

            <p className="text-neutral-400 mt-5 max-w-2xl">
              Track incoming quote requests and manage
              your B2B sales pipeline.
            </p>

          </div>

          <button
            onClick={loadQuotes}
            className="inline-flex items-center justify-center gap-2 border border-white/10 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition"
          >
            <RefreshCw size={16} />

            Refresh
          </button>

        </div>


        {/* Error */}

        {error && (

          <div className="mt-10 border border-red-500/20 bg-red-500/10 rounded-xl p-5">

            <p className="text-red-300">
              {error}
            </p>

          </div>

        )}


        {/* Statistics */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">

          <StatCard
            label="Total Leads"
            value={stats.total}
          />

          <StatCard
            label="New"
            value={stats.newLeads}
          />

          <StatCard
            label="Contacted"
            value={stats.contacted}
          />

          <StatCard
            label="Quoted"
            value={stats.quoted}
          />

          <StatCard
            label="Won"
            value={stats.won}
          />

          <StatCard
            label="Lost"
            value={stats.lost}
          />

        </div>


        {/* Conversion */}

        <div className="mt-6 border border-white/10 rounded-2xl bg-white/[0.03] p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-neutral-500">
                Lead Conversion
              </p>

              <p className="text-3xl font-bold mt-2">
                {conversionRate}%
              </p>

            </div>

            <ShieldCheck
              size={28}
              className="text-neutral-500"
            />

          </div>

          <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-white rounded-full transition-all"
              style={{
                width: `${Math.min(
                  Number(conversionRate),
                  100
                )}%`,
              }}
            />

          </div>

        </div>


        {/* Leads */}

        <section className="mt-12">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                Pipeline
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                Quote Requests
              </h2>

            </div>

            <p className="text-sm text-neutral-500">
              {quotes.length} total
            </p>

          </div>


          {loading ? (

            <div className="border border-white/10 rounded-2xl p-10 text-center">

              <p className="text-neutral-400">
                Loading quote requests...
              </p>

            </div>

          ) : quotes.length === 0 ? (

            <div className="border border-white/10 rounded-2xl p-10 text-center">

              <p className="text-neutral-400">
                No quote requests yet.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto border border-white/10 rounded-2xl">

              <table className="w-full min-w-[1000px]">

                <thead className="bg-white/[0.03]">

                  <tr className="text-left">

                    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
                      Company
                    </th>

                    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {quotes.map((quote) => (

                    <tr
                      key={quote.id}
                      className="border-t border-white/10 hover:bg-white/[0.02]"
                    >

                      <td className="px-5 py-5">

                        <p className="font-medium">
                          {quote.company || '—'}
                        </p>

                        <p className="text-xs text-neutral-600 mt-1">
                          #{quote.id}
                        </p>

                      </td>


                      <td className="px-5 py-5">

                        <p className="text-sm">
                          {quote.name || '—'}
                        </p>

                        <p className="text-xs text-neutral-500 mt-1">
                          {quote.email || '—'}
                        </p>

                      </td>


                      <td className="px-5 py-5">

                        <p className="text-sm">
                          {quote.product || '—'}
                        </p>

                      </td>


                      <td className="px-5 py-5">

                        <p className="text-sm">
                          {quote.quantity || '—'}
                        </p>

                      </td>


                      <td className="px-5 py-5">

                        <p className="text-sm text-neutral-400">
                          {quote.createdAt
                            ? new Date(
                                quote.createdAt
                              ).toLocaleDateString()
                            : '—'}
                        </p>

                      </td>


                      <td className="px-5 py-5">

                        <select
                          value={quote.status || 'NEW'}
                          disabled={
                            updatingId === quote.id
                          }
                          onChange={(event) =>
                            updateStatus(
                              quote.id,
                              event.target.value
                            )
                          }
                          className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 disabled:opacity-50"
                        >

                          {STATUS_OPTIONS.map(
                            (status) => (

                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>

                            )
                          )}

                        </select>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </main>
  )
}


function StatCard({ label, value }) {

  return (

    <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-5">

      <p className="text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </p>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>

    </div>

  )
}


export default AdminDashboard