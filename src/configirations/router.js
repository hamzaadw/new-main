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

import Twopiece from '../Screens/catogries/2piece';
import Threepiece from '../Screens/catogries/3piece';
import HouseWear from '../Screens/catogries/house wear';
import Uunstiched from '../Screens/catogries/unstiched';
import ProductDetails from '../Screens/Productdetails';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configirations/firebase';

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

          <Route path="/unstisched" element={<Uunstiched />} />
          <Route path="/two-piece" element={<Twopiece />} />
          <Route path="/three-piece" element={<Threepiece />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/HouseWear" element={<HouseWear />} />

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
