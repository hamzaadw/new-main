import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, db } from '../configirations/firebase';
import { onAuthStateChanged } from "firebase/auth";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

function CanceledOrders() {
  const [uid, setUid] = React.useState(null);
  const [canceledOrders, setCanceledOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
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
            // Filter canceled orders
            const filteredOrders = orderData.Orders.filter(order =>
              order.OrderDetails.some(detail => detail.Status === 'canceled')
            );
            setCanceledOrders(filteredOrders);

            let productIds = [];
            filteredOrders.forEach((order) => {
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
          console.error("Error fetching canceled orders and products:", error);
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
            borderBottom: window.location.pathname === '/canceledOrders' ? '2px solid rgba(243, 114, 157, 0.918)' : 'none' 
          }}
        >
          My Canceled Orders
        </NavLink>
      </div>










      <h1 style={styles.heading}>My Canceled Orders</h1>




      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : canceledOrders.length > 0 ? (
        <div className='Card'>
          {canceledOrders.map((order, index) => (
            <div key={index}>
              {order.OrderDetails.map((detail, idx) => (
                detail.Status === 'canceled' && (
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
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noOrders}>No canceled orders found.</p>
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
    marginRight: '1rem',
  },
  cardContent: {
    flex: 1,
  },
  noOrders: {
    textAlign: 'center',
  },
  backButton: {
    marginBottom: '1rem',
  },linksContainer: {
    display: 'flex',
    justifyContent: 'center', // Closer together
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: '400', // Reduced font weight
    margin: '0 1rem',
    padding: '0.5rem',
    transition: 'border-bottom 0.3s',
  },
};

export default CanceledOrders;
