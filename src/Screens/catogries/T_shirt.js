import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../configirations/firebase';  // Ensure the correct path to your Firebase config
import Navbarrer from '../../comp/Navbar/Nav';
import Cards from '../../comp/Cards';
import Footer from '../../comp/Footer';
function T_shirt() {
  const [products, setProducts] = useState([]);  // State to store products
  const [loading, setLoading] = useState(true);  // State to handle loading

  // Fetch products where category is '2 piece'
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Query Firestore for products where category is '2PC'
        const q = query(collection(db, 'Product'), where('category', '==', 'T_shirts'));
        const querySnapshot = await getDocs(q);
        const productsList = [];

        // Loop through the query results and store products
        querySnapshot.forEach((doc) => {
          productsList.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsList);  // Set the products to the state
        setLoading(false);  // Stop loading once products are fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);  // Stop loading in case of an error
      }
    };

    fetchProducts();  // Call the fetch function on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

  return (
    <div>
    <Navbarrer />
  
      <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
          }}> 

        {products.length > 0 ? (
          products.map((product) => (
          
              <Cards
               key={product.id}
                id={product.id}
                image={product.image[0]}
                name={product.name}
                price={product.price}
                rating={product.rating}
                soldProducts={product.soldProducts}
                Fakeprice={product.Fakeprice}
              />
          
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    <Footer/>
  </div>
  );
}

export default T_shirt;
