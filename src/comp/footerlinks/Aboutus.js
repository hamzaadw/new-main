import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Navbarrer from '../Navbar/Nav';
import Footer from '../Footer';
const AboutUs = () => {
  return (
    <>
        <Navbarrer/>
    <Box
      sx={{
       
        minHeight: '100vh', // Full height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <Container maxWidth="md">
        <Box 
          sx={{
            background: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Lemon/Milk light, sans-serif', // Use a custom font
              color: '#333',
              marginBottom: '20px',
            }}
          >
            About Us
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#555', // Softer color for better readability
              marginBottom: '10px',
            }}
          >
            ONE is one of the largest fashion retail brands in Pakistan with its headquarters in Lahore.
            It was founded in 2016 and has 42 shops spanning nationwide.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#555',
              marginTop: '20px',
            }}
          >
            We master in producing high-end fashion, making trends accessible to all. The brand offers contemporary designs that fulfill the basic fashion needs of the masses. 
            Our aim is to provide our customers with unique styles that drive confidence and boost their self-esteem.
          </Typography>
        </Box>
      </Container>
      </Box>
<Footer/>
    </>
  );
};

export default AboutUs;
