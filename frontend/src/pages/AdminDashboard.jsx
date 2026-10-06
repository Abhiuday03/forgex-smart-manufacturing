
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const API_URL = 'http://localhost:8080/api/quotes'

const STATUS_OPTIONS = [
  'NEW',
  'CONTACTED',
  'QUOTED',
  'WON',
  'LOST',
]

const STATUS_COLORS = {
  NEW: '#60a5fa',
  CONTACTED: '#a78bfa',
  QUOTED: '#fbbf24',
  WON: '#34d399',
  LOST: '#f87171',
}

function AdminDashboard() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const loadQuotes = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Could not load quote requests')
      }

      const data = await response.json()
      setQuotes(data)
    } catch (err) {
      console.error('Loading quotes failed:', err)
      setError(
        'Unable to load analytics. Check that Spring Boot and PostgreSQL are running.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadQuotes()
  }, [loadQuotes])

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id)
      setError('')

      const response = await fetch(
        `${API_URL}/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      )

      if (!response.ok) {
        throw new Error('Could not update lead status')
      }

      const updatedQuote = await response.json()

      setQuotes((current) =>
        current.map((quote) =>
          quote.id === id ? updatedQuote : quote
        )
      )
    } catch (err) {
      console.error('Status update failed:', err)
      setError(
        'Unable to update this lead. Please try again.'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const analytics = useMemo(() => {
    const statusCounts = Object.fromEntries(
      STATUS_OPTIONS.map((status) => [
        status,
        quotes.filter(
          (quote) => (quote.status || 'NEW') === status
        ).length,
      ])
    )

    const productCounts = {}

    quotes.forEach((quote) => {
      const product = quote.product || 'Unspecified product'
      productCounts[product] =
        (productCounts[product] || 0) + 1
    })

    const pipelineData = STATUS_OPTIONS.map((status) => ({
      status,
      leads: statusCounts[status],
    }))

    const productData = Object.entries(productCounts)
      .map(([product, leads]) => ({ product, leads }))
      .sort((a, b) => b.leads - a.leads)
      .slice(0, 5)

    const won = statusCounts.WON
    const conversionRate =
      quotes.length > 0
        ? (won / quotes.length) * 100
        : 0

    return {
      total: quotes.length,
      newLeads: statusCounts.NEW,
      contacted: statusCounts.CONTACTED,
      quoted: statusCounts.QUOTED,
      won,
      lost: statusCounts.LOST,
      conversionRate,
      pipelineData,
      productData,
    }
  }, [quotes])

  const recentQuotes = useMemo(() => {
    return [...quotes].sort((a, b) => {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0
      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0

      return dateB - dateA
    })
  }, [quotes])

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              ForgeX Management
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mt-4">
              Sales Analytics
            </h1>

            <p className="text-neutral-400 mt-5 max-w-2xl">
              Monitor your sales pipeline, understand product
              demand, and track lead conversion using your
              actual quote requests.
            </p>
          </div>

          <button
            onClick={loadQuotes}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 border border-white/10 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? 'animate-spin' : ''}
            />
            Refresh Data
          </button>
        </header>

        {error && (
          <div className="mt-8 border border-red-500/20 bg-red-500/10 rounded-xl p-5">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* KPI cards */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <StatCard
            label="Total Leads"
            value={analytics.total}
            icon={<Users size={20} />}
          />

          <StatCard
            label="New Leads"
            value={analytics.newLeads}
            icon={<Activity size={20} />}
          />

          <StatCard
            label="Deals Won"
            value={analytics.won}
            icon={<TrendingUp size={20} />}
          />

          <StatCard
            label="Conversion Rate"
            value={`${analytics.conversionRate.toFixed(1)}%`}
            icon={<Target size={20} />}
          />
        </section>

        {/* Pipeline chart */}

        <section className="grid lg:grid-cols-2 gap-6 mt-8">

          <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-5 md:p-7">
            <div className="flex items-center gap-3">
              <BarChart3
                size={20}
                className="text-neutral-400"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  Lead Pipeline
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Requests grouped by current status
                </p>
              </div>
            </div>

            <div className="h-72 mt-6">
              {loading ? (
                <ChartMessage>Loading pipeline...</ChartMessage>
              ) : analytics.total === 0 ? (
                <ChartMessage>
                  Submit a quote request to populate this chart.
                </ChartMessage>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.pipelineData}
                    margin={{
                      top: 10,
                      right: 5,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      stroke="#262626"
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="status"
                      tick={{
                        fill: '#a3a3a3',
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{
                        fill: '#a3a3a3',
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background: '#171717',
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff',
                      }}
                    />

                    <Bar
                      dataKey="leads"
                      name="Leads"
                      radius={[5, 5, 0, 0]}
                    >
                      {analytics.pipelineData.map((item) => (
                        <Cell
                          key={item.status}
                          fill={STATUS_COLORS[item.status]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Product demand chart */}

          <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-5 md:p-7">
            <div className="flex items-center gap-3">
              <Activity
                size={20}
                className="text-neutral-400"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  Product Demand
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Top five products by quote requests
                </p>
              </div>
            </div>

            <div className="h-72 mt-6">
              {loading ? (
                <ChartMessage>Loading product demand...</ChartMessage>
              ) : analytics.productData.length === 0 ? (
                <ChartMessage>
                  Product demand will appear after the first request.
                </ChartMessage>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.productData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 15,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      stroke="#262626"
                      strokeDasharray="3 3"
                      horizontal={false}
                    />

                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{
                        fill: '#a3a3a3',
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="product"
                      width={125}
                      tick={{
                        fill: '#d4d4d4',
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background: '#171717',
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff',
                      }}
                    />

                    <Bar
                      dataKey="leads"
                      name="Quote Requests"
                      fill="#a78bfa"
                      radius={[0, 5, 5, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        {/* Status breakdown */}

        <section className="border border-white/10 rounded-2xl bg-white/[0.03] p-5 md:p-7 mt-8">
          <h2 className="text-lg font-semibold">
            Pipeline Breakdown
          </h2>

          <p className="text-sm text-neutral-500 mt-1">
            Current distribution of all recorded leads
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="h-64">
              {loading ? (
                <ChartMessage>Loading breakdown...</ChartMessage>
              ) : analytics.total === 0 ? (
                <ChartMessage>No lead data available yet.</ChartMessage>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.pipelineData.filter(
                        (item) => item.leads > 0
                      )}
                      dataKey="leads"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={55}
                      paddingAngle={3}
                    >
                      {analytics.pipelineData
                        .filter((item) => item.leads > 0)
                        .map((item) => (
                          <Cell
                            key={item.status}
                            fill={STATUS_COLORS[item.status]}
                          />
                        ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: '#171717',
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="flex flex-col justify-center gap-4">
              {analytics.pipelineData.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: STATUS_COLORS[item.status],
                      }}
                    />

                    <span className="text-sm text-neutral-300">
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tabular-nums">
                      {item.leads}
                    </span>

                    <span className="text-xs text-neutral-500 w-12 text-right">
                      {analytics.total
                        ? `${(
                            (item.leads / analytics.total) *
                            100
                          ).toFixed(0)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead management table */}

        <section className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                CRM
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                Recent Quote Requests
              </h2>
            </div>

            <p className="text-sm text-neutral-500">
              {analytics.total} total leads
            </p>
          </div>

          {loading ? (
            <div className="border border-white/10 rounded-2xl p-10 text-center text-neutral-400">
              Loading quote requests...
            </div>
          ) : recentQuotes.length === 0 ? (
            <div className="border border-white/10 rounded-2xl p-10 text-center text-neutral-400">
              No quote requests yet. Submit a test request from the quote page.
            </div>
          ) : (
            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full min-w-[950px]">
                <thead className="bg-white/[0.03]">
                  <tr className="text-left">
                    <TableHeader>Company</TableHeader>
                    <TableHeader>Contact</TableHeader>
                    <TableHeader>Product</TableHeader>
                    <TableHeader>Quantity</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {recentQuotes.map((quote) => (
                    <tr
                      key={quote.id}
                      className="border-t border-white/10 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {quote.company || '—'}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          #{quote.id}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm">
                          {quote.name || '—'}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {quote.email || '—'}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {quote.product || '—'}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {quote.quantity ?? '—'}
                      </td>

                      <td className="px-5 py-4 text-sm text-neutral-400">
                        {quote.createdAt
                          ? new Date(
                              quote.createdAt
                            ).toLocaleDateString()
                          : '—'}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={quote.status || 'NEW'}
                          disabled={updatingId === quote.id}
                          onChange={(event) =>
                            updateStatus(
                              quote.id,
                              event.target.value
                            )
                          }
                          className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="text-xs text-neutral-600 mt-8">
          Analytics are calculated from stored quote requests.
          Conversion rate is defined here as won leads divided
          by all recorded leads.
        </p>
      </div>
    </main>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          {label}
        </p>

        <span className="text-neutral-400">{icon}</span>
      </div>

      <p className="text-3xl font-bold mt-4 tabular-nums">
        {value}
      </p>
    </div>
  )
}

function ChartMessage({ children }) {
  return (
    <div className="h-full flex items-center justify-center text-center text-sm text-neutral-500 px-4">
      {children}
    </div>
  )
}

function TableHeader({ children }) {
  return (
    <th className="px-5 py-4 text-xs uppercase tracking-wider text-neutral-500">
      {children}
    </th>
  )
}

export default AdminDashboard