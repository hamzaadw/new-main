import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from '../configirations/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import CartCard from '../comp/CartCard';
import Checkout from "../comp/Dashboard/Cheakout/Checkout";
import PaymentMethods from '../comp/Payment';

function Cart() {
  const [CartProducts, setCartProducts] = React.useState([]);
  const [True, setTrue] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [Userid, setUserid] = React.useState(null);
  const [data, setdata] = React.useState(null);

  const navigate = useNavigate(); // Initialize navigate

  const deliveryFee = 250; // Fixed delivery fee

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
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getCart(uid);
        setUserid(uid);
      }
    });
    return unsubscribe;
  }, []);

  const updateTotalPrice = (price, isChecked, product) => {
    setTotalPrice((oldValue) => (isChecked ? oldValue + price : oldValue - price));
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, product]);
      setCheck(true);
    } else {
      setSelectedProducts((prev) => {
        const updatedProducts = prev.filter((item) => item.ProductId !== product.ProductId);
        setCheck(updatedProducts.length > 0);
        return updatedProducts;
      });
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBackToShop = () => {
    navigate('/');
  };

  const calculateSubtotal = () => {
    return totalPrice + deliveryFee;
  };



let getselectedpaymentmethod=(data)=>{
console.log(data)
setdata(data)
}


  return (
    <Box sx={{ padding: '2rem', background: 'linear-gradient(135deg, #f9f9f9 30%, #ececec 100%)', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif',
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}
      >
        Your Shopping Cart
      </Typography>

      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Button
          variant="contained"
          onClick={handleBackToShop}
          sx={{
            backgroundColor: '#f3729d',
            color: '#fff',
            padding: '10px 20px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'Roboto, sans-serif',
            marginBottom: '1.5rem',
            '&:hover': {
              backgroundColor: '#f06292',
            }
          }}
        >
          Back to Shop
        </Button>

        {CartProducts.length > 0 ? (
          CartProducts.map((product, index) => (
            <Paper
              key={index}
              elevation={6}
              sx={{
                margin: '1.5rem 0',
                padding: '1rem',
                borderRadius: '12px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <CartCard updateTotalPrice={updateTotalPrice} products={product} />
            </Paper>
          ))
        ) : (
          <Paper elevation={6} sx={{ padding: '2rem', textAlign: 'center', borderRadius: '12px' }}>
            <Typography variant="h6" color="textSecondary" sx={{ fontFamily: 'Roboto, sans-serif' }}>
              No items in the cart.
            </Typography>
          </Paper>
        )}

        {check && (
          <Paper
            elevation={6}
            sx={{
              margin: '2rem 0',
              padding: '1.5rem',
              textAlign: 'right',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(243, 114, 157, 0.918) 30%, rgba(243, 114, 157, 0.7) 100%)',
              color: '#fff'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
              Total: PKR {formatPrice(totalPrice.toFixed(2))}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
              Delivery: PKR {formatPrice(deliveryFee)}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
              SubTotal: PKR {formatPrice(calculateSubtotal().toFixed(2))}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
              Tax included and shipping calculated at checkout
            </Typography>
            <Button
              onClick={() => setTrue(true)}
              variant="contained"
              sx={{
                backgroundColor: '#fff',
                color: '#f3729d',
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontFamily: 'Roboto, sans-serif',
                '&:hover': {
                  backgroundColor: '#f4f4f4',
                  color: '#f3729d',
                }
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        )}

        {check && True && (
          <PaymentMethods getselectedpaymentmethod={getselectedpaymentmethod}/>
        )}
        {check && True && (
          <Checkout paymentMethod={data} selectedProducts={selectedProducts} uid={Userid} />
        )}
      </Box>
    </Box>
  );
}

export default Cart;
