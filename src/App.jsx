import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import HeadSection from './components/head'
import Products from './components/Products';


function App() {
  const [cart, setCart] = useState([])
  const [category, setCategory] = useState('')

  return (
    <>
      <HeadSection cart={cart} />
      <Outlet  context={{cart, setCart, category, setCategory}}/>
      {/* <Products cart={cart} setCart={setCart} /> */}
    </>
  )
}

export default App
