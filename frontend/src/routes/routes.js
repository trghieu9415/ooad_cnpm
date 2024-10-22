import { lazy } from 'react'
import config from '../config/routePath'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const AdminHome = lazy(() => import('../pages/Admin/Home/HomeAdmin'))
const AdminLogin = lazy(() => import('../pages/Admin/Login/LoginAdmin'))
const Questions = lazy(() => import('../pages/Questions'))
const Tags = lazy(() => import('../pages/Tags'))
const Users = lazy(() => import('../pages/Users'))
// const Saves = lazy(() => import('../pages/Saves'))

const publicRoutes = [
  {
    path: config.routes.register,
    component: Register,
    layout: null
  },
  {
    path: config.routes.adminHome,
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
  },
  {
    path: config.routes.questions,
    component: Questions
  },
  {
    path: config.routes.tags,
    component: Tags
  },
  {
    path: config.routes.users,
    component: Users
  }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
