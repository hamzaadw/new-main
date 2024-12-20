import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({ value }) {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="half-rating-read"
        defaultValue={value}
        precision={0.5}
        readOnly
        sx={{ fontSize: '20px' }} // Set font size for smaller stars
      />
    </Box>
  );
}
