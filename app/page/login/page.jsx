"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import "../login/auth.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const router = useRouter();

  // 🔑 IMPORTANT: Replace this with your actual reCAPTCHA site key
  // Get it from: https://www.google.com/recaptcha/admin
  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // This is a TEST key (works on localhost)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/popup-closed-by-user":
        return "Google login was canceled.";
      case "auth/popup-blocked":
        return "Popup blocked. Please allow popups for this site.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    // Check reCAPTCHA
    if (!recaptchaValue) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData?.registrationMethod === "email" && !user.emailVerified) {
        setError("Please verify your email before logging in.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      try {
        await setDoc(
          doc(db, "users", user.uid),
          { lastLogin: new Date().toISOString() },
          { merge: true }
        );
      } catch (err) {
        console.error("Error updating last login:", err);
      }

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");

    // Check reCAPTCHA
    if (!recaptchaValue) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          registrationMethod: "google",
          createdAt: new Date().toISOString(),
          emailVerified: true,
        });
      } else {
        await setDoc(
          doc(db, "users", user.uid),
          { lastLogin: new Date().toISOString() },
          { merge: true }
        );
      }

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error("Google login error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    if (value) {
      setError(""); // Clear error when reCAPTCHA is completed
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

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <div className="password-row">
              <label className="label">Password</label>
              <Link className="forgot" href="/page/forget">
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
                disabled={loading}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

        
          {error && (
            <div
              style={{
                color: "#dc3545",
                backgroundColor: "#f8d7da",
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
          {success && (
            <div
              style={{
                color: "#155724",
                backgroundColor: "#d4edda",
                padding: "10px",
                borderRadius: "4px",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !recaptchaValue}
            style={{ marginTop: "15px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>


        <button 
          className="btn-google"
          onClick={handleGoogleLogin}
          disabled={loading || !recaptchaValue}
        >
          <svg width="20" height="20" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M255.68 133.45c0-10.72-.96-20.92-2.72-30.68H130.56v58.16h70.16c-3.04 16.48-12.16 30.4-25.92 39.84v33.12h41.92c24.48-22.56 39.04-55.84 39.04-100.44z"/>
            <path fill="#34A853" d="M130.56 261.31c35.2 0 64.8-11.68 86.4-31.84l-41.92-33.12c-11.52 7.76-26.24 12.48-44.48 12.48-34.24 0-63.36-23.12-73.76-54.16H13.12v34.08c21.28 42.72 65.12 72.56 117.44 72.56z"/>
            <path fill="#FBBC05" d="M56.8 154.67c-4.8-14.24-4.8-29.6 0-43.84V76.75H13.12c-18.72 36.8-18.72 80.32 0 117.12L56.8 154.67z"/>
            <path fill="#EA4335" d="M130.56 50.11c18.72 0 35.52 6.4 48.64 18.88l36.48-36.48C195.36 10.59 165.76 0 130.56 0 78.24 0 34.4 29.84 13.12 72.56l43.68 34.08c10.4-31.04 39.52-54.16 73.76-54.16z"/>
          </svg>
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        <p className="create-text" style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link className="create-link" href="/page/register">
            Create an account
          </Link>
        </p>

<div style={{ marginTop: "20px", marginBottom: "20px" }}>
  <div className="recaptcha-container">
    <ReCAPTCHA
      sitekey={RECAPTCHA_SITE_KEY}
      onChange={onRecaptchaChange}
      theme="dark"
    />
  </div>
</div>

<style jsx>{`
  .recaptcha-container {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 20px;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .g-recaptcha {
    display: inline-block;
    width: 100% !important;
    max-width: 100% !important;
  }

  /* Adjusting the text that appears at the bottom of reCAPTCHA */
  .g-recaptcha .recaptcha-footer {
    display: none !important; /* Hides the footer text */
  }

  .g-recaptcha span {
    border-radius: 8px;
  }

`}</style>


      </div>

     
    </div>
  );
}
