import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AnnouncementBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000', // Dark background color
        color: '#fff', // White text color
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'marquee 15s linear infinite',
          paddingLeft: '50%', // Start from center
          transform: 'translateX(-50%)', // Center the text
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          Every Purchase, 30% for Palestine 🌍💚 • Enjoy Free Shipping Across Pakistan 🚚🇵🇰 • Free Returns & Exchanges—Shop Worry-Free! ↩️
        </Typography>
      </Box>

      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default AnnouncementBar;
