import React, { useState } from 'react';
import Input from '../comp/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../configirations/firebase';
import swal from 'sweetalert'; // Import SweetAlert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import Eye icons

export default function Contact() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
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
        console.log(user);
        setEmail('');
        setPass('');
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        // Show SweetAlert error message
        swal({
          title: "Login Failed",
          text: errorMessage,
          icon: "error",
          button: "Try Again",
        });
      });
  };

  // Inline styles
  const styles = {
    inputGroup: {
      position: 'relative',
      marginTop: '20px',
    },
    eyeIcon: {
      position: 'absolute',
      right: '10px',
      top: '70%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
    },
    button: {
      borderRadius: '30px',
      transition: 'background-color 0.3s',
    },
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

              <div style={styles.inputGroup}>
                <Input
                  title="Password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  value={pass}
                  onChange={handlePassChange}
                />
                <span 
                  style={styles.eyeIcon} 
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="d-grid mt-4">
                <button onClick={login} type="button" className="btn btn-outline-primary" style={styles.button}>
                  Submit
                </button>
              </div>

              <div className="text-center mt-3">
                <NavLink to="/forgot-password">Forgot your password?</NavLink>
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
