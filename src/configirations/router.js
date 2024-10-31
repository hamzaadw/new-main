import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Shop from '../Screens/Shop';
import Cart from '../Screens/Cart';
import Login from '../Screens/Login';
import Contactus from '../Screens/Contactus';
import Signup from '../Screens/Signup';
import AddItems from '../Screens/AddItems';
import Dashboard from '../Screens/Dashbord';
import Myorders from '../Screens/Myorders';

import Pant from '../Screens/catogries/Pant';
import Hoodies from '../Screens/catogries/Hoodies';
import T_shirt from '../Screens/catogries/T_shirt';
import Shirt from '../Screens/catogries/Shirts';

import ForgotPassword from '../Screens/Forgotpass';
import CanceledOrdersPage from '../comp/Dashboard/Cancelorderpage';
import ProductDetails from '../Screens/Productdetails';
import CanceledOrders from '../Screens/CancelOrders';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configirations/firebase';


import AboutUs from '../comp/footerlinks/Aboutus';
import PrivacyPolicy from '../comp/footerlinks/Privicy';
import Exchange from '../comp/footerlinks/Exchnage';
import Shipping_policy from '../comp/footerlinks/Shipping policy';

import WShirt from '../Screens/catogries/Wshirts';
import Wpants from '../Screens/catogries/Wpants';
import WomenT_shirts from '../Screens/catogries/WT_shirts';
import Whoodies from '../Screens/catogries/Whoodies';

function Router() {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set user's email when logged in
      } else {
        setUserEmail(null); // Reset email when logged out
      }
      setLoading(false); // Loading finished
    });

    return () => unsubscribe();
  }, []);

  // Function to check if the user is the admin
  const isAdmin = userEmail === 'admin221@gmail.com';

  // Show loading screen while checking auth state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or custom loader
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Myorders" element={<Myorders />} />
          <Route path="/canceledOrders" element={<CanceledOrders />} />
          <Route path="/canceled-orders" element={<CanceledOrdersPage />} />


          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/Exchange" element={<Exchange />} />
          <Route path="/Shipping-policy" element={<Shipping_policy />} />
         
   
          <Route path="/WPants" element={<Wpants />} />
          <Route path="/Wshirts" element={<WShirt />} />
          <Route path="/WT_shirts" element={<WomenT_shirts />} />
          <Route path="/WHoodies" element={<Whoodies />} />


          <Route path="/T_shirts" element={<T_shirt />} />
          <Route path="/Pants" element={<Pant />} />
          <Route path="/Hoodies" element={<Hoodies />} />
          <Route path="/shirts" element={<Shirt />} />
   

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
  

          {/* Protected Routes for Admin */}
          <Route 
            path="/additems" 
            element={isAdmin ? <AddItems /> : <Navigate to="/" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAdmin ? <Dashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
