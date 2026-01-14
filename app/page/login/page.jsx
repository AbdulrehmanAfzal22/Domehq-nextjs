"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import "../login/auth.css";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Map Firebase error codes to your custom messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again!";
      case "auth/invalid-email":
        return "Please enter a valid email.";
      case "auth/popup-closed-by-user":
        return "Google login was canceled.";
      case "auth/popup-blocked":
        return "Popup blocked. Please allow popups for this site.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  // Email/Password Login
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect to main page
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/"); // redirect to main page
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="title">Sign In</h2>
          <button className="close-btn" onClick={() => router.push("/")} aria-label="Close">
            ×
          </button>
        <p className="subtitle">Sign in to access your account and chat history</p>

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
          <Link className="forget" href="/page/forget">Forget password</Link>
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

        {/* Display custom error */}
        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

        <button
          className="btn-primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

  

<button 
  className="btn-google"
  onClick={handleGoogleLogin}
  disabled={loading}
>
  <svg width="20" height="20" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M255.68 133.45c0-10.72-.96-20.92-2.72-30.68H130.56v58.16h70.16c-3.04 16.48-12.16 30.4-25.92 39.84v33.12h41.92c24.48-22.56 39.04-55.84 39.04-100.44z"/>
    <path fill="#34A853" d="M130.56 261.31c35.2 0 64.8-11.68 86.4-31.84l-41.92-33.12c-11.52 7.76-26.24 12.48-44.48 12.48-34.24 0-63.36-23.12-73.76-54.16H13.12v34.08c21.28 42.72 65.12 72.56 117.44 72.56z"/>
    <path fill="#FBBC05" d="M56.8 154.67c-4.8-14.24-4.8-29.6 0-43.84V76.75H13.12c-18.72 36.8-18.72 80.32 0 117.12L56.8 154.67z"/>
    <path fill="#EA4335" d="M130.56 50.11c18.72 0 35.52 6.4 48.64 18.88l36.48-36.48C195.36 10.59 165.76 0 130.56 0 78.24 0 34.4 29.84 13.12 72.56l43.68 34.08c10.4-31.04 39.52-54.16 73.76-54.16z"/>
  </svg>
  Continue with Google
</button>

        <p className="create-text">
          Don’t have an account?{" "}
          <Link className="create-link" href="/page/register">Create an account</Link>
        </p>

      </div>
    </div>
  );
}
