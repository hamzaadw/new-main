import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Box } from '@mui/material';

const ProductCard = ({ title, id, category, imageUrl, onDelete }) => {
  return (
    <Card style={{ marginBottom: 40, display: 'flex', alignItems: 'center' }}>
      <CardMedia
        component="img"
        alt={title}
        height="200"

        image={imageUrl}
        style={{ width: 200, marginRight: 16 , padding:15}}
      />
      <CardContent style={{ flex: 1 }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          ID: {id}
        </Typography>
        <Typography variant="body2">
          Category: {category}
        </Typography>
      </CardContent>
      <Box sx={{ padding: 2 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
