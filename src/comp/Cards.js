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
    const [cardStyle, setCardStyle] = useState({ width: '300px', margin: '10px', height: 'auto' });
    const [fontSizes, setFontSizes] = useState({
        name: '1.5rem',
        price: '1.3rem',
        rating: '1rem',
    });
    const [imageHeight, setImageHeight] = useState('200px');

    // Function to update the card style and font size based on window width
    const updateStyles = () => {
        const screenWidth = window.innerWidth;

        // Update card style
        if (screenWidth <= 500) {  
            setCardStyle({ width: 'calc(100% - 150px)', margin: '5px', height: '300px' }); // Full width for small screens
            setImageHeight('150px'); // Reduce the image height for small screens
        } else if (screenWidth <= 600) {
            setCardStyle({ width: 'calc(50% - 10px)', margin: '5px', height: 'auto' }); // Half width for medium screens
            setImageHeight('180px');
        } else {
            setCardStyle({ width: '300px', margin: '10px', height: 'auto' }); // Fixed width for larger screens
            setImageHeight('200px');
        }

        // Update font sizes
        if (screenWidth <= 500) { 
            setFontSizes({ name: '1rem', price: '0.9rem', rating: '0.8rem' });
        } else if (screenWidth <= 700) {
            setFontSizes({ name: '1.2rem', price: '1rem', rating: '0.9rem' });
        } else {
            setFontSizes({ name: '1.5rem', price: '1.3rem', rating: '1rem' }); // Keep sizes the same for larger screens
        }
    };

    // Hook to listen for window resize and update the card style and font size
    useEffect(() => {
        updateStyles(); // Set initial style and font size
        window.addEventListener('resize', updateStyles); // Update on resize

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateStyles);
        };
    }, []);

    return (
        <div style={cardStyle}>
            <Card
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                }}
            >
                <CardActionArea
                    onClick={() => navigate(`/product/${id}`)}
                    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                    <div style={{ width: '100%', height: imageHeight, overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt="product image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        />
                    </div>
                    <CardContent
                        style={{
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            style={{
                                fontWeight: '700',
                                fontSize: fontSizes.name, // Responsive font size for name
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
                            style={{
                                fontWeight: '600',
                                fontSize: fontSizes.price, // Responsive font size for price
                                color: 'rgba(243, 114, 157, 0.918)',
                                marginBottom: '10px',
                            }}
                        >
                            RS. {price}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <BasicRating value={rating} />
                            <Typography
                                variant="body2"
                                component="span"
                                style={{ marginLeft: '5px', fontSize: fontSizes.rating, color: '#666', fontStyle: 'italic' }}
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
