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
              <span className={`navbar-brand ${isMobile ? 'centered-brand' : 'left-aligned-brand'}`} href="#">
                TrekTech
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
                        Pants
                      </MenuItem>
                      <MenuItem component={NavLink} to="/t_shirts" style={menuItemStyle}>
                        T-Shirts
                      </MenuItem>
                      <MenuItem component={NavLink} to="/shirts" style={menuItemStyle}>
                        Shirts
                      </MenuItem>
                      <MenuItem component={NavLink} to="/hoodies" style={menuItemStyle}>
                        Hoodies
                      </MenuItem>
                    </div>
                  </li>

                  {/* Women Link with Dropdown */}
                  <li className="nav-item dropdown-hover" style={{ position: "relative" }}>
                    <NavLink to="#" className="nav-link hover-bg" style={{ cursor: "pointer" }}>
                      Women
                    </NavLink>
                    <div className="dropdown-content" style={dropdownStyle}>
                      <MenuItem component={NavLink} to="/stitched" style={menuItemStyle}>
                        Stitched
                      </MenuItem>
                      <MenuItem component={NavLink} to="/unstitched" style={menuItemStyle}>
                        Unstitched
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
                    <NavLink to="/pants" onClick={() => setMenuOpen(false)}>
                      Pants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/t_shirts" onClick={() => setMenuOpen(false)}>
                      T-Shirts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shirts" onClick={() => setMenuOpen(false)}>
                      Shirts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/hoodies" onClick={() => setMenuOpen(false)}>
                      Hoodies
                    </NavLink>
                  </li>
                </ul>

                {/* Women Section in Drawer */}
                <h4>Women</h4>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  <li>
                    <NavLink to="/stitched" onClick={() => setMenuOpen(false)}>
                      Stitched
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/unstitched" onClick={() => setMenuOpen(false)}>
                      Unstitched
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
        `}
      </style>
    </>
  );
};

const dropdownStyle = {
  display: "none",
  position: "absolute",
  backgroundColor: "#fff",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  zIndex: 1,
  padding: "15px",
  borderRadius: "8px",
  transition: "all 0.3s ease-in-out",
};

const menuItemStyle = { padding: "10px 20px", cursor: "pointer" };

export default Navbarrer;
