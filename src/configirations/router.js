import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Shop from '../Screens/Shop'
import Cart from '../Screens/Cart'
import Login from '../Screens/Login'
import Contactus from '../Screens/Contactus'
import Signup from '../Screens/Signup'
import AddItems from '../Screens/AddItems'
import Dashboard from '../Screens/Dashbord'
import Checkout from '../comp/Dashboard/Cheakout/Checkout'
import Myorders from '../Screens/Myorders'


import Twopiece from '../Screens/catogries/2piece'
import Threepiece from '../Screens/catogries/3piece'
import HouseWear from '../Screens/catogries/house wear'
import Uunstiched from '../Screens/catogries/unstiched'
import ProductDetails from '../Screens/Productdetails'
function Router() {
  return (
    <>
      
      <BrowserRouter>
      <Routes>
<Route path='/' element={<Shop/>} />
<Route path='/additems' element={<AddItems/>} />
<Route path='/login' element={<Login />} />
<Route path='/Cart' element={<Cart />} />
<Route path='/contactus' element={<Contactus />} />
<Route path='/signup' element={<Signup />} />
<Route path='/Myorders' element={<Myorders />} />
<Route path='/dashboard' element={<Dashboard />} />


<Route path='/unstisched' element={<Uunstiched />} />
<Route path='/two-piece' element={<Twopiece />} />
<Route path='/three-piece' element={<Threepiece />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path='/HouseWear' element={<HouseWear />} />

      </Routes>
      </BrowserRouter>



    </>
  )
}

export default Router
