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
const NotFound = lazy(() => import('../pages/NotFound'))
const AdminLayout = lazy(() => import('../layouts/AdminLayout'))
const AdminMember = lazy(() => import('../pages/Admin/Member'))
const AdminQuestion = lazy(() => import('../pages/Admin/Question'))
// const Saves = lazy(() => import('../pages/Saves'))

const publicRoutes = [
  {
    path: config.routes.register,
    component: Register,
    layout: null
  },
  {
    path: config.routes.home,
    component: Home
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
    path: config.routes.notFound,
    component: NotFound,
    layout: null
  },
  {
    path: config.routes.adminHome,
    component: AdminHome,
    layout: AdminLayout
  },
  {
    path: config.routes.adminLogin,
    component: AdminLogin,
    layout: null
  },
  {
    path: config.routes.adminMember,
    component: AdminMember,
    layout: AdminLayout
  },
  {
    path: config.routes.adminQuestion,
    component: AdminQuestion,
    layout: AdminLayout
  }
]

const authRoutes = [
  {
    path: config.routes.register,
    component: Register,
    layout: null
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null
  }
]

const privateRoutes = [
  {
    path: config.routes.users,
    component: Users
  }
]

export { publicRoutes, privateRoutes, authRoutes }
