import React from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import BasicModal from './Modal';

const ContentCard = ({ title, productId, orderId, orderDate, status, onStatusChange, city, famousPlace, FullName,PhoneNumber, email, FullAddress }) => {


  const [open, setOpen] = React.useState(false);
  return (
    <Card sx={{ display: 'flex', mb: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Product ID: {productId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order ID: {orderId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order Date: {orderDate}
          </Typography>
          <Button style={{marginTop:40}} onClick={()=>setOpen(true)} variant="outlined" sx={{ mt: 2, mb: 2 }}>
            See Details
          </Button>
          <FormControl style={{marginTop:40}} variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={status || 'Pending'} // Default to 'Pending' if status is undefined
              onChange={(e) => onStatusChange(e.target.value)}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>

        </CardContent>
      </Box>

      <BasicModal PhoneNumber={PhoneNumber} famousPlace={famousPlace} email={email} FullAddress={FullAddress}  FullName={FullName} city={city} orderId={orderId} open={open} setOpen={setOpen} />



             
    </Card>
  );
};

export default ContentCard;
