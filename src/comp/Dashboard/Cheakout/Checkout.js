import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { db } from '../../../configirations/firebase';
import { doc, updateDoc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { message } from 'antd';





const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#f3729d',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f3729d',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#f3729d',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f3729d',
    },
  },
});

const CustomButton = styled(Button)({
  backgroundColor: '#f3729d',
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#d8074c',
  },
});













const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const Checkout = ({ uid, selectedProducts, paymentMethod }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    fullAddress: '',
    city: '',
    townOrBlock: '',
    famousPlace: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // Debugging
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Indicate that the loading process has started

    try {
        // Fetch product details based on selected products
        const productDetailsPromises = selectedProducts.map(async (id) => {
            try {
                const productRef = doc(db, 'Product', id); // Fetch product from Firestore
                const productDoc = await getDoc(productRef);
                if (productDoc.exists()) {
                    const productData = productDoc.data();
                    console.log("Product data fetched:", productData); // Debugging
                    return { id: id, name: productData.name, price: productData.price }; // Assuming product has 'name' and 'price'
                } else {
                    console.warn(`Product with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching product with ID ${id}:`, error);
                return null;
            }
        });

        const productDetails = await Promise.all(productDetailsPromises);

        // Filter out any null values (failed fetches)
        const filteredProductDetails = productDetails.filter((product) => product !== null);
        if (filteredProductDetails.length === 0) {
            throw new Error("No valid products found for this order.");
        }

        // Proceed with order creation using the valid product details
        const newOrderId = generateRandomString(); // Generate a random 10-character Order ID
        
        const newOrder = {
            FullName: formData.fullName,
            PhoneNumber: formData.phoneNumber,
            City: formData.city,
            FullAddress: formData.fullAddress,
            townOrBlock: formData.townOrBlock,
            email: formData.email,
            famousPlace: formData.famousPlace,
            OrderedBy: uid,
            ProductId: selectedProducts,
            OrderDetails: [{
                OrderId: newOrderId,
                Date: new Date(),
                Products: filteredProductDetails, // Include valid product details in the order
                Status: 'Pending',
                PaymentMethod: paymentMethod,
            }]
        };

        const Ref = doc(db, "Orders", uid);
        const Doc = await getDoc(Ref);

        if (Doc.exists()) {
            await updateDoc(Ref, {
                Orders: arrayUnion(newOrder)
            });
        } else {
            await setDoc(Ref, {
                Orders: [newOrder]
            });
        }

        // Send confirmation email after successfully creating the order
  


      
          try {
              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      recipientEmail: "recipient@example.com",
                      subject: "Order Confirmation",
                      message: "Your order has been placed successfully.",
                      message2: "We have received your order and are processing it."
                  })
              });
      
              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(`Error: ${errorData.message}`);
              }
      
              const data = await response.json();
              console.log("Email sent successfully:", data);
      
          } catch (error) {
              console.error("Error sending email:", error);
          }
   
      











    } catch (error) {
        console.error("Error adding order:", error);
        message.error("Failed to place order."); // Show error message
    } finally {
        setLoading(false); // Indicate that loading has finished
    }
};



  return (
    <Box sx={{ padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Full Address"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Town or Block"
              name="townOrBlock"
              value={formData.townOrBlock}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Famous Place Near You"
              name="famousPlace"
              value={formData.famousPlace}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Checkout;
