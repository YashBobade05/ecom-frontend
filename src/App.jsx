import React from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './AllRoutes/AllRoutes'
import { CartProvider } from './CartContext/CartContext'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AllRoutes/>
      </CartProvider>
    </BrowserRouter>
  )
}
