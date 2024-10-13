import React, { useState, useEffect, useContext } from 'react';
import './nav.css';
import Courasla from '../comp/Courasla';
import Navbarrer from '../comp/Navbar/Nav';
import Cards from '../comp/Cards';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../configirations/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import BasicModal from '../comp/BasicModal';
import { Divider } from 'antd';
import moment from 'moment'; 

function Shop() {
    const [data, setData] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(false);
    const [uid, setUid] = useState();

    useEffect(() => {
        const UserInThere = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUid(uid);
                console.log(uid);
            }
        });
        return UserInThere;
    }, []);

    const view = async (id) => {
        console.log(id);
        try {
            const docRef = doc(db, 'Product', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDetail({ id: docSnap.id, ...docSnap.data() }, id);
                setOpen(true);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document: ', error);
        }
    };

    useEffect(() => {
        const gettingProducts = async () => {
            const q = query(collection(db, 'Product'));
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() });
            });
            setData(products);

            // Handle Trending Products (shuffle and select 8)
            const shuffledProducts = shuffleArray(products);
            setTrendingProducts(shuffledProducts.slice(0, 8));

            // Handle New Arrivals (filter for the latest month)
            const currentDate = moment(); 
            const newArrivalsList = products.filter((product) => {
                const productDate = moment(product.createdAt?.toDate()); 
                return currentDate.diff(productDate, 'months') < 1; 
            });
            setNewArrivals(newArrivalsList.slice(0, 6)); 
        };

        gettingProducts();
    }, []);

    const shuffleArray = (array) => {
        return array.sort(() => 0.5 - Math.random());
    };

    return (
        <>
            <Navbarrer />
            <Courasla />

            <BasicModal uid={uid} ProductDetail={detail} handleClose={() => setOpen(false)} open={open} />

            <Divider />
            <div className='text-center'>
                <h1 className='text-center'>——Trending Products——</h1>
                <p className='text-center'>Embrace the Latest Trends - Shop our Trendy Outfit Selection</p>
            </div>

            {/* Trending Products */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {trendingProducts.map((v) => (
                    <Cards
                        view={view}
                        setOpen={setOpen}
                        id={v.id}
                        key={v.id}
                        image={v.image[0]}
                        name={v.name}
                        price={v.price}
                        rating={v.rating}
                    />
                ))}
            </div>

            <Divider />
            <div className='text-center'>
                <h1 className='text-center'>——New Arrivals——</h1>
                <p className='text-center'>Discover Our Latest Additions - Shop Fresh Arrivals Now</p>
            </div>

            {/* New Arrivals */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {newArrivals.map((v) => (
                    <Cards
                        view={view}
                        setOpen={setOpen}
                        id={v.id}
                        key={v.id}
                        image={v.image[0]}
                        name={v.name}
                        price={v.price}
                        rating={v.rating}
                    />
                ))}
            </div>
        </>
    );
}

export default Shop;
