import React, { useState } from 'react';
import Input from '../comp/Input';
import { auth, db } from "../configirations/firebase";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import swal from 'sweetalert'; // Import SweetAlert

export default function Signup() {
  const [confirm, setconfirm] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  let navigate = useNavigate();

  const handleNameChange = (event) => {
    setconfirm(event.target.value);
  };

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setpass(event.target.value);
  };

  const sign = () => {
    let userdata = {
      email,
      confirm,
      pass,
    };

    if (userdata.pass !== userdata.confirm) {
      swal({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        button: "Try Again",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, userdata.email, userdata.pass)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        await setDoc(doc(db, "Users", user.uid), {
          email: userdata.email,
          pass: userdata.pass,
        });

        setemail("");
        setpass("");
        setconfirm("");

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        // Show SweetAlert error message
        swal({
          title: "Signup Failed",
          text: errorMessage,
          icon: "error",
          button: "Try Again",
        });
      });
  };

  return (
    <>
      <div className="my-4">
        <h1 className="text-center f">Signup</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form>
              <Input
                title="Email address"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <Input
                title="Password"
                type="password"
                value={confirm}
                onChange={handleNameChange}
              />
              <Input
                title="Confirm Password"
                type="password"
                value={pass}
                onChange={handlePhoneChange}
              />

              <div className="d-grid mt-4">
                <button onClick={sign} type="button" className="btn btn-outline-primary">
                  Submit
                </button>

                <div className="text-center mt-3">
                  <NavLink to="/login">Do you have an account?</NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
