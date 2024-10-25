import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Navbarrer from '../Navbar/Nav';
import Footer from '../Footer';

const ShippingPolicy = () => {
  return (
    <>
      <Navbarrer />
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
                fontFamily: 'Lemon/Milk light, sans-serif', // Custom font
                color: '#333',
                marginBottom: '20px',
              }}
            >
              Shipping Policy
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              Where Can I Receive My Order?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#555',
                marginBottom: '20px',
              }}
            >
              You can have your order delivered right to your doorstep—whether it's your home, office, or any other private address. However, we don’t deliver to P.O. boxes.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              How Fast Will My Order Arrive?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              At Wave Thirl, we pride ourselves on speedy delivery! Your order will arrive within **one day of purchase**, so you won’t have to wait long. Orders placed on weekends or public holidays will be processed the next working day.
              <br /><br />
              *During busy periods or sales, slight delays may occur, but we’ll always keep you informed about your order’s progress.*
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              How Much is Shipping?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              We offer a flat shipping fee of just **PKR 100** for all orders, no matter the size, within Pakistan.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              Which Courier Will Deliver My Order?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              We’ll choose the best courier based on your location to ensure quick and safe delivery. Once your order is shipped, you’ll receive an email with all the tracking details (don’t forget to check your spam/junk folder!).
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              What If I'm Not Home When My Order Arrives?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              No worries! The courier will contact you for confirmation. If you miss the first delivery attempt, they’ll try again twice. If the order still can’t be delivered, it will be returned to us.
            </Typography>

          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
