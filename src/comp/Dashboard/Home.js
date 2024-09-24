import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, query, where, updateDoc, doc, onSnapshot } from 'firebase/firestore'; // Import `updateDoc`, `doc`
import { auth, db } from '../../configirations/firebase';
import Sidebar from './Sidbar';
import ContentCard from './content';
import ProductsPage from './ProductPage';


const Layout = ({setOpen, open}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [cardContent, setCardContent] = useState([]);
  const [uid, setUid] = useState(null);
  const [cardStatuses, setCardStatuses] = useState({});
  const [otherdata, setotherdata]= useState([])

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        console.log("User UID:", user.uid);
      } else {
        setUid(null);
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMenuClick = (option) => {
    setSelectedOption(option);
    console.log("Selected Option:", option);
  
    if (option === 'Products') {
      setCardContent([{
        title: 'Product Title',
        description: 'This is a description of the product.'
      }]);
    }
  };


  const fetchOrderData = () => {
    if (uid && selectedOption) {
      console.log("Fetching order data for UID:", uid);
      try {
        const ordersCollection = collection(db, 'Orders');
  
        onSnapshot(ordersCollection, (querySnapshot) => {
          const contentArray = [];
          const others = [];
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
  
            if (data.Orders && Array.isArray(data.Orders)) {
              data.Orders.forEach((order) => {
                const additionalData = {
                  city: order.City,
                  famousPlace: order.famousPlace,
                  FullAddress: order.FullAddress,
                  FullName: order.FullName,
                  email: order.email,
                  PhoneNumber: order.PhoneNumber,
                };
  
                others.push(additionalData);



                if (order.OrderDetails && Array.isArray(order.OrderDetails)) {
                  const orderDetails = order.OrderDetails[0]; // Assuming you want the first order detail
      
                  const products = orderDetails.Products || [];
                
                  products.forEach(product => {
          
                    contentArray.push({
                      docId: doc.id,
                      title: 'Orders Management',
                      productId:  product.id || 'Unknown ID', // Check if this is actually defined
                      productName: product.name, 
                      productPrice: product.price, 
                      orderId: orderDetails.OrderId,
                      orderDate: new Date(orderDetails.Date.seconds * 1000).toDateString(),
                      status: orderDetails.Status || 'Pending',
                      ...additionalData,
                    });
                  });
                }
                
              });
            }
          });
  
          setCardContent(contentArray);
          console.log(contentArray)
;
          
          setotherdata(others);
        });
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    }
  };
  
  


  useEffect(() => {
    console.log("other data:", otherdata);
  }, [otherdata]);



  const fetchOrderById = async (orderId, newStatus) => {
    try {
      const ordersCollection = collection(db, 'Orders');
      const querySnapshot = await getDocs(ordersCollection);
  
      let orderDocRef = null; // Reference to the document to update
      let updatedOrders = [];
  
      // Loop through documents to find the one with the specific orderId
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Fetched Data for Document:", data);
  
        // Check if the document contains the order with the specific orderId
        let orderFound = false;
  
        if (data.Orders && Array.isArray(data.Orders)) {
          data.Orders.forEach((order, orderIndex) => {
            if (order.OrderDetails && Array.isArray(order.OrderDetails)) {
              order.OrderDetails.forEach((detail, detailIndex) => {
                if (detail.OrderId === orderId) {
                  // Modify the status
                  data.Orders[orderIndex].OrderDetails[detailIndex].Status = newStatus;
                  orderFound = true;
                  orderDocRef = doc.ref; // Reference to the specific document
                }
              });
            }
          });
        }
  
        if (orderFound) {
          updatedOrders = data.Orders;
        }
      });
  
      if (orderDocRef && updatedOrders.length > 0) {
        // Update the document with the modified Orders array
        await updateDoc(orderDocRef, {
          Orders: updatedOrders,
        });
  
        console.log(`Order ID: ${orderId} status updated to: ${newStatus}`);
      } else {
        console.log(`Order ID: ${orderId} not found or no update necessary.`);
      }
    } catch (error) {
      console.error(`Error fetching or updating order with ID ${orderId}:`, error);
    }
  };
  
  

  useEffect(() => {
    fetchOrderData();
  }, [uid, selectedOption]);

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar onMenuClick={handleMenuClick} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {selectedOption === 'Products' ? (
    <ProductsPage /> // Render the ProductsPage component
) : (
    selectedOption && cardContent.length > 0 && cardContent.map((content, index) => (
      console.log(content.productId),
        <ContentCard
            id={content.productId} // Pass productId to ContentCard
            key={index}
            {...content} // Spread the rest of the properties
            status={content.status || 'Pending'}
            city={content.city}
            famousPlace={content.famousPlace}
            PhoneNumber={content.PhoneNumber}
            FullName={content.FullName}
            email={content.email}
            FullAddress={content.FullAddress}
            onStatusChange={(newStatus) => {
                console.log(`Status changed to: ${newStatus} for Order ID: ${content.orderId}`);
                setCardStatuses((prevStatuses) => ({ ...prevStatuses, [index]: newStatus }));
                fetchOrderById(content.orderId, newStatus); // Fetch and update specific order by ID when status changes
            }}
        />
    ))
)}

      </Box>
    </Box>

   

    </>
  );
};

export default Layout;
