import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Fragment, Suspense } from 'react'
import { publicRoutes } from './routes/routes'
import DefaultLayout from './layouts/DefaultLayout'

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='App'>
          <Routes>
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
