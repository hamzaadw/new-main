import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import { db } from '../configirations/firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import SimpleSnackbar from './addtocartNotification/Notification';
import { useNavigate } from 'react-router-dom';
import BasicRating from './rating';
import { Divider } from 'antd';

export default function MediaControlCard({ detail, uid }) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    const addToCart = async () => {
        if (!uid) {
            console.error("User is not logged in or UID is undefined");
            navigate("/login");
            return;
        }

        try {
            const cartRef = doc(db, "Cart", uid);
            const cartDoc = await getDoc(cartRef);

            if (cartDoc.exists()) {
                await updateDoc(cartRef, {
                    Products: arrayUnion({
                        ProductId: detail.id,
                        ProductName: detail.name,
                        ProductDescription: detail.description,
                        ProductPrice: detail.price,
                        ProductImage: detail.image,
                    })
                });
            } else {
                await setDoc(cartRef, {
                    Products: [
                        {
                            ProductId: detail.id,
                            ProductName: detail.name,
                            ProductDescription: detail.description,
                            ProductPrice: detail.price,
                            ProductImage: detail.image,
                        }
                    ]
                });
            }

            console.log("Product added to cart!");
            setOpen(true);
        } catch (e) {
            console.log("Error adding product to cart: ", e);
        }
    };
    
    console.log('Detail:', detail);
    console.log('UID:', uid);

    return (
        <>
            <Card sx={{
                display: 'flex',
                flexDirection: isLargeScreen ? 'row' : 'column',
                borderRadius: '20px',  // Softer, rounded corners
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',  // Deeper shadow for more contrast
                padding: '20px',  // Added padding around the card
                marginBottom: 3,  // Increased spacing for a cleaner look
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',  // Gradient for modern look
                // Removed hover effect
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: isLargeScreen ? 300 : '100%',
                        height: isLargeScreen ? 'auto' : 300,
                        objectFit: 'cover',
                        borderTopLeftRadius: '20px',  // Aligning border with Card's border radius
                    }}
                    image={detail.image[0]}
                    alt="Product image"
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{
                            fontWeight: 'bold', 
                            color: '#333',
                            letterSpacing: '0.05em',  // Slight spacing for modern feel
                        }}>
                            {detail.name}
                        </Typography>

                        <Divider style={{ margin: '20px 0' }} />

                        <div className='d-flex mt-4 mb-4' style={{ alignItems: 'center' }}>
                            <span style={{
                                marginRight: 10,
                                textDecoration: 'line-through',
                                color: 'grey',
                                fontSize: '1.2rem',
                                opacity: 0.8,  // Lighter strike-through text
                            }}>
                                PKR 3000
                            </span>
                            <Typography component="div" variant="h5" sx={{
                                color: '#D8074C',
                                fontWeight: 'bold',
                                letterSpacing: '0.03em',
                            }}>
                                PKR {detail.price}
                            </Typography>
                        </div>

                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: 3, width: 500, }}>
                            <h6 style={{
                                
                                fontWeight: "bold",
                                marginBottom: 8,
                                color: '#555',  // Softer heading color
                            }}>Product Detail:</h6>
                            {detail.description}
                        </Typography>

                        <Divider style={{ margin: '20px 0' }} />

                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: 3 }}>
                            <h6 style={{
                                fontWeight: "bold",
                                marginBottom: 8,
                                color: '#555',
                            }}>Product Rating:</h6>
                            <BasicRating value={detail.rating} />
                        </Typography>

                        <Box sx={{ mt: 5 }}>
                            <Button
                                onClick={addToCart}
                                color="secondary"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#000',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#D8074C',
                                    },
                                    padding: '12px 24px',
                                    borderRadius: '12px',  // Slightly larger for modern button shape
                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                    '&:active': {
                                        transform: 'scale(0.95)',  // Slight shrink on click
                                    }
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </CardContent>
                </Box>
            </Card>

            <SimpleSnackbar open={open} setOpen={setOpen} />
        </>
    );
}
