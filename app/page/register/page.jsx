"use client";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import "../login/auth.css";

export default function RegisterPage() {
  const router = useRouter();

  const [registrationMethod, setRegistrationMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Generate random 6-digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // EMAIL REGISTRATION
  const handleEmailRegistration = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Store user data in Firestore with 'emailVerified: false' initially
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        registrationMethod: "email",
        createdAt: new Date().toISOString(),
        emailVerified: false, 
      });

      setSuccess("Account created successfully! Please verify your email.");
      setTimeout(() => router.push("/page/verify"), 1000); 
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setError("");
    setSuccess("");

    if (!phone) {
      return setError("Please enter your phone number");
    }

    if (!validatePhone(phone)) {
      return setError("Invalid phone number format (use +923001234567)");
    }

    setLoading(true);

    setTimeout(() => {
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      setStep(2);
      setSuccess(`OTP Generated: ${newOtp}`);
      setLoading(false);
      
      console.log(`[DEMO] SMS to ${phone}: Your OTP is ${newOtp}`);
    }, 1000);
  };

  const verifyOtpAndRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 6) {
      setLoading(false);
      return setError("Please enter a valid 6-digit OTP");
    }

    if (otp !== generatedOtp) {
      setLoading(false);
      return setError("Invalid OTP. Please check the code displayed above.");
    }

    try {
     
      const cleanPhone = phone.replace(/\+/g, "").replace(/\s/g, "");
      const dummyEmail = `phone_${cleanPhone}@domehq.app`;
      const dummyPassword = `${phone}${otp}SecurePass!`;

      const userCredential = await createUserWithEmailAndPassword(auth, dummyEmail, dummyPassword);
      
      await updateProfile(userCredential.user, {
        displayName: phone,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        phoneNumber: phone,
        registrationMethod: "phone",
        createdAt: new Date().toISOString(),
        authEmail: dummyEmail,
      });

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error("Verification error:", err);
      
      if (err.code === "auth/email-already-in-use") {
        setError("This phone number is already registered.");
      } else {
        setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = () => {
    setOtp("");
    setGeneratedOtp("");
    sendOtp();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Demo: OTP shown on screen</p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => {
              setRegistrationMethod("email");
              setError("");
              setSuccess("");
              setStep(1);
              setGeneratedOtp("");
              setOtp("");
            }}
            style={{
              flex: 1,
              padding: "10px",
              border: `2px solid ${registrationMethod === "email" ? "#007bff" : "#ddd"}`,
              background: registrationMethod === "email" ? "#e7f3ff" : "white",
              color: registrationMethod === "email" ? "#007bff" : "#666",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Email
          </button>
          <button
            onClick={() => {
              setRegistrationMethod("phone");
              setError("");
              setSuccess("");
              setStep(1);
              setGeneratedOtp("");
              setOtp("");
            }}
            style={{
              flex: 1,
              padding: "10px",
              border: `2px solid ${registrationMethod === "phone" ? "#007bff" : "#ddd"}`,
              background: registrationMethod === "phone" ? "#e7f3ff" : "white",
              color: registrationMethod === "phone" ? "#007bff" : "#666",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Phone
          </button>
        </div>

        {registrationMethod === "email" && (
          <>
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
              <label className="label">Password</label>
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
              <small style={{ color: "#666", fontSize: "12px" }}>
                Minimum 6 characters
              </small>
            </div>

            <button
              className="btn-primary"
              onClick={handleEmailRegistration}
              disabled={loading}
              style={{ marginTop: "10px" }}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </>
        )}

        {registrationMethod === "phone" && (
          <>
            {step === 1 && (
              <div className="input-group">
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+923001234567"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
                <div
                  style={{
                    background: "#fff3cd",
                    padding: "10px",
                    borderRadius: "4px",
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "#856404",
                  }}
                >
                  <strong>📱 Demo Mode:</strong><br />
                  Enter phone number with country code<br />
                  OTP will be shown on screen (no SMS sent)
                </div>
                <button
                  className="btn-primary"
                  onClick={sendOtp}
                  disabled={loading}
                  style={{ marginTop: "10px" }}
                >
                  {loading ? "Generating OTP..." : "Send OTP"}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="input-group">
                <label className="label">Enter OTP</label>
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
                  Sent to: {phone}
                </p>
                
                <div
                  style={{
                    background: "#d4edda",
                    border: "2px solid #28a745",
                    padding: "15px",
                    borderRadius: "6px",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#155724", fontSize: "12px", marginBottom: "5px" }}>
                    📨 Your OTP Code:
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#28a745",
                      letterSpacing: "8px",
                      fontFamily: "monospace",
                    }}
                  >
                    {generatedOtp}
                  </div>
                  <div style={{ color: "#155724", fontSize: "11px", marginTop: "5px" }}>
                    (Demo: In production, sent via SMS)
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  disabled={loading}
                  autoFocus
                  style={{ textAlign: "center", fontSize: "20px", letterSpacing: "5px" }}
                />
                <button
                  className="btn-primary"
                  onClick={verifyOtpAndRegister}
                  disabled={loading || otp.length !== 6}
                  style={{ marginTop: "10px" }}
                >
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </button>
                <button
                  onClick={resendOtp}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                    background: "transparent",
                    color: "#007bff",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  Resend OTP
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setGeneratedOtp("");
                  }}
                  disabled={loading}
                  style={{
                    marginTop: "5px",
                    marginLeft: "15px",
                    background: "transparent",
                    color: "#6c757d",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  Change Number
                </button>
              </div>
            )}
          </>
        )}

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
        {/* {success && (
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
        )} */}

        <p className="create-text" style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link className="create-link" href="/page/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
