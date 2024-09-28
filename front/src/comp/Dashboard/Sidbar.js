// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ onMenuClick }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Orders', icon: <ShoppingCartIcon /> },
    { text: 'Products', icon: <InventoryIcon /> },
    { text: 'Customers', icon: <PeopleIcon /> },
    { text: 'Pending', icon: <BarChartIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
          Admin Panel
        </Typography>
        {menuItems.map((item, index) => (

          
          <ListItem button key={index} onClick={() => onMenuClick(item.text)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
