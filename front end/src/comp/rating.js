import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import RatingsContext from './context rating/RatingsContext';

export default function BasicRating({value}) {


  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      
    

      <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />

 
    </Box>
  );
}
