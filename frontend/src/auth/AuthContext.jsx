
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const API_URL = 'http://localhost:8080/api/quotes'

export function AuthProvider({ children }) {
  const [authorization, setAuthorization] = useState(null)

  async function login(username, password) {
    const encodedCredentials = window.btoa(
      `${username}:${password}`
    )

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    })

    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid username or password.')
    }

    if (!response.ok) {
      throw new Error(
        'Login failed. Check that the backend is running.'
      )
    }

    setAuthorization(`Basic ${encodedCredentials}`)
  }

  function logout() {
    setAuthorization(null)
  }

  return (
    <AuthContext.Provider
      value={{ authorization, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}