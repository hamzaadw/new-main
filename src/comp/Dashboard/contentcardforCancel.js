import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ContentCard = ({
  id,
  title,
  productName,
  productPrice,
  productSize,
  orderId,
  orderDate,
  status,
  city,
  famousPlace,
  PhoneNumber,
  FullName,
  email,
  FullAddress,
  onStatusChange
}) => {
  return (
    <Card sx={{ margin: 2, padding: 2, width: '90%' }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">Product Name: {productName}</Typography>
        <Typography variant="body1">Product Price: {productPrice}</Typography>
        <Typography variant="body1">Product Size: {productSize}</Typography>
        <Typography variant="body1">Order ID: {orderId}</Typography>
        <Typography variant="body1">Order Date: {orderDate}</Typography>
        <Typography variant="body1">Status: {status}</Typography>
        <Typography variant="body1">City: {city}</Typography>
        <Typography variant="body1">Famous Place: {famousPlace}</Typography>
        <Typography variant="body1">Full Address: {FullAddress}</Typography>
        <Typography variant="body1">Full Name: {FullName}</Typography>
        <Typography variant="body1">Email: {email}</Typography>
        <Typography variant="body1">Phone Number: {PhoneNumber}</Typography>

        <Button 
          variant="outlined" 
          onClick={() => onStatusChange(status === 'canceled' ? 'Pending' : 'canceled')}
          sx={{ marginTop: 2 }}
        >
          Change Status
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
