const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  admin: '/admin',
  adminLogin: '/admin/login',
  questions: '/questions',
  users: '/users/:slug',
  userAdjustments: '/users/:slug/:feature',
  tags: '/tags',
  notFound: '*'
}

export default routes
