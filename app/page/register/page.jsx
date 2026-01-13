"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // make sure path is correct
import { useRouter } from "next/navigation";
import "../login/auth.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Map Firebase error codes to friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please login instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
     
      router.push("/page/login");
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err.code)); 
    } finally {
      setLoading(false);
    }
  };

  return (
     
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Create Account</h2>
        
        <Link href="/page/login">
          <p className="subtitle">
            Create a new account to save your chats and preferences
          </p>
        </Link>

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

        <div className="input-group">
          <div className="password-row">
            <label className="label">Password</label>
            <Link className="forgot" href="#">
              Forgot password?
            </Link>
          </div>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
        </div>

        {/* Custom error */}
        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

        <button
          className="btn-primary"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="create-text">
          Already have an account?{" "}
          <Link className="create-link" href="/page/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
