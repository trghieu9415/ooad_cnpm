import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RouteElement from './RouteElement'

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteElement />
      </BrowserRouter>
    </>
  )
}

export default App
