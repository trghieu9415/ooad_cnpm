import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem('UserToken')
  const adminToken = localStorage.getItem('token_admin')
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    if (!adminToken) {
      return <Navigate to='/admin/login' />
    }
  } else {
    if (!userToken) {
      return <Navigate to='/login' />
    }
  }
  return children
}

export default ProtectedRoute
