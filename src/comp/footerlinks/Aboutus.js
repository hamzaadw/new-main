import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Navbarrer from '../Navbar/Nav';
import Footer from '../Footer';

const AboutUs = () => {
  return (
    <>
      <Navbarrer />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: '20px', md: '40px' }, // Responsive padding
          bgcolor: '#f5f5f5' // Light background color for contrast
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              background: '#fff',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              padding: { xs: '20px', md: '40px' },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Lemon/Milk light, sans-serif',
                color: '#333',
                mb: 3,
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: '1.8',
                color: '#555',
                mb: 2,
              }}
            >
              Welcome to Wave Thirl, where style meets comfort! We’re thrilled to bring you high-quality, trendy clothing that’s designed to help you look and feel your best every day.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: '1.8',
                color: '#555',
                mb: 2,
              }}
            >
              Wave Thirl was created with a vision to make fashion accessible, fun, and effortlessly cool. Our collection is all about blending style and comfort in a way that’s both practical and eye-catching.
            </Typography>
            <Box sx={{ textAlign: 'left', mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                Why Choose Us?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: '1.8',
                  color: '#555',
                  mb: 2,
                }}
              >
                At Wave Thirl, we’re committed to delivering premium clothing that speaks to your unique vibe. Our clothing line focuses on quality materials and designs that keep up with the latest trends without sacrificing comfort.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: '1.8',
                  color: '#555',
                }}
              >
                Plus, we believe in keeping things simple with hassle-free returns and exchanges, ensuring that you’re completely happy with every purchase.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'left', mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                Join the Wave!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: '1.8',
                  color: '#555',
                }}
              >
                Wave Thirl isn’t just a brand—it’s a community of people who value self-expression, creativity, and authenticity.
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: 'rgba(243, 114, 157, 0.918)',
                mt: 3,
              }}
            >
              Let’s Make Waves Together!
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AboutUs;
