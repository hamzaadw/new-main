import React, { useState, useEffect, useContext } from 'react';
import './nav.css';
import Filter from '../comp/Filter';
import Courasla from '../comp/Courasla';
import Navbbar from '../comp/navbbar';
import Cards from '../comp/Cards';
import { collection, query, getDocs, where, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../configirations/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import BasicModal from '../comp/BasicModal';
import Navbarrer from '../comp/Navbar/Nav';
import CurrentUserId from '../comp/context rating/RatingsContext';
import { Divider } from 'antd';
import moment from 'moment'; // Import moment.js for date handling
import dayjs from 'dayjs'; // Importing Day.js

function Shop() {
  const [data, setData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [IsUser, setIsUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [uid, setuid] = useState();
  const [value, setValue] = useContext(CurrentUserId);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    const UserInThere = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setuid(uid);
        console.log(uid);
        setIsUser(true);
        setValue(uid);
      } else {
        setIsUser(false);
      }
    });
    return UserInThere;
  }, []);

  const view = async (id) => {
    console.log(id);

    const gettingSpecific = async () => {
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

    await gettingSpecific();
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
      console.log(products);

      // Handle Trending Products (shuffle and select 8)
      const shuffledProducts = shuffleArray(products);
      setTrendingProducts(shuffledProducts.slice(0, 8));

      // Handle New Arrivals (filter for the latest month)
      const currentDate = moment(); // Get the current date
      const newArrivalsList = products.filter((product) => {
        const productDate = moment(product.createdAt?.toDate()); // Assuming createdAt is a Firestore timestamp
        return currentDate.diff(productDate, 'months') < 1; // Check if the product is less than a month old
      });
      setNewArrivals(newArrivalsList.slice(0, 6)); // Show 6 latest products
    };

    gettingProducts();
  }, []);

  return (
    <>
      <Navbarrer />
      <Courasla />

      <BasicModal uid={uid} ProductDetail={detail} handleClose={() => setOpen(false)} open={open} />

      <Divider />
      <Divider />
      <div className='text-center'>
        <h1 className='text-center'>——Trending Products——</h1>
        <p className='text-center'>Embrace the Latest Trends - Shop our Trendy Outfit Selection</p>
      </div>

      {/* Trending Products */}
      <div className="container-fluid d-flex mt-5">
        <div className="row w-100">
          <div className="col-12 d-flex justify-content-center flex-wrap gap-4">
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
        </div>
      </div>

      <Divider />
      <Divider />

      <div className='text-center'>
        <h1 className='text-center'>——New Arrivals——</h1>
        <p className='text-center'>Discover Our Latest Additions - Shop Fresh Arrivals Now</p>
      </div>

      {/* New Arrivals */}
      <div className="container-fluid d-flex mt-5">
        <div className="row w-100">
          <div className="col-12 d-flex justify-content-center flex-wrap gap-4">
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
        </div>
      </div>
    </>
  );
}

export default Shop;
