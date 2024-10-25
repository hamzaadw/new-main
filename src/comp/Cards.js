import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BasicRating from './rating';

export default function Cards({ name, price, image, id, rating }) {
    const navigate = useNavigate();
    const [cardStyle, setCardStyle] = useState({ width: '300px', height: 'auto', padding: '0' });
    const [fontSizes, setFontSizes] = useState({
        name: '1.2rem',
        price: '1rem',
    });
    const [imageHeight, setImageHeight] = useState('350px'); // Default image height
    const [ratingSize, setRatingSize] = useState('medium'); // Default size for ratings

    const updateStyles = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 500) {
            setCardStyle({ width: 'calc(50% - 10px)', height: 'auto', padding: '5px' });
            setImageHeight('250px'); // Increase height for small screens
            setFontSizes({ name: '0.9rem', price: '0.8rem' });
            setRatingSize('small'); // Set rating size to small for small screens
        } else if (screenWidth <= 600) {
            setCardStyle({ width: 'calc(50% - 20px)', height: 'auto', padding: '10px' });
            setImageHeight('270px'); // Increase height for medium screens
            setFontSizes({ name: '1rem', price: '0.9rem' });
            setRatingSize('medium'); // Default size for medium screens
        } else {
            setCardStyle({ width: '300px', height: 'auto', padding: '0' });
            setImageHeight('300px'); // Increase height for larger screens
            setFontSizes({ name: '1.2rem', price: '1rem' });
            setRatingSize('medium'); // Default size for larger screens
        }
    };

    useEffect(() => {
        updateStyles();
        window.addEventListener('resize', updateStyles);
        return () => {
            window.removeEventListener('resize', updateStyles);
        };
    }, []);

    return (
        <div style={{ ...cardStyle, margin: '1px' }}> {/* Add margin to create a gap between cards */}
            <Card
                style={{
                    width: '100%',
                    borderRadius: '0px',
                    border: '1px solid #000',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    margin: '4px', // Add margin for spacing between card borders
                }}
            >
                <CardActionArea
                    onClick={() => navigate(`/product/${id}`)}
                    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: imageHeight,
                            overflow: 'hidden',
                            borderBottom: '1px solid black', // Black line below the image
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={image}
                            alt="product image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        />
                    </div>
                    <CardContent
                        style={{
                            padding: '8px', // Minimal padding for text alignment
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start', // Align content to the left
                            gap: '4px', // Small gap between text elements
                        }}
                    >
                        <Typography
                            variant="h6"
                            style={{
                                fontWeight: '300',
                                fontSize: fontSizes.name,
                                color: '#333',
                                fontFamily: 'Arial, sans-serif',
                                margin: '0', // Remove any external margins
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                fontWeight: '300',
                                fontSize: fontSizes.price,
                                color: 'rgba(243, 114, 157, 0.918)',
                                margin: '0',
                            }}
                        >
                            RS. {price}
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <BasicRating value={rating} size={ratingSize} /> {/* Use ratingSize for responsive size */}
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
