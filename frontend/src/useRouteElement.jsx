import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './Components/Admin/Layout'
import HomeAdmin from './pages/Admin/HomeAdmin'

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
      element: <Layout />,
      children: [
        {
          path: '',
          element: <HomeAdmin />
          // index
        }
      ]
    }
  ])

  return routeElements
}
