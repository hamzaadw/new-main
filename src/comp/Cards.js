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
                width: 280,
                height: 450,
                borderRadius: '15px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 15px 25px, rgba(0, 0, 0, 0.1) 0px 5px 10px',
                },
            }}>
                <CardActionArea onClick={() => navigate(`/product/${id}`)} sx={{ height: '100%' }}>
                    <div style={{
                        width: '100%',
                        height: 280,
                        overflow: 'hidden',
                        margin: 0,
                        padding: 0,
                        borderRadius: '15px 15px 0 0',
                    }}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt="product image"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <CardContent sx={{ padding: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                sx={{ fontWeight: '500', fontSize: '1rem', color: 'rgba(243, 114, 157, 0.918)' }}
                            >
                                RS. {price}
                            </Typography>
                        
                        </div>
                        <BasicRating value={rating} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
