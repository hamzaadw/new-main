import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { Divider } from 'antd';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../configirations/firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, orderId, FullName, city, PhoneNumber, famousPlace, FullAddress, email,id }) {
  const handleClose = () => setOpen(false);
  const [orderData, setOrderData] = React.useState(null);
  const [productNames, setProductNames] = React.useState([]);

  const [productdata, setproductdata]=React.useState([])




  const fetchOrderById = async (orderId) => {
    try {
      const ordersCollection = collection(db, 'Orders');
      const querySnapshot = await getDocs(ordersCollection);
      let fetchedOrderData = null;
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Orders && Array.isArray(data.Orders)) {
          data.Orders.forEach((order) => {
            if (order.OrderDetails && Array.isArray(order.OrderDetails)) {
              order.OrderDetails.forEach((detail) => {
                if (detail.OrderId === orderId) {
                  const products = detail.Products || [];
                  const productIds = products.map(product => product.id); // Assuming each product has a ProductId
  
                  fetchedOrderData = {
                    OrderedBy: doc.id,
                    orderId: detail.OrderId,
                    productIds: productIds, // Store array of product IDs
                    orderDate: new Date(detail.Date.seconds * 1000).toDateString(),
                    status: detail.Status || 'Pending',
                  };
                  console.log(productIds)
                }
              });
            }
          });
        }
      });
  
      if (fetchedOrderData) {
        setOrderData(fetchedOrderData);
        fetchProductDetails(fetchedOrderData.productIds); // Fetch product details using product IDs
      } else {
        setOrderData(null);
      }
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
      setOrderData(null);
    }
  };

  



  const fetchProductDetails = async (productIds) => {
    try {
      const productDetailsPromises = productIds.map(async (id) => {
        const productRef = doc(db, 'Product', id); // Assumes your collection is named 'Product'
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          const productData = productDoc.data();
          console.log(`Product data for ID ${id}:`, productData);
          setproductdata(productData)  
          return productData.name;
        } else {
          console.warn(`Product with ID ${id} not found.`);
          return null;
        }
      });

      const productDetails = await Promise.all(productDetailsPromises);
      const validProductNames = productDetails.filter(name => name !== null); // Filter out any null values
      setProductNames(validProductNames); // Store the product names in state
      console.log("All fetched product names:", validProductNames);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  React.useEffect(() => {
    if (open && orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Order ID: {orderId}
          </Typography>

          <Divider />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Full Name:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{FullName}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>Phone Number:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{PhoneNumber}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>City:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{city}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>Address:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{FullAddress}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>Famous Place Near You:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{famousPlace}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>Email:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{email}</Typography>
            </Grid>

            {orderData && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Product Ordered:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{productNames.join(', ')}</Typography> {/* Display product names */}
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Order Date:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{orderData.orderDate}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Price:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{productdata.price} Rs</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Status:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{orderData.status}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
