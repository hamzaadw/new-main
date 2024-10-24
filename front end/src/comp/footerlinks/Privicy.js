import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Footer from '../Footer';
import Navbarrer from '../Navbar/Nav';
const PrivacyPolicy = () => {
  return (
    <>
    <Navbarrer/>
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
          <Typography 
            variant="body1" 
            sx={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '20px',
            }}
          >
            Thank you for accessing our website. We respect your privacy and want to protect your personal information. To learn more, please read this Privacy Policy. This Privacy Policy explains how we collect, use, and (under certain conditions) disclose your personal information. By visiting the Site directly or through another site, you accept the practices described in this Policy.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            Data that we collect:
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
            We collect personal information such as your contact information (name, e-mail address, etc.), and billing/shipping information (credit card number, visa card number, shipping address, etc.). We take responsibility for all the personal data that you provide us with, that we obtain when you subscribe to our newsletter or when you create a personal profile.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            How do we use your data?
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
            We use the information that we collect to fulfill our commitments to you and to provide you with the service that you expect. This includes sending you information and offers for marketing purposes. In order to provide you with relevant offers and information, we may analyze your personal data. We will only keep your data for as long as necessary to carry out our services to you or for as long as we are required by law. After this, your personal data will be deleted.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            What information do we need to share with third parties?
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
            ONE may share your data information with third parties or affiliates of ONE who perform services on our behalf or process authorized transactions. The data information we share with these companies to perform services on our behalf is protected via contractual agreements and cannot be shared.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            Your account protection:
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
            While creating an account on our website, you'll be required to provide a personal password. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. ONE reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            Your rights:
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
            You have the right to request access to the personal data which we may hold or process about you. You have the right to require us to correct any incorrect, incomplete, or irrelevant information in your data. At any stage, you also have the right to ask us to stop using your personal data for direct marketing purposes.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            Cookies:
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
            The acceptance of cookies is not a requirement for visiting the Site. However, we would like to point out that the use of the 'basket' functionality on the Site and ordering is only possible with the activation of cookies. A cookie is a small text file that is saved to, and, during subsequent visits, retrieved from your computer or mobile device. ONE uses cookies to enhance and simplify your visit. We do not use cookies to store personal information or to disclose information to third parties.
          </Typography>

          <Typography 
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '10px',
            }}
          >
            General:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#555',
            }}
          >
            We may amend this Privacy Policy at any time by posting the amended terms on this site. By browsing our website, you agree to abide by all our policies, which may be subject to change at any time.
          </Typography>
        </Box>
      </Container>
    </Box>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
