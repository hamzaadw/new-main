import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-11 mx-auto">
            <nav className="navbar navbar-expand-lg bg-body-tertiary nav_bg d-flex justify-content-between align-items-center">
              {/* Menu Icon - Positioned on the Left */}
              {isMobile && (
                <IconButton
                  edge="start"
                  className="menu-button"
                  onClick={() => setMenuOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* TrekTech Brand - Centered or Left-Aligned */}
              <span className={`navbar-brand ${isMobile ? 'centered-brand' : 'left-aligned-brand'}`} href="#">
                TrekTech
              </span>

              {/* Nav Links (collapsed on small screens) */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link hover-bg">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/unstisched" className="nav-link hover-bg">
                      Unstiched
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/two-piece" className="nav-link hover-bg">
                      Two Piece
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/three-piece" className="nav-link hover-bg">
                      Three Piece
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/HouseWear" className="nav-link hover-bg">
                      House Wear
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Wrapper for Account and Cart Icon */}
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
                  {Cart && (
                    <AnchorTemporaryDrawer setCart={setCart} cart={Cart} />
                  )}
                </motion.div>
                {IsUser ? <Account className="account-button" /> : <CustomButton className="account-button" />}
              </div>
            </nav>

            {/* Drawer (menu) - Opens from the Left */}
            <Drawer
              anchor="left"
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              sx={{ width: 300 }} // Adjust width as needed
            >
              <div
                style={{
                  padding: '40px',
                  paddingRight:"100px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  height: '100%',
                }}
              >
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, width: '100%' }}>
                  {['Home', 'Services', 'About', 'Contacts'].map((text) => (
                    <li key={text} style={{ marginBottom: '15px' }}>
                      <NavLink
                        to="/"
                        style={{
                          textDecoration: 'none',
                          color: '#000', // Change color as needed
                          fontSize: '18px', // Adjust font size as needed
                          display: 'block',
                          transition: 'color 0.3s ease',
                        }}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(193, 0, 64)')} // Change color on hover
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#000')} // Revert color on leave
                      >
                        {text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbarrer;
