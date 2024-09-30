import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

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


import { onAuthStateChanged } from 'firebase/auth'; // Import from Firebase
import { auth } from '../configirations/firebase'; // Firebase configuration
function Router() {



  const [userEmail, setUserEmail] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set user's email when logged in
      } else {
        setUserEmail(null); // Reset email when logged out
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Function to check if the user is the admin
  const isAdmin = userEmail === 'admin221@gmail.com';




  return (
    <>
      
      <BrowserRouter>
      <Routes>
<Route path='/' element={<Shop/>} />
{/* <Route path='/additems' element={<AddItems/>} /> */}
<Route path='/login' element={<Login />} />
<Route path='/Cart' element={<Cart />} />
<Route path='/contactus' element={<Contactus />} />
<Route path='/signup' element={<Signup />} />
<Route path='/Myorders' element={<Myorders />} />
{/* <Route path='/dashboard' element={<Dashboard />} /> */}


<Route path='/unstisched' element={<Uunstiched />} />
<Route path='/two-piece' element={<Twopiece />} />
<Route path='/three-piece' element={<Threepiece />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path='/HouseWear' element={<HouseWear />} />



 {/* Protected Routes for Admin */}
 <Route 
          path='/additems' 
          element={isAdmin ? <AddItems /> : <Navigate to="/" />} 
        />
        <Route 
          path='/dashboard' 
          element={isAdmin ? <Dashboard /> : <Navigate to="/" />} 
        />



      </Routes>
      </BrowserRouter>



    </>
  )
}

export default Router
