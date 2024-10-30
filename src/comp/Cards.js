import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BasicRating from './rating';

export default function Cards({ name, price, image, id, rating, soldProducts }) {
    const navigate = useNavigate();
    const [cardStyle, setCardStyle] = useState({ width: '300px', height: 'auto', padding: '0' });
    const [fontSizes, setFontSizes] = useState({
        name: '1.2rem',
        price: '1rem',
    });
    const [imageHeight, setImageHeight] = useState('350px');
    const [ratingSize, setRatingSize] = useState('small');

    const updateStyles = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 500) {
            setCardStyle({ width: 'calc(50% - 10px)', height: 'auto', padding: '5px' });
            setImageHeight('250px');
            setFontSizes({ name: '0.8rem', price: '0.8rem' });
        } else if (screenWidth <= 600) {
            setCardStyle({ width: 'calc(50% - 20px)', height: 'auto', padding: '10px' });
            setImageHeight('270px');
            setFontSizes({ name: '0.8rem', price: '0.9rem' });
        } else {
            setCardStyle({ width: '300px', height: 'auto', padding: '0' });
            setImageHeight('300px');
            setFontSizes({ name: '0.8rem', price: '1rem' });
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
        <div style={{ ...cardStyle, margin: '1px', position: 'relative', zIndex: 1 }}>
            <Card
                style={{
                    width: '100%',
                    borderRadius: '0px',
                    border: '1px solid #000',
                    boxShadow: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                            borderBottom: '1px solid black',
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={image}
                            alt="product image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                                backgroundColor: '#f0f0f0',
                            }}
                        />
                    </div>
                    <CardContent
                        style={{
                            padding: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '4px',
                        }}
                    >
                        <Typography
                            variant="h6"
                            style={{
                                fontWeight: '300',
                                fontSize: fontSizes.name,
                                color: '#333',
                                fontFamily: 'Arial, sans-serif',
                                margin: '0',
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <BasicRating value={rating} size={ratingSize} style={{ fontSize: '0px' }} /> {/* Set rating size to 10px */}
                            <Typography variant="body2" style={{ marginLeft: '4px', color: '#555', fontSize: '10px' }}>
                                ({soldProducts})
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
