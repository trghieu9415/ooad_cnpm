import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
const RouteElement = () => {
  return (
    <Routes>
      <Route path='' element={<Home />}></Route>
      <Route path='/auth' element={<Login />}></Route>
    </Routes>
  )
}

export default RouteElement
