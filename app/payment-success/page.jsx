"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./PaymentSuccess.css";

export default function PaymentSuccessPage({ searchParams }) {
  const params = use(searchParams);
  const uid = params.uid;
  const mock = params.mock;
  const plan = params.plan;
  const amount = params.amount;
  
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    if (!uid) {
      setStatus("No transaction found");
      return;
    }

    // Simulate payment verification
    setTimeout(() => {
      if (mock === "true") {
        setStatus("Mock Payment Successful!");
      } else {
        setStatus("Payment Successful!");
        // TODO: Add real payment verification with SkipCash webhook
      }
    }, 1500);
  }, [uid, mock]);

  return (
    <div className="payment-success-container">
      <div className="success-card">
        {status.includes("Successful") ? (
          <>
            <div className="success-icon">✓</div>
            <h1>{status}</h1>
            {mock === "true" && (
              <p className="mock-notice">
                This is a test payment. Real integration pending.
              </p>
            )}
            <div className="payment-details">
              <p><strong>Plan:</strong> {plan || "Creator"}</p>
              <p><strong>Amount:</strong> ${(parseInt(amount) / 100).toFixed(2)}</p>
              <p><strong>Transaction ID:</strong> {uid}</p>
            </div>
            <div className="button-group">
              <button 
                className="btn-primary" 
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => router.push("/")}
              >
                Return to Home
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="loading-spinner"></div>
            <h1>{status}</h1>
          </>
        )}
      </div>
    </div>
  );
}