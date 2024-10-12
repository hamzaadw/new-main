import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../configirations/firebase';
import { onAuthStateChanged } from "firebase/auth";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

function Myorders() {
  const [uid, setUid] = React.useState(null);
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        setEmail(user.email);
        console.log("User ID:", uid);
      } else {
        console.log("User is signed out");
      }
    });

    return unsubscribeAuth;
  }, []);

  React.useEffect(() => {
    if (uid) {
      const orderDocRef = doc(db, "Orders", uid);

      const unsubscribeOrders = onSnapshot(orderDocRef, async (docSnap) => {
        try {
          if (docSnap.exists()) {
            const orderData = docSnap.data();
            setOrders(orderData.Orders || []);

            let productIds = [];

            orderData.Orders.forEach((order) => {
              order.OrderDetails.forEach((detail) => {
                if (Array.isArray(detail.Products)) {
                  const productIdsFromDetail = detail.Products.map(product => product.id);
                  productIds = productIds.concat(productIdsFromDetail);
                }
              });
            });

            productIds = productIds.filter((id) => typeof id === 'string');

            if (productIds.length > 0) {
              const productList = [];
              for (const productId of productIds) {
                const productRef = doc(db, "Product", productId);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                  productList.push({ id: productId, ...productSnap.data() });
                }
              }
              setProducts(productList);
            }
          }
        } catch (error) {
          console.error("Error fetching orders and products:", error);
        } finally {
          setLoading(false);
        }
      });

      return () => {
        unsubscribeOrders();
      };
    }
  }, [uid]);

  const handleBackToShop = () => {
    navigate('/');
  };

  const handleCancelOrder = async (orderId, detail) => {
    try {
      console.log("Canceling order with ID:", orderId);

      const orderDocRef = doc(db, "Orders", uid);
      const orderDocSnap = await getDoc(orderDocRef);

      if (orderDocSnap.exists()) {
        const orderData = orderDocSnap.data();

        if (detail && detail.Products) {
          if (detail.Status === "Pending" || detail.Status === "Processing") {
            detail.Status = "canceled";

            await updateDoc(orderDocRef, {
              Orders: orderData.Orders
            });

            await Swal.fire('Success', 'Your order has been successfully canceled.', 'success');

            console.log(email);

            const message = `Your order with ID ${orderId} has been successfully canceled.`;
            const message2 = `Order ID: ${orderId}\nStatus: Canceled`;

            try {
              const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  recipientEmail: email,
                  subject: "Order Canceled",
                  message: message,
                  message2: message2
                })
              });

              if (!response1.ok) throw new Error('Error sending email');

              const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  recipientEmail: "hamzaasadabcd@gmail.com",
                  subject: "Order Canceled - Notification",
                  message: message,
                  message2: message2
                })
              });

              if (!response2.ok) throw new Error('Error sending notification email');

            } catch (error) {
              console.error("Error sending email:", error);
            }

          } else {
            await Swal.fire('Warning', 'Only pending or processing orders can be canceled!', 'warning');
          }
        } else {
          await Swal.fire('Error', 'Order details are missing!', 'error');
        }
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <div style={styles.container}>
      <Button
        variant="contained"
        onClick={handleBackToShop}
        sx={styles.backButton}
      >
        Back to Shop
      </Button>

      <div style={styles.linksContainer}>
        <NavLink 
          to="/myorders" 
          style={{ 
            ...styles.link, 
            borderBottom: window.location.pathname === '/myorders' ? '2px solid rgba(243, 114, 157, 0.918)' : 'none' 
          }}
        >
          My Orders
        </NavLink>
        <NavLink 
          to="/canceledOrders" 
          style={{ 
            ...styles.link, 
            borderBottom: window.location.pathname === '/canceled-orders' ? '2px solid rgba(243, 114, 157, 0.918)' : 'none' 
          }}
        >
          My Canceled Orders
        </NavLink>
      </div>

      <h2 style={styles.heading}>My Orders</h2>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : orders.length > 0 ? (
        <div className='Card'>
          {orders.map((order, index) => (
            <div key={index}>
              {order.OrderDetails.map((detail, idx) => (
                <div key={idx} style={styles.cardContainer}>
                  {detail.Products.map((productObj, productIndex) => {
                    const product = products.find(p => p.id === productObj.id);
                    return (
                      <div key={productIndex} style={styles.card}>
                        <img
                          src={product?.image || "https://via.placeholder.com/100"}
                          alt="Product"
                          style={styles.image}
                        />
                        <div style={styles.cardContent}>
                          <h2>{product?.name}</h2>
                          <p>Price: ${product?.price}</p>
                          <p>Order ID: {order.OrderDetails[0].OrderId}</p>
                          <p>Status: {detail.Status}</p>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleCancelOrder(order.OrderDetails[0].OrderId, detail)}
                            style={styles.cancelButton}
                          >
                            Cancel Order
                          </Button>
                        </div>
                      </div>
                    );
                  })} 
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noOrders}>No orders found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.5rem', // Reduced heading size
  },
  loading: {
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: '1rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center', // Center items horizontally
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  image: {
    width: '100%', // Make the image cover the full width
    height: 'auto', // Maintain aspect ratio
    maxHeight: '150px', // Set a maximum height
    objectFit: 'cover', // Ensure the image covers the div
  },
  cardContent: {
    flex: 1,
    textAlign: 'center', // Center text below image
  },
  cancelButton: {
    marginTop: '1rem',
  },
  noOrders: {
    textAlign: 'center',
  },
  backButton: {
    marginBottom: '1rem',
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center', // Closer together
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: '400', // Reduced font weight
    margin: '0 1rem',
    transition: 'border-bottom 0.3s',
  },
};

// Media queries to adjust styles for smaller screens
const mediaQueries = {
  '@media (max-width: 600px)': {
    card: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      height: 'auto',
      maxHeight: '200px', // Adjust max height for small screens
    },
  },
};

export default Myorders;
