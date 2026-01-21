"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "../../firebase";
import { applyActionCode, checkActionCode } from "firebase/auth";
import "./verify.css";
  import { Suspense } from "react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("checking"); // checking, success, error, waiting
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    // If this is a verification link from Firebase email
    if (mode === "verifyEmail" && oobCode) {
      handleEmailVerification(oobCode);
    } else {
      // No verification code, just checking if user is already verified
      checkCurrentUser();
    }
  }, [searchParams]);

  const handleEmailVerification = async (oobCode) => {
    try {
      // Step 1: Verify the action code is valid
      await checkActionCode(auth, oobCode);
      
      // Step 2: Apply the action code (verify the email)
      await applyActionCode(auth, oobCode);
      
      // Step 3: Show success message
      setStatus("success");
      setMessage("Your email has been verified successfully!");
      
      // Step 4: Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/page/login");
      }, 2000);
      
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
      
      if (error.code === "auth/invalid-action-code") {
        setMessage("This verification link is invalid or has already been used.");
      } else if (error.code === "auth/expired-action-code") {
        setMessage("This verification link has expired. Please request a new one.");
      } else {
        setMessage("Verification failed. Please try again or contact support.");
      }
    }
  };

  const checkCurrentUser = async () => {
    const user = auth.currentUser;
    
    if (user) {
      // Reload user to get latest emailVerified status
      await user.reload();
      
      if (user.emailVerified) {
        setStatus("success");
        setMessage("Your email is already verified!");
        setTimeout(() => {
          router.push("/page/login");
        }, 1500);
      } else {
        setStatus("waiting");
        setMessage("Please check your inbox and click the verification link.");
      }
    } else {
      // No user logged in, redirect to login
      setStatus("waiting");
      setMessage("Please login to continue.");
      setTimeout(() => {
        router.push("/page/login");
      }, 2000);
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        {status === "checking" && (
          <>
            <div className="spinner"></div>
            <h2 className="title">Verifying...</h2>
            <p className="message">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="success-icon">✓</div>
            <h2 className="title" style={{ color: "#28a745" }}>
              Email Verified!
            </h2>
            <p className="message">{message}</p>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
              Redirecting to login page...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="error-icon">✗</div>
            <h2 className="title" style={{ color: "#dc3545" }}>
              Verification Failed
            </h2>
            <p className="message">{message}</p>
            <a href="/page/login">
              <button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Go to Login
              </button>
            </a>
          </>
        )}

        {status === "waiting" && (
          <>
            <div className="waiting-icon">📧</div>
            <h2 className="title">Check Your Email</h2>
            <p className="message">{message}</p>
            <a href="/page/login">
              {/* <button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Go to Login
              </button> */}
            </a>
          </>
        )}
      </div>

      <style jsx>{`
        .verify-email-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .verify-email-card {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }

        .title {
          font-size: 24px;
          margin-bottom: 15px;
          color: #333;
        }

        .message {
          color: #666;
          font-size: 16px;
          line-height: 1.5;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #28a745;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin: 0 auto 20px;
        }

        .error-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #dc3545;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin: 0 auto 20px;
        }

        .waiting-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        a {
          text-decoration: none;
        }

        button:hover {
          background: #0056b3 !important;
        }
      `}</style>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}><p>Loading...</p></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
