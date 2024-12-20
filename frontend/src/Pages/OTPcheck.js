import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/OTPcheck.css";

const OtpCheckPage = () => {
    const location = useLocation();
    const email = location.state?.email;  // Retrieve email from location.state
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/users/verify_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code: otp }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("OTP verified successfully!");
                navigate("/"); 
            } else {
                setError(data.error || "Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="otp-container">
            <h2>Enter OTP</h2>

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button className="main-btn" onClick={handleVerifyOtp}>
                Verify
            </button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default OtpCheckPage;
