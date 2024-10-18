import { lazy } from 'react'
import config from '../config/routePath'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const AdminHome = lazy(() => import('../pages/Admin/Home'))
const AdminLogin = lazy(() => import('../pages/Admin/Login'))

const publicRoutes = [
  {
    path: config.routes.register,
    component: Register,
    layout: null
  },
  {
    path: config.routes.admin,
    component: AdminHome,
    layout: null
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null
  },
  {
    path: config.routes.home,
    component: Home
  },
  {
    path: config.routes.adminLogin,
    component: AdminLogin,
    layout: null
  }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
