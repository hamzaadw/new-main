import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BasicRating from './rating';
import "./animations.css";

export default function Cards({ name, price, image, id, rating }) {
    const navigate = useNavigate();  // Hook for navigation

    return (
        <div style={{ marginTop: -30, marginBottom: 60 }} className='animation'>
            <Card sx={{
                marginLeft: 2,
                width: 300,
                height: 'auto',
                borderRadius: '0px', // Changed to sharp corners
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Slightly darker shadow for depth
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 20px 40px, rgba(0, 0, 0, 0.2) 0px 10px 20px',
                },
            }}>
                <CardActionArea onClick={() => navigate(`/product/${id}`)} sx={{ height: '100%' }}>
                    <div style={{
                        width: '100%',
                        height: 250, // Adjusted height for a better aspect ratio
                        overflow: 'hidden',
                        borderRadius: '0px 0px 0 0', // Keep the corners sharp
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
                                    transform: 'scale(1.1)', // Adds a zoom effect on hover
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
                                    fontWeight: '700', // Bolder font weight
                                    fontSize: '1.5rem', // Increased font size
                                    color: '#333', // Darker text for better contrast
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
                                    fontWeight: '600', // Increased font weight
                                    fontSize: '1.3rem', // Increased font size
                                    color: 'rgba(243, 114, 157, 0.918)',
                                    marginBottom: '10px', // Space below the price
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
                                    fontSize: '1rem', // Increased font size for better readability
                                    color: '#666', // Slightly lighter color
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
