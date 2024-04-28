import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./OTP.css";
import Nav from "../Nav/Nav";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
    if (!otp) {
      Swal.fire("Error!", "Please enter the OTP code.", "error");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/v1/auth/reset-pass/otp`, {
        otp,
        email,
      });
      Swal.fire(
        "Success!",
        "OTP Verified Successfully. Your password is 1234. Change this after Login!",
        "success"
      );
      navigate("/login");
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  };

  const resendOtp = async () => {
    alert("otp resent works! this is dummy resent window");
  };

  return (
    <div>
      <Nav />
      <div className="otp-verification-container">
        <h1>Verify OTP</h1>
        <p>
          A verification code has been sent to your email address: {email}.
          Please enter the code below to reset your password.
        </p>
        <input
          type="text"
          placeholder="Enter OTP Code"
          value={otp}
          onChange={handleOtpChange}
        />

        <button onClick={verifyOtp}>Verify OTP</button>
        <button onClick={resendOtp}>Resend OTP</button>
      </div>
    </div>
  );
};

export default OTP;
