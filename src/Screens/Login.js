import React, { useState } from 'react';
import Input from '../comp/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import { Password } from '@mui/icons-material';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../configirations/firebase';


export default function Contact() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  let navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  const login = () => {
    let userdata = {
      email,
      pass,
    };

    signInWithEmailAndPassword(auth, userdata.email, userdata.pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user)
    setEmail('');
    setPass('');
    navigate("/")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });

  };

  return (
    <>
      <div className="my-4">
        <h1 className="text-center f">Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form>
              <Input
                title="Email address"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />

              <Input
                title="Password"
                type="password"
                value={pass}
                onChange={handlePassChange}
              />

              <div className="d-grid mt-4">
                <button onClick={login} type="button" className="btn btn-outline-primary">
                  Submit
                </button>
              </div>

              <div className="text-center mt-3">
                <NavLink to="/signup">Don't Have an account?</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
