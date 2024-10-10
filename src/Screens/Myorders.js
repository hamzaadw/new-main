import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, query, where, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../configirations/firebase';
import { onAuthStateChanged } from "firebase/auth";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

function Myorders() {
  const [uid, setUid] = React.useState(null);
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        console.log("User ID:", uid);
      } else {
        console.log("User is signed out");
      }
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (uid) {
      const getOrdersAndProducts = async () => {
        try {
          const docRef = doc(db, "Orders", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const orderData = docSnap.data();
            console.log("Order Document data:", orderData);

            setOrders(orderData.Orders || []);

            let productIds = [];

            orderData.Orders.forEach((order) => {
              order.OrderDetails.forEach((detail) => {
                console.log("Detail Products:", detail.Products);

                if (Array.isArray(detail.Products)) {
                  const productIdsFromDetail = detail.Products.map(product => product.id);
                  productIds = productIds.concat(productIdsFromDetail);
                } else {
                  console.log("Products is not an array:", detail.Products);
                }
              });
            });

            console.log("All Product IDs before filtering:", productIds);

            productIds = productIds.filter((id) => typeof id === 'string');
            console.log("Filtered Product IDs:", productIds);

            if (productIds.length > 0) {
              const productList = [];
              for (const productId of productIds) {
                const productRef = doc(db, "Product", productId);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                  productList.push({ id: productId, ...productSnap.data() });
                } else {
                  console.log(`Product with ID ${productId} not found.`);
                }
              }
              setProducts(productList);
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching orders and products:", error);
        } finally {
          setLoading(false);
        }
      };

      getOrdersAndProducts();
    }
  }, [uid]);

  const handleBackToShop = () => {
    navigate('/');
  };

  const handleCancelOrder = async (orderId, detail) => {
    try {
      console.log("Canceling order with ID:", orderId);
      console.log("Canceling order details:", detail);

      const uid = auth.currentUser.uid;
      const orderDocRef = doc(db, "Orders", uid);
      const orderDocSnap = await getDoc(orderDocRef);

      if (orderDocSnap.exists()) {
        const orderData = orderDocSnap.data();

        if (detail && detail.Products) {
          if (detail.Status === "Pending" || detail.Status === "Processing") {
            detail.Status = "canceled";
            console.log(`Order with ID ${orderId} has been canceled.`);

            await updateDoc(orderDocRef, {
              Orders: orderData.Orders
            });

            // Email logic to send cancellation confirmation
            const email = orderData.email; // Assuming email is part of orderData

            const message = `Your order with ID ${orderId} has been successfully canceled.`;
            const message2 = `
              Order ID: ${orderId}
              Status: Canceled
            `;
  
            try {
              // Sending email to the recipient
              const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  recipientEmail: email, // Email of the recipient
                  subject: "Order Canceled",
                  message: message,
                  message2: message2
                })
              });
  
              if (!response1.ok) {
                const errorData = await response1.json();
                throw new Error(`Error: ${errorData.message}`);
              }
  
              const data1 = await response1.json();
              console.log("Cancellation email sent to recipient:", data1);

              // Sending email to yourself (Hamza)
              const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  recipientEmail: "hamzaasadabcd@gmail.com", // Your email
                  subject: "Order Canceled - Notification",
                  message: message,
                  message2: message2
                })
              });
  
              if (!response2.ok) {
                const errorData = await response2.json();
                throw new Error(`Error: ${errorData.message}`);
              }
  
              const data2 = await response2.json();
              console.log("Cancellation email sent to yourself:", data2);

            } catch (error) {
              console.error("Error sending email:", error);
            }

          } else {
            await Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Sorry, you can only cancel orders that are pending or processing!',
            });
          }
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Order details are not available for cancellation.',
          });
        }
      } else {
        console.log("No order document found for the user.");
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

      <h1 style={styles.heading}>My Orders</h1>
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
  },
  loading: {
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: '1rem',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '1rem',
  },
  cardContent: {
    flexGrow: 1,
  },
  cancelButton: {
    marginTop: '1rem',
  },
  noOrders: {
    textAlign: 'center',
    marginTop: '2rem',
    fontStyle: 'italic',
  },
};

export default Myorders;
