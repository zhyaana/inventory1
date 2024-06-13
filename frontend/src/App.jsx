import React , {createContext, useEffect, useState} from 'react'
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Customers from "./pages/Customers"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import OrderList from './pages/OrderList'
import Modal from './components/product modals/Modal'
import axios from 'axios'
import Pagination from './components/Pagination'
import Invoice from './components/product modals/Invoice'
export const CategoryContext = createContext("")
export const ProductContext = createContext("")
const App = () => {
  const [isCategoryUpdated , setIsCategoryUpdated] = useState({count:0 , categories:[]})
  const [isProductsUpadted , setIsProductsUpdated] = useState([])
  const [notRemainedProducts , setNotRemainedProducts] = useState([])
  console.log(isProductsUpadted)
  useEffect(() => {
    axios.get("http://localhost:5555/Categories")
        .then(response => {
            setIsCategoryUpdated({count: response.data.data.length , categories :response.data.data})
        })
        .catch((err) => {
            console.log("Error getting categoris" + err)
        })
}, []);
useEffect(() => {
  axios.get("http://localhost:5555/products")
      .then(response => {
        const remainedProducts = response.data.data.filter(product=>{
          return product.stockquantity !==0;
        }) 
        const notRemained = response.data.data.filter(product=>{
          return product.stockquantity ===0;
        })
        setIsProductsUpdated(remainedProducts)
        setNotRemainedProducts(notRemained)
          // console.log(response.data.data)
      })
      .catch((err) => {
          console.log("Error getting products" + err)
      })
}, [])
  return (
    <CategoryContext.Provider value={{isCategoryUpdated , setIsCategoryUpdated}}>
    <ProductContext.Provider value={{isProductsUpadted , setIsProductsUpdated , notRemainedProducts , setNotRemainedProducts}}>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/customers' element={<Customers/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/orderlist' element={<OrderList/>}/>
   </Routes>
   </ProductContext.Provider>
   </CategoryContext.Provider>
  )
}

export default App
