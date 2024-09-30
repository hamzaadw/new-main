import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { motion } from "framer-motion";
import Account from "../Account";
import CustomButton from "../btn";
import AnchorTemporaryDrawer from "../DrawerCart";
import { auth } from "../../configirations/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbarrer = () => {
  const [IsUser, setIsUser] = useState(false);
  const [Cart, setCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const UserInThere = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        setUserEmail(user.email); // Store user's email
      } else {
        setIsUser(false);
      }
    });
    return UserInThere;
  }, []);

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-11 mx-auto">
            <nav className="navbar navbar-expand-lg bg-body-tertiary nav_bg d-flex justify-content-between align-items-center">
              {isMobile && (
                <IconButton
                  edge="start"
                  className="menu-button"
                  onClick={() => setMenuOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <span className={`navbar-brand ${isMobile ? 'centered-brand' : 'left-aligned-brand'}`} href="#">
                TrekTech
              </span>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {/* Add your NavLinks here */}
                </ul>
              </div>

              <div className="navbar-extra d-flex align-items-center ">
                <motion.div
                  className="cartdiv ms-2"
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <LocalMallIcon onClick={() => setCart(true)} />
                  {Cart && <AnchorTemporaryDrawer setCart={setCart} cart={Cart} />}
                </motion.div>

                {/* Pass userEmail as a prop to Account */}
                {IsUser && <Account userEmail={userEmail} />}
                {!IsUser && <CustomButton className="account-button" />}
              </div>
            </nav>
            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)} sx={{ width: 300 }}>
              {/* Your Drawer content */}
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbarrer;
