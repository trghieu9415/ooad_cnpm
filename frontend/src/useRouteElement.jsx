import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import HomeAdmin from './pages/Admin/HomeAdmin'
import LoginAdmin from './pages/Admin/LoginAdmin'
export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/admin',
      element: <HomeAdmin />
    },
    {
      path: '/admin/login',
      element: <LoginAdmin />
    }
  ])

  return routeElements
}
