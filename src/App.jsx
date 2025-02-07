import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import HeadSection from './components/head'
import FooterSection from './components/Footer';
import useProductsURL from './services/API';


function App() {
  const [cart, setCart] = useState([])
  // const [category, setCategory] = useState('')

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortOption: "",
  });

  const { data } = useProductsURL();
  const categories = data ? [...new Set(data.map((item) => item.category))] : [];
  
  return (
    <>
      <HeadSection cart={cart} filters={filters} setFilters={setFilters} categories={categories}/>
      <Outlet  context={{cart, setCart, filters, setFilters, categories}}/>
      {/* <Products cart={cart} setCart={setCart} /> */}
      <FooterSection />
    </>
  )
}

export default App
