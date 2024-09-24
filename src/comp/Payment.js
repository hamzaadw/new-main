import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Typography } from '@mui/material';

const PaymentMethods = ({getselectedpaymentmethod}) => {
  const [selectedPayment, setSelectedPayment] = useState('Cash on delivery');

  const handlePaymentChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPayment(selectedValue);

    getselectedpaymentmethod(selectedValue)
  };

  return (
    <Box 
      sx={{
        padding: '1rem',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel 
          component="legend"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Payment Method
        </FormLabel>
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={selectedPayment}
          onChange={handlePaymentChange}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            value="cod"
            control={<Radio sx={{ color: '#f3729d', '&.Mui-checked': { color: '#f3729d' } }} />}
            label="Cash on Delivery"
            sx={{
              background: 'transparent',
              padding: '10px 20px',
              borderRadius: '8px',
              margin: '0.5rem 0',
              width: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.03)',
              },
              '& .MuiTypography-root': {
                fontWeight: 'bold',
                fontFamily: 'Roboto, sans-serif',
              }
            }}
          />
          {selectedPayment === 'cod' && (
            <Typography 
              sx={{
                fontSize: '0.875rem',
                color: '#666',
                textAlign: 'center',
                marginTop: '0.5rem',
              }}
            >
              Pay with cash upon delivery.
            </Typography>
          )}
          
          <FormControlLabel
            value="easypaisa"
            control={<Radio sx={{ color: '#f3729d', '&.Mui-checked': { color: '#f3729d' } }} />}
            label="Easypaisa"
            sx={{
              background: 'transparent',
              padding: '10px 20px',
              borderRadius: '8px',
              margin: '0.5rem 0',
              width: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.03)',
              },
              '& .MuiTypography-root': {
                fontWeight: 'bold',
                fontFamily: 'Roboto, sans-serif',
              }
            }}
          />
          {selectedPayment === 'easypaisa' && (
            <Typography 
              sx={{
                fontSize: '0.875rem',
                color: '#666',
                textAlign: 'center',
                marginTop: '0.5rem',
              }}
            >
              Pay securely using Easypaisa.
            </Typography>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default PaymentMethods;
