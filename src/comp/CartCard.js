// CartCard.js
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

export default function CartCard({ products, updateTotalPrice, showQuantity = true, showCheckbox = true }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [count, setCount] = React.useState(1);

  const handleCheckbox = (e) => {
    e.stopPropagation(); // Prevent navigation on checkbox click
    const isChecked = e.target.checked;
    setChecked(isChecked);
    
    // Update total price with the selected size
    updateTotalPrice(products.ProductPrice * count, isChecked, {
      ProductId: products.ProductId,
      ProductSize: products.ProductSize, // Add this line to send the selected size
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${products.ProductId}`); // Navigate to product detail page
  };

  return (
    <div className='mt-3 p-2 card-body d-flex align-items-center' style={{ width: '100%' }}>
      {showCheckbox && (
        <Checkbox
          checked={checked}
          onChange={handleCheckbox}
          sx={{
            color: theme.palette.primary.main,
            '&.Mui-checked': {
              color: theme.palette.primary.main,
            },
            mr: 2,
          }}
        />
      )}
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '150px',
          flexWrap: 'wrap',
          cursor: 'pointer', // Add pointer cursor for visual indication
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            height: 'auto',
          },
        }}
        onClick={handleCardClick} // Trigger navigation on card click
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: '220px' },
            height: { xs: 'auto', sm: '150px' },
            objectFit: 'cover'
          }}
          image={products.ProductImage}
          alt="Product image"
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          px: 1,
          '@media (min-width: 600px)': {
            width: 'calc(100% - 220px)',
          },
        }}>
          <CardContent sx={{ flex: '1 0 auto', padding: '8px' }}>
            <Typography component="div" variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: "bold" }}>
              {products.ProductName}
            </Typography>
            <Typography style={{ marginTop: 10 }} variant="subtitle1" color="textPrimary" component="div">
              PKR. {products.ProductPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
            {products.ProductSize && (
              <Typography variant="body2" color="textSecondary" component="div" style={{ marginTop: 5 }}>
                Size: {products.ProductSize}
              </Typography>
            )}
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}
