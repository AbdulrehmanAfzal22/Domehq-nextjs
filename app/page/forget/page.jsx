"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import "../login/auth.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkIfEmailExists = async (email) => {
    try {
      // Check in users collection
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return true; // Email found in users collection
      }

      // Also check if it might be a phone-based account
      const phoneQ = query(usersRef, where("authEmail", "==", email));
      const phoneSnapshot = await getDocs(phoneQ);
      
      return !phoneSnapshot.empty;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    // Validation
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Check if email exists in database
      const emailExists = await checkIfEmailExists(email);

      if (!emailExists) {
        setError("This email is not registered. Please check your email or create a new account.");
        setLoading(false);
        return;
      }

      // Step 2: Check if it's a phone-based account
      const usersRef = collection(db, "users");
      const phoneQ = query(usersRef, where("authEmail", "==", email));
      const phoneSnapshot = await getDocs(phoneQ);
      
      if (!phoneSnapshot.empty) {
        setError("This account was created using phone number. Please login with your phone number instead.");
        setLoading(false);
        return;
      }

      // Step 3: Send password reset email
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox and spam folder.");
      setEmail(""); // Clear the input
    } catch (err) {
      console.error("Password reset error:", err);
      
      // Handle specific Firebase errors
      if (err.code === "auth/user-not-found") {
        setError("This email is not registered. Please check your email or create a new account.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address. Please check and try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.");
      } else {
        setError(err.message || "Failed to send reset email. Please try again.");
      }
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
            disabled={loading}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleResetPassword();
              }
            }}
          />
          <small style={{ color: "#666", fontSize: "12px", marginTop: "5px", display: "block" }}>
            We'll send you a link to reset your password
          </small>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              color: "#dc3545",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              padding: "10px",
              borderRadius: "4px",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div
            style={{
              color: "#155724",
              backgroundColor: "#d4edda",
              border: "1px solid #c3e6cb",
              padding: "10px",
              borderRadius: "4px",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <button
          className="btn-primary"
          onClick={handleResetPassword}
          disabled={loading}
          style={{ marginTop: "15px" }}
        >
          {loading ? "Checking..." : "Send Reset Email"}
        </button>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Remember your password?{" "}
            <Link 
              href="/page/login" 
              style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}
            >
              Sign In
            </Link>
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            Don't have an account?{" "}
            <Link 
              href="/page/register" 
              style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
