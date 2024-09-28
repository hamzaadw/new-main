import React from 'react';
import Button from '@mui/material/Button';
import { motion } from "framer-motion";
import { NavLink, useNavigate } from 'react-router-dom';

const CustomButton = () => {




  return (


      <div className='d-flex' style={{marginTop:10}}>
    <motion.div 
    initial={{ x: -50 }}
    animate={{ x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    >
<NavLink to="/login" >
    <Button
 
      variant="outlined"
      color="error"
      sx={{
        color: 'black', 
        borderColor: 'black', 
        '&:hover': {
          color: 'rgba(243, 114, 157, 0.918)',
          borderColor: 'rgba(243, 114, 157, 0.918)',
        },
      }}
    >
      Login
    </Button>
    </NavLink>
    
    </motion.div>
    </div>
  );
};

export default CustomButton;