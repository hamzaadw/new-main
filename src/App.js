import  Router  from './configirations/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { useState } from 'react';

import CurrentUserId from './comp/context rating/RatingsContext';
import Checkout from './comp/Dashboard/Cheakout/Checkout';
import Navbarrer from './comp/Navbar/Nav';


function App() {

  const [value, setvalue] = useState(null);

  return (
<>

<CurrentUserId.Provider  value={[value, setvalue]} >

<Router/>


</CurrentUserId.Provider >
</>
  );
}

export default App;
