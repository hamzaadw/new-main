// src/components/CanceledOrdersPage.js
import React from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';

const CanceledOrdersPage = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 500, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Canceled Orders
          </Typography>
          <Typography variant="body1" paragraph>
            This is a summary of all the canceled orders in the system.
          </Typography>
          <Typography variant="body1" paragraph>
            You can view detailed information for each order, including the reason for cancellation.
          </Typography>
          <Typography variant="body1" paragraph>
            Make sure to address these issues promptly to improve customer satisfaction.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CanceledOrdersPage;
