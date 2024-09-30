import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { auth } from '../configirations/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';

function Account({ userEmail }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState(null);

  // Listen to auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      handleClose();
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <>
      <div>
        <IconButton onClick={handleClick}>
          <Avatar 
            src={user?.photoURL || ''} 
            alt="Account Picture" 
            sx={{ width: 40, height:40, borderRadius: '50%' }} 
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <NavLink style={{ textDecoration: "none", color: "black" }} to="/myorders">
            <MenuItem>My Orders</MenuItem>
          </NavLink>

          {/* Only show Dashboard and Add Items if the email is admin221 */}
          {userEmail === "admin221@gmail.com" && (
            <>
              <MenuItem onClick={handleClose}>
                <NavLink to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/additems" style={{ textDecoration: "none", color: "inherit" }}>
                  Add Items
                </NavLink>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}

export default Account;
