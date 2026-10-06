
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

function ProtectedRoute({ children }) {
  const { authorization } = useAuth()
  const location = useLocation()

  if (!authorization) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute