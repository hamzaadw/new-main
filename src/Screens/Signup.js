import React, { useState } from 'react';
import Input from '../comp/Input';
import { auth, db } from "../configirations/firebase";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import swal from 'sweetalert'; // Import SweetAlert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import Eye icons

export default function Signup() {
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  let navigate = useNavigate();

  const handleConfirmChange = (event) => {
    setConfirm(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
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
        const user = userCredential.user;
        console.log(user);

        await setDoc(doc(db, "Users", user.uid), {
          email: userdata.email,
          pass: userdata.pass,
        });

        setEmail("");
        setPass("");
        setConfirm("");

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        swal({
          title: "Signup Failed",
          text: errorMessage,
          icon: "error",
          button: "Try Again",
        });
      });
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
    },
    inputGroup: {
      position: 'relative',
      marginTop: '20px',
    },
    icon: {
      position: 'absolute',
      right: '10px',
      top: '70%',
      transform: 'translateY(-50%)', // Align icon vertically
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
    },
    input: {
      paddingRight: '40px',
      width: '100%', // Set width to 100%
      borderRadius: '30px', // Optional: add border radius
    },
    button: {
      borderRadius: '30px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: 'rgba(243, 114, 157, 0.2)',
    },
    heading: {
      color: '#333',
      fontFamily: 'Lemon/Milk light, sans-serif',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <>
      <div className="my-4">
        <h1 style={styles.heading} className="text-center f">Signup</h1>
      </div>

      <div style={styles.container} className="container">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form>
              <Input
                title="Email address"
                type="email"
                value={email}
                onChange={handleEmailChange}
                style={styles.input} // Apply styles to the Input component
              />
              
              <div style={styles.inputGroup}>
                <Input
                  title="Password"
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password
                  value={pass}
                  onChange={handlePassChange}
                  style={styles.input} // Apply styles to the Input component
                />
                <span
                  style={styles.icon}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </span>
              </div>

              <div style={styles.inputGroup}>
                <Input
                  title="Confirm Password"
                  type={confirmPasswordVisible ? "text" : "password"} // Toggle between text and password
                  value={confirm}
                  onChange={handleConfirmChange}
                  style={styles.input} // Apply styles to the Input component
                />
                <span
                  style={styles.icon}
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="d-grid mt-4">
                <button
                  onClick={sign}
                  type="button"
                  className="btn btn-outline-primary"
                  style={styles.button}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  Submit
                </button>

                <div className="text-center mt-3">
                  <NavLink to="/login" style={styles.link}>Do you have an account?</NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
