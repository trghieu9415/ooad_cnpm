/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Fragment, Suspense, useEffect } from 'react'
import { authRoutes, privateRoutes, publicRoutes } from './routes/routes'
import DefaultLayout from './layouts/DefaultLayout'
import ProtectedRoute from './middlewares/ProtectedRoute'
import AuthRoute from './middlewares/AuthRoute'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { memberSelf } from './apis/member.api'
import { updateUser } from './redux/slides/userSlide'

function App() {
  const dispatch = useDispatch()

  const { mutate: fetchUserDetails } = useMutation({
    mutationFn: (token) => memberSelf(token),
    onSuccess: (userDetails) => {
      dispatch(updateUser({ ...userDetails.data }))
    },
    onError: (e) => {
      console.log(e)
    }
  })
  useEffect(() => {
    const token = localStorage.getItem('UserToken')
    if (token) {
      fetchUserDetails(token)
    } else {
      window.location.href = '/login'
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='App'>
          <Routes>
            {privateRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              )
            })}

            {authRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </AuthRoute>
                  }
                />
              )
            })}

            {publicRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
