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
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export default function MediaControlCard({ detail, uid }) {
    const theme = useTheme();
    const isMediumOrLarger = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(detail.image[0]);
    const [selectedSize, setSelectedSize] = React.useState(''); // Track selected size
    let navigate = useNavigate();

    const addToCart = async () => {
        if (!uid) {
            console.error("User is not logged in or UID is undefined");
            navigate("/login");
            return;
        }

        // If sizes array contains "none", allow adding to cart without a selected size
        if (detail.sizes.includes('none')) {
            // If sizes include 'none', set selectedSize to 'none'
            setSelectedSize('none');
        } else if (!selectedSize) {
            alert("Please select a size before adding to the cart!");
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
                        ProductSize: selectedSize, // Include the selected size
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
                            ProductSize: selectedSize, // Include the selected size
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

    return (
        <>
            <Card sx={{
                display: 'flex',
                flexDirection: isMediumOrLarger ? 'row' : 'column',
                borderRadius: '20px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                padding: '20px',
                marginBottom: 3,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 310,  // Fixed width of 300px
                            height: 500,  // Fixed height of 500px
                            objectFit: 'cover',
                            borderTopLeftRadius: '20px',
                            marginBottom: 2
                        }}
                        image={selectedImage}
                        alt="Product image"
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 2 }}>
                        {detail.image.map((img, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                sx={{
                                    width: 40,
                                    height: 40,
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    border: selectedImage === img ? '2px solid #D8074C' : '2px solid transparent',
                                    borderRadius: '8px'
                                }}
                                image={img}
                                alt={`Thumbnail ${index}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </Box>
                </Box>

                <CardContent sx={{
                    flex: 1,
                    marginLeft: isMediumOrLarger ? '20px' : 0,
                    marginTop: isMediumOrLarger ? 0 : 2,
                }}>
                    <Typography component="div" variant="h5" sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        letterSpacing: '0.05em',
                    }}>
                        {detail.name}
                    </Typography>

                    <Divider style={{ margin: '20px 0' }} />

                    <div className='d-flex mt-4 mb-4' style={{ alignItems: 'center' }}>
                    
                        <Typography component="div" variant="h5" sx={{
                            color: '#D8074C',
                            fontWeight: 'bold',
                            letterSpacing: '0.03em',
                        }}>
                            PKR {detail.price}
                        </Typography>
                    </div>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{
                            marginBottom: 3,
                            width: {
                                xs: '100%',
                                sm: '100%',
                                md: '80%',
                                lg: '500px',
                            },
                            wordWrap: 'break-word',
                            textAlign: 'justify',
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bold',
                                marginBottom: 8,
                                color: '#555',
                            }}
                        >
                            Product Detail:
                        </h6>
                        {detail.description}
                    </Typography>



                    {/*   // Size Dropdown */}
                    {!(detail.sizes && detail.sizes.includes('None')) && detail.sizes.length > 0 ? (
                        <FormControl fullWidth sx={{ marginBottom: 3, width: 200 }}>
                            <InputLabel id="size-label">Select Size</InputLabel>
                            <Select
                                labelId="size-label"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                required
                            >
                                {detail.sizes.map((size, index) => (
                                    <MenuItem key={index} value={size}>{size}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : null}



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
                                borderRadius: '12px',
                                transition: 'background-color 0.3s ease, transform 0.3s ease',
                                '&:active': {
                                    transform: 'scale(0.95)',
                                }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <SimpleSnackbar open={open} setOpen={setOpen} />
        </>
    );
}
