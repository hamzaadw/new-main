import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configirations/firebase';
import MediaControlCard from '../comp/BasicCard';
import Navbarrer from '../comp/Navbar/Nav';
import { auth } from '../configirations/firebase';
import  { onAuthStateChanged } from 'firebase/auth';

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [detail, setDetail] = useState(null);
    const [uid, setUid] = useState(null);


    useEffect(() => {
        const UserInThere = onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
        
            console.log(uid);
       
            setUid(uid);
          } else {
            console.log("not found")
           
          }
        });
        return UserInThere;
      }, []);



    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const docRef = doc(db, 'Product', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDetail({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error getting document: ', error);
            }
        };

        fetchProductDetail();
    }, [id]);

    return (
        <>
        <Navbarrer/>
        <div>
            {detail ? <MediaControlCard detail={detail} uid={uid} /> : <p>Loading...</p>}
        </div></>
    );
};

export default ProductDetailsPage;
