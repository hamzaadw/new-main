import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import React Icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from "../images/Black and White Man Clothes Logo (1).png"

const Footer = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 100%)', // Gradient background
        color: '#333', // Dark text for better readability
        padding: '40px 20px', // Increased padding for height
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', // Box shadow for depth
        marginTop:10,
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        {/* Company Name Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            <img style={{width:40, marginRight:15}} src={logo} ></img>
           Wave Thril
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>
            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Products
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            onClick={() => navigate('/Pants')}
          >
            Men-Pants
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            onClick={() => navigate('/Hoodies')}
          >
            Hoodies
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            onClick={() => navigate('/T_shirts')}
          >
            T-Shirts
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            onClick={() => navigate('/shirts')}
          >
            Shirts
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            onClick={() => navigate('/Stitched')}
          >
            Women Unstitched Cloths
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            onClick={() => navigate('/Unstitched')}
          >
            Women Stitched Cloths
          </Typography>
        </Grid>

        {/* Useful Links Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Useful Links
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
            
          >
            Pricing
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
         
          >
            Settings
          </Typography>
          <Typography 
            sx={{ cursor: 'pointer', marginBottom: '5px' }} 
          
          >
            Orders
          </Typography>
  
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '5px' }}>
            Email: <span style={{ cursor: 'pointer', color: '#333' }} onClick={() => window.location.href = 'mailto:Hamzaasadabcd@gmail.com'}>Hamzaasadabcd@gmail.com</span>
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '5px' }}>
            Phone: +01 234 567 88
          </Typography>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <IconButton 
          aria-label="facebook" 
          sx={{ color: '#333', margin: '0 5px', transition: 'transform 0.2s' }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaFacebookF />
        </IconButton>
        <IconButton 
          aria-label="twitter" 
          sx={{ color: '#333', margin: '0 5px', transition: 'transform 0.2s' }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaTwitter />
        </IconButton>
        <IconButton 
          aria-label="instagram" 
          sx={{ color: '#333', margin: '0 5px', transition: 'transform 0.2s' }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaInstagram />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
