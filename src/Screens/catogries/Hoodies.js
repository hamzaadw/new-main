import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../configirations/firebase';
import Navbarrer from '../../comp/Navbar/Nav';
import Cards from '../../comp/Cards';

function Hoodies() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'Product'), where('category', '==', 'Hoodies'));
        const querySnapshot = await getDocs(q);
        const productsList = [];

        querySnapshot.forEach((doc) => {
          productsList.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
                />
            
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      
    </div>
  );
}

export default Hoodies;
