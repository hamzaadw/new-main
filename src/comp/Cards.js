import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BasicRating from './rating';

export default function Cards({ name, price, image, id, rating }) {
    const navigate = useNavigate();  // Hook for navigation

    return (
        <div
            className='animation'
            style={{
                width: '300px',  // Default for larger screens
                margin: '10px',  // Consistent margin
                display: 'inline-block',
                verticalAlign: 'top',  // Align side by side
                '@media (max-width: 768px)': { // Adjust for tablet screens
                    width: 'calc(50% - 10px)', // Two cards per row
                },
                '@media (max-width: 500px)': { // Adjust for small screens
                    width: 'calc(50% - 10px)', // Two cards per row
                    margin: '5px',  // Reduce margins for small screens
                },
                '@media (max-width: 400px)': { // Adjust for very small screens
                    width: 'calc(50% - 10px)', // Two cards per row, reduced size
                    margin: '5px auto',  // Centered with reduced margin
                },
            }}
        >
            <Card sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '15px', // Rounded corners
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Shadow
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 20px 40px, rgba(0, 0, 0, 0.2) 0px 10px 20px',
                },
                '@media (max-width: 500px)': {
                    borderRadius: '10px', // Smaller rounded corners
                },
                '@media (max-width: 400px)': { // Adjustments for very small screens
                    borderRadius: '8px', // Even smaller rounded corners
                    width: '90%', // Reduce width slightly
                },
            }}>
                <CardActionArea onClick={() => navigate(`/product/${id}`)} sx={{ height: '100%' }}>
                    <div style={{
                        width: '100%',
                        height: 200, // Adjust height for smaller screens
                        overflow: 'hidden',
                        borderRadius: '15px 15px 0 0', // Rounded top corners
                        '@media (max-width: 500px)': {
                            borderRadius: '10px 10px 0 0',
                        },
                        '@media (max-width: 400px)': {
                            borderRadius: '8px 8px 0 0', // Adjusted corners for small screens
                        },
                    }}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt="product image"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)', // Zoom effect
                                },
                            }}
                        />
                    </div>
                    <CardContent sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '1.5rem',
                                    color: '#333',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                sx={{
                                    fontWeight: '600',
                                    fontSize: '1.3rem',
                                    color: 'rgba(243, 114, 157, 0.918)',
                                    marginBottom: '10px',
                                }}
                            >
                                RS. {price}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <BasicRating value={rating} />
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    marginLeft: '5px',
                                    fontSize: '1rem',
                                    color: '#666',
                                    fontStyle: 'italic',
                                }}
                            >
                                {rating} Stars
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
