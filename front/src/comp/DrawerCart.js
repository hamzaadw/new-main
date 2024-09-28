import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { auth, db } from '../configirations/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CloseIcon from '@mui/icons-material/Close';
import CartCard from './CartCard';
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function AnchorTemporaryDrawer({ cart, setCart }) {
    const [state, setState] = React.useState(false);
    const [CartProducts, setCartProducts] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);

    // Media query to check if the screen width is less than or equal to 500px
    const isSmallScreen = useMediaQuery('(max-width:500px)');

    const getCart = async (uid) => {
        const docRef = doc(db, "Cart", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const Cartitem = data.Products || [];
            setCartProducts(Cartitem);
        } else {
            console.log("No such document!");
        }
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                getCart(uid);
            } else {
                // User is signed out
            }
        });
        return unsubscribe;
    }, []);

    const updateTotalPrice = (price, isChecked) => {
        setTotalPrice(oldValue => isChecked ? oldValue + price : oldValue - price);
    };

    React.useEffect(() => {
        setState(cart);
    }, [cart]);

    const toggleDrawer = (open) => {
        setState(open);
        setCart(open); // Update the cart state in the parent component
    };

    const list = (
        <>
            <Box
                sx={{ 
                    width: isSmallScreen ? '100vw' : 480, // Adjust width based on screen size
                    padding: 2,
                    backgroundColor: '#f5f5f5',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                role="presentation"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                        Shopping Cart
                    </Typography>
                    <CloseIcon 
                        sx={{ cursor: "pointer", color: '#333' }} 
                        onClick={() => toggleDrawer(false)} 
                    />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    {CartProducts.length > 0 ? (
                        CartProducts.map((product, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <CartCard 
                                    updateTotalPrice={updateTotalPrice} 
                                    products={product} 
                                    showQuantity={!isSmallScreen} // Show quantity only on larger screens
                                    showCheckbox={!isSmallScreen} // Show checkbox only on larger screens
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center', color: '#888' }}>
                            No items in the cart.
                        </Typography>
                    )}
                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box sx={{ textAlign: 'center' }}>
                    <NavLink to="/cart">
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{
                                width: '100%',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                '&:hover': { backgroundColor: '#555' },
                            }}
                        >
                            View Cart
                        </Button>
                    </NavLink>
                </Box>
            </Box>
        </>
    );

    return (
        <Drawer
            anchor="right"
            open={state}
            onClose={() => toggleDrawer(false)}
            sx={{
                '& .MuiDrawer-paper': {
                    width: isSmallScreen ? '100vw' : 480, // Adjust width based on screen size
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {list}
        </Drawer>
    );
}
