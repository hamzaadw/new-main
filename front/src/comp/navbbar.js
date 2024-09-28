import React, { useState, useEffect } from 'react';
import ComboBox from '../comp/search';
import Navbtns from '../comp/Navbtns';
import CustomButton from '../comp/btn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';  // Menu Icon for mobile
import { motion } from 'framer-motion';
import Account from './Account';
import { auth } from '../configirations/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AnchorTemporaryDrawer from './DrawerCart';
import { Drawer } from '@mui/material';  // MUI Drawer component

function Navbbar() {
  const [IsUser, setIsUser] = useState(false);
  const [Cart, setCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile drawer

  useEffect(() => {
    const UserInThere = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
    return UserInThere;
  }, []);

  return (
    <>
      <div className='nav mt-2'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 mx-auto'>
              <div className='nav-content'>
                {/* Centered Kashmeen title */}
                <h1 className='maintitle'>Kashmeen</h1>

                {/* For large and mid screens: Right-aligned buttons, cart, and login */}
                <div className='right-section'>
                  <Navbtns />  {/* Navigation buttons */}
                  
                  {/* Login button */}
                  {IsUser ? <Account /> : <CustomButton />}
                  
                  {/* Cart icon with animation */}
                  <motion.div
                    className='cartdiv'
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <LocalMallIcon onClick={() => setCart(true)} />
                    {Cart && <AnchorTemporaryDrawer setCart={setCart} cart={Cart} />}
                  </motion.div>

                  {/* Mobile Menu Icon */}
                  <MenuIcon
                    onClick={() => setMenuOpen(true)}
                    className='menu-icon'
                    fontSize='large'
                  />
                </div>
              </div>

              {/* Drawer for mobile menu */}
              <Drawer
                anchor='right'
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                PaperProps={{
                  sx: { width: '70%' },  // 70% drawer width on mobile
                }}
              >
                <Navbtns />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbbar;
