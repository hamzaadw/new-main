import React from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import SalesAnalytics from '../comp/Dashboard/Salesdata';
import Sidebar from '../comp/Dashboard/Sidbar';
import Home from '../comp/Dashboard/Home';
const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
    >
      <Toolbar />
      
    
      <Sidebar/>
      <Home/>
      {/* Add more components here */}
    </Box>
  );
};

export default Dashboard;
