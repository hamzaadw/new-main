import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Navbarrer from '../Navbar/Nav';
import Footer from '../Footer';

const Exchange = () => {
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
                                fontFamily: 'Lemon/Milk light, sans-serif', // Use a custom font
                                color: '#333',
                                marginBottom: '20px',
                            }}
                        >
                            Exchange & Return Policy
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
                            **Can I Exchange or Return My Items?**

                            At Wave Thirl, we want you to love your purchase! If something isn’t right, don’t worry—we’re here to help. You can exchange or return any product within 7 days of purchase under the following conditions:

                            - The item is faulty, damaged, or defective upon delivery.
                            - The item doesn’t match the original specifications or isn’t the same as what you ordered.
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Lemon/Milk light, sans-serif',
                                color: '#333',
                                marginTop: '20px',
                            }}
                        >
                            How to Raise a Dispute:
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
                            If you notice any issues with your order, please contact us within 3 days of receiving the item. You can reach out to us via WhatsApp no. 03141232633 or send us a message on Instagram or Facebook (@wavethirl).

                            Each case will be handled individually to make sure you get the best possible solution.
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Lemon/Milk light, sans-serif',
                                color: '#333',
                                marginTop: '20px',
                            }}
                        >
                            For Exchanges:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.2rem',
                                lineHeight: '1.8',
                                color: '#555',
                                marginBottom: '10px',
                            }}
                        >
                            If your item is damaged or defective, we’ll be happy to send a replacement. Just email us a photo of the faulty item within 7 days of your purchase. Once approved, we'll process your exchange as soon as we receive the item back.
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Lemon/Milk light, sans-serif',
                                color: '#333',
                                marginTop: '20px',
                            }}
                        >
                            For Refunds:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.2rem',
                                lineHeight: '1.8',
                                color: '#555',
                                marginBottom: '10px',
                            }}
                        >
                            If you’d prefer a refund instead of an exchange, no problem! As long as the item meets the conditions above, we’ll issue a refund after reviewing your case.
                        </Typography>

                        {/* Other sections similarly structured */}
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Exchange;
