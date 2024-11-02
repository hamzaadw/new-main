import  Router  from './configirations/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { useState } from 'react';

import CurrentUserId from './comp/context rating/RatingsContext';
import Checkout from './comp/Dashboard/Cheakout/Checkout';
import Navbarrer from './comp/Navbar/Nav';
import AnnouncementBar from './comp/AnnouncementBar';
import Footer from './comp/Footer';


function App() {

  const [value, setvalue] = useState(null);

  return (
<>
<AnnouncementBar/>



<Router/>


{/* <Footer/> */}
</>
  );
}

export default App;
