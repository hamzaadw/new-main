// ProductsPage.js
import React from 'react';
import ProductCard from './product'; // Assuming ProductCard is the card component
import { auth, db } from '../../configirations/firebase';

import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const ProductsPage = () => {

    const [Products, setProducts] = React.useState([])

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Product"), (querySnapshot) => {
            let productarr = [];
            querySnapshot.forEach((doc) => {
                productarr.push({ id: doc.id, ...doc.data() }); // Include the document ID if needed
            });
            setProducts(productarr);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleDelete= async(id)=>{
        console.log(id)
        const ProductRef = doc(db, 'Product', id);
        await deleteDoc(ProductRef);
        console.log("deleted")
        
    }

    React.useEffect(() => {
        if (Products.length > 0) {
            console.log(Products);
        }
    }, [Products]);

    return (
        <div>
        <h1>Products</h1>

        {Products.map((v, i) => (
    <ProductCard
        key={i}
        id={v.id || 'No ID'}
        title={v.name || 'No Name Available'}
        category={v.category || 'No Category'}
        imageUrl={v.image[0] || 'placeholder.jpg'}
        onDelete={(id) => handleDelete(id)} // Define `handleDelete` function
    />
))}
    </div>
    );
};

export default ProductsPage;
