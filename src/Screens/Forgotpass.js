import React, { useState } from 'react';
import Input from '../comp/Input';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../configirations/firebase';
import swal from 'sweetalert'; // SweetAlert for user notifications

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = () => {

    console.log(email)
    if (!email) {
      swal({
        title: "Error",
        text: "Please enter your email address.",
        icon: "error",
        button: "OK",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        swal({
          title: "Success",
          text: "Password reset email sent! Please check your inbox.",
          icon: "success",
          button: "OK",
        });
        setEmail(''); // Clear email input after sending reset email
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        // Show SweetAlert error message
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
          button: "Try Again",
        });
      });
  };

  return (
    <>
      <div className="my-4">
        <h1 className="text-center">Forgot Password</h1>
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

              <div className="d-grid mt-4">
                <button onClick={handleResetPassword} type="button" className="btn btn-outline-primary">
                  Send Password Reset Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
