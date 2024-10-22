import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
  const sessionToken = localStorage.getItem('UserToken')
  return !sessionToken ? children : <Navigate to='/users/profile' />
}

export default AuthRoute
