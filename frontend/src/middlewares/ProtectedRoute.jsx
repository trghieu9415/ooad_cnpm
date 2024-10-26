import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const sessionToken = localStorage.getItem('UserToken')
  return sessionToken ? children : <Navigate to='/login' />
}

export default ProtectedRoute
