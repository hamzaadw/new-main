import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Drawer, IconButton, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { motion } from "framer-motion";
import Account from "../Account";
import CustomButton from "../btn";
import AnchorTemporaryDrawer from "../DrawerCart";
import { auth } from "../../configirations/firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../../images/Black and White Man Clothes Logo (1).png"


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
              <span
                className="navbar-brand"
                style={{
                  flexGrow: 1, // Allow the brand to take available space
                  display: 'flex', // Use flexbox
                  justifyContent: isMobile ? 'center' : 'flex-start', // Center content horizontally or align left based on screen size
                  textAlign: 'center' // Center text
                }}
              >
                <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <img style={{width:30}} src={logo}></img>

                  Wave Thril
                </NavLink>
              </span>

              {/* Nav Links (collapsed on small screens) */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {/* Men Link with Dropdown */}
                  <NavLink to="/" className="nav-link hover-bg" style={{ cursor: "pointer" }}>
                    Home
                  </NavLink>
                  <li className="nav-item dropdown-hover" style={{ position: "relative" }}>
                    <NavLink to="#" className="nav-link hover-bg" style={{ cursor: "pointer" }}>
                      Men
                    </NavLink>
                    <div className="dropdown-content" style={dropdownStyle}>
                      <MenuItem component={NavLink} to="/pants" style={menuItemStyle}>
                        <span className="dropdown-text">Pants</span>
                      </MenuItem>
                      <MenuItem component={NavLink} to="/t_shirts" style={menuItemStyle}>
                        <span className="dropdown-text">T-Shirts</span>
                      </MenuItem>
                      <MenuItem component={NavLink} to="/shirts" style={menuItemStyle}>
                        <span className="dropdown-text">Shirts</span>
                      </MenuItem>
                      <MenuItem component={NavLink} to="/hoodies" style={menuItemStyle}>
                        <span className="dropdown-text">Hoodies</span>
                      </MenuItem>
                    </div>
                  </li>

                  {/* Women Link with Dropdown */}
                 {/* Women Link with Dropdown */}
<li className="nav-item dropdown-hover" style={{ position: "relative" }}>
  <NavLink to="#" className="nav-link hover-bg" style={{ cursor: "pointer" }}>
    Women
  </NavLink>
  <div className="dropdown-content" style={dropdownStyle}>
    <MenuItem component={NavLink} to="/Wpants" style={menuItemStyle}>
      <span className="dropdown-text">Women Pants</span>
    </MenuItem>
    <MenuItem component={NavLink} to="/Wt_shirts" style={menuItemStyle}>
      <span className="dropdown-text">Women T-Shirts</span>
    </MenuItem>
    <MenuItem component={NavLink} to="/Wshirts" style={menuItemStyle}>
      <span className="dropdown-text">Women Shirts</span>
    </MenuItem>
    <MenuItem component={NavLink} to="/Whoodies" style={menuItemStyle}>
      <span className="dropdown-text">Women Hoodies</span>
    </MenuItem>
  </div>
</li>

                </ul>
              </div>

              {/* Wrapper for Account and Cart Icon */}
              <div className="navbar-extra d-flex align-items-center">
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

                {/* Conditionally render the image or Account button based on email */}
                {IsUser && <Account userEmail={userEmail} />}
                {!IsUser && <CustomButton className="account-button" />}
              </div>
            </nav>

            {/* Drawer (menu) - Opens from the Left for Mobile */}
            <Drawer
              anchor="left"
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              sx={{ width: 300 }} // Adjust width as needed
            >
              <div
                style={{
                  padding: "40px",
                  paddingRight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  height: "100%",
                }}
              >
                {/* Men Section in Drawer */}
                <h4>Men</h4>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  <li>
                    <NavLink to="/pants" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
                      Pants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/t_shirts" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
                      T-Shirts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shirts" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
                      Shirts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/hoodies" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
                      Hoodies
                    </NavLink>
                  </li>
                </ul>

                {/* Women Section in Drawer */}
           {/* Women Section in Drawer */}
<h4>Women</h4>
<ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
  <li>
    <NavLink to="/Wpants" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
      Women Pants
    </NavLink>
  </li>
  <li>
    <NavLink to="/Wt_shirts" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
      Women T-Shirts
    </NavLink>
  </li>
  <li>
    <NavLink to="/Wshirts" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
      Women Shirts
    </NavLink>
  </li>
  <li>
    <NavLink to="/Whoodies" onClick={() => setMenuOpen(false)} className="drawer-menu-item">
      Women Hoodies
    </NavLink>
  </li>
</ul>

              </div>
            </Drawer>
          </div>
        </div>
      </div>

      {/* Inline CSS to handle hover display */}
      <style>
        {`
          .nav-item:hover .dropdown-content {
            display: block !important;
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .dropdown-content {
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease-in-out;
          }
          .nav-link:hover {
            color: rgba(243, 114, 157, 0.918);
            transition: color 0.3s ease-in-out;
          }
          .dropdown-text {
            font-size: 0.875rem; /* Adjust font size for small text */
            color: black; /* Default text color */
            text-decoration: none; /* Remove underline */
            transition: color 0.3s ease-in-out, text-decoration 0.3s ease-in-out;
          }
          .dropdown-text:hover {
            color: rgba(243, 114, 157, 0.918); /* Change color on hover */
            text-decoration: underline; /* Add underline on hover */
          }
          .drawer-menu-item {
            color: black; /* Default text color */
            text-decoration: none; /* Remove underline */
            padding: 10px 0; /* Add vertical padding */
            transition: color 0.3s ease-in-out;
          }
          .drawer-menu-item:hover {
            color: rgba(243, 114, 157, 0.918); /* Change color on hover */
          }
        `}
      </style>
    </>
  );
};

// CSS styles for the dropdown and menu items
const dropdownStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  zIndex: 10,
  padding: '10px 0',
  display: 'none', // Initially hidden
};

const menuItemStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
};

export default Navbarrer;
