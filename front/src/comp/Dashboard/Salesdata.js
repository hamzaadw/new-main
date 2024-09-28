// src/components/Dashboard.js
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4">$12,345</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">124</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Customers</Typography>
            <Typography variant="h4">95</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">$8,765</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
