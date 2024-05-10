import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ResetPassword.css";
import Nav from "../Nav/Nav";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetEmail = (e) => {
    setEmail(e.target.value);
  };

  const initiatePasswordReset = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    try {
      await axios.get(`http://localhost:8070/api/v1/auth/reset-pass/${email}`);
      Swal.fire(
        "Success!",
        "A password reset OTP Code has been sent to your email address.",
        "success"
      );
      navigate(`/otp-sent/${email}`);
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  };

  return (
    <div>
      <Nav />
      <div className="reset-password-container">
        <h1>Reset Password</h1>
        <p>
          Enter your email address and we will send you a link to reset your
          password.
        </p>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleResetEmail}
        />
        <button onClick={initiatePasswordReset}>Send OTP</button>
      </div>
    </div>
  );
};

export default ResetPassword;
