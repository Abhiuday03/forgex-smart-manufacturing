
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

function AdminLogin() {
  const { authorization, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (authorization) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username.trim(), password)

      const destination =
        location.state?.from?.pathname || '/admin'

      navigate(destination, { replace: true })
    } catch (err) {
      setError(
        err.message || 'Unable to log in. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 pt-32 pb-16 flex items-center justify-center">
      <section className="w-full max-w-md border border-white/10 bg-white/[0.03] rounded-2xl p-8">
        <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
          <LockKeyhole size={23} />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mt-8">
          ForgeX Management
        </p>

        <h1 className="text-3xl font-bold mt-3">
          Admin Sign In
        </h1>

        <p className="text-neutral-400 text-sm mt-3">
          Sign in to access sales analytics and manage quote requests.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-neutral-300 mb-2"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-neutral-300 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/40"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="border border-red-500/30 bg-red-500/10 rounded-lg p-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black rounded-lg py-3 font-semibold hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdminLogin