"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase"; // adjust the path to your firebase.js
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Forgot Password</h2>
        <p className="subtitle">Enter your email to reset your password</p>

        <div className="input-group">
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
        {message && <p style={{ color: "green", marginTop: "5px" }}>{message}</p>}

        <button
          className="btn-primary"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>

        <p style={{ marginTop: "10px" }}>
          Remember your password? <Link href="/page/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
