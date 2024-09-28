import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../configirations/firebase';
import { onAuthStateChanged } from "firebase/auth";
import Button from '@mui/material/Button';

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

            // Loop through each order to gather product IDs
            orderData.Orders.forEach((order) => {
              order.OrderDetails.forEach((detail) => {
                console.log("Detail Products:", detail.Products); // Log to inspect Products

                // Ensure Products is a valid array before processing
                if (Array.isArray(detail.Products)) {
                  // Assuming each product is an object with an `id` field
                  const productIdsFromDetail = detail.Products.map(product => product.id);
                  productIds = productIds.concat(productIdsFromDetail);
                } else {
                  console.log("Products is not an array:", detail.Products);
                }
              });
            });

            console.log("All Product IDs before filtering:", productIds);

            // Filter out non-string values (if any exist)
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
                    const product = products.find(p => p.id === productObj.id); // Access product id from object
                    return (
                      <div key={productIndex} style={styles.card}>
                        <img
                          src={product?.image || "https://via.placeholder.com/100"}
                          alt="Product"
                          style={styles.productImage}
                        />
                        <div style={styles.productDetails}>
                          <h4 style={styles.productName}>
                            {product?.name || "Product Name"}
                          </h4>

                          <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Order id:</span>
                            <span>{detail.OrderId}</span>
                          </div>

                          <div style={styles.infoSection}>
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>Status:</span>
                              <span>{detail.Status}</span>
                            </div>
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>Payment Method:</span>
                              <span>{detail.PaymentMethod}</span>
                            </div>
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>Order Date:</span>
                              <span>{detail.Date.toDate().toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p style={styles.infoMessage}>All orders may take up to 2 working days.</p>
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
        <p style={styles.noOrders}>No orders found</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',

  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2em',
    marginBottom: '24px',
    fontFamily: '"Lemon/Milk", sans-serif',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
  },
  noOrders: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.2em',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column', // Stack cards vertically
    gap: '24px',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column', // Stack image and details vertically
    alignItems: 'center',
    height: 'auto', // Allow height to adjust based on content
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  productImage: {
    width: '150px',
    height: '150px',
    borderRadius: '12px',
    marginBottom: '16px', // Add space below the image
    objectFit: 'cover',
  },
  productDetails: {
    width: '100%', // Take full width inside the card
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productName: {
    fontSize: '1.2em',
    margin: '0 0 12px 0',
    color: '#333',
    fontFamily: '"Raleway", sans-serif',
  },
  infoSection: {
    width: '100%', // Take full width for the info section
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '12px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between', // Space out label and value
    width: '100%',
    flexWrap: 'wrap', // Wrap content on small screens
    fontSize: '0.9em',
  },
  infoLabel: {
    fontWeight: '300', // Light font weight
    color: '#555',
    width: '150px',
  },
  infoMessage: {
    marginTop: '16px',
    fontStyle: 'italic',
    color: '#888',
  },
};

export default Myorders;
