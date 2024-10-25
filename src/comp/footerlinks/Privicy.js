import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Footer from '../Footer';
import Navbarrer from '../Navbar/Nav';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbarrer />
      <Box
        sx={{
          minHeight: '100vh', // Full viewport height
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
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
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
              Privacy Policy
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              Privacy Policy for Wave Thirl
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
              At Wave Thirl, accessible from [www.wavethirl.online](http://www.wavethirl.online), protecting your privacy is a top priority. This Privacy Policy outlines what information we collect and how we use it to provide you with the best possible experience.
              If you have any questions or need more details about our Privacy Policy, feel free to reach out—we’re here to help!
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              General Data Protection Regulation (GDPR)
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              Wave Thirl is the controller of the data you provide. We collect and use your information based on:
              - The need to fulfill a contract with you (like processing your order)
              - Your consent to use your information
              - Our legitimate interest in improving our services
              - Compliance with legal requirements
              We will only keep your personal information for as long as necessary to meet the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our policies.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              Your Data Protection Rights (EEA Residents)
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              If you’re located in the European Economic Area (EEA), you have rights related to your personal information, including:
              - The right to access, update, or delete your information
              - The right to correct any inaccuracies
              - The right to object to certain uses of your data
              - The right to restrict or limit how your data is used
              - The right to data portability
              - The right to withdraw consent at any time
              Need to exercise these rights? Just contact us, and we’ll be happy to assist.
            </Typography>

            {/* Additional sections go here, each structured similarly */}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
