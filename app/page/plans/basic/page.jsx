"use client";
import { useState } from "react";
import "./basics.css";

export default function CreatorPlan() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!first.trim() || !last.trim() || !email.trim()) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/skipcash/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first,
          last,
          email,
          phone,
          plan: "creator",
        }),
      });

      const data = await res.json();
      
      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (!res.ok) {
        console.error("Backend error:", data);
        // Show the actual error from SkipCash
        alert(`Payment Error: ${data.error}\n\nDetails: ${JSON.stringify(data.details, null, 2)}`);
        setLoading(false);
        return;
      }

      if (data?.payUrl) {
        console.log("Redirecting to:", data.payUrl);
        window.location.href = data.payUrl;
      } else {
        alert("No payment URL received from SkipCash");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="creator-plan-container">
      <div className="creator-plan-card">
        <button
          className="close-btn"
          onClick={() => window.history.back()}
          disabled={loading}
        >
          ×
        </button>

        <h2 className="creator-plan-title">Upgrade to Creator Plan</h2>
        <div className="creator-plan-description">
          363 messages / day • 1-month subscription
        </div>

        <form className="creator-plan-form" onSubmit={handlePay}>
          <div className="creator-form-group">
            <label htmlFor="first">First Name</label>
            <input
              id="first"
              name="first"
              type="text"
              required
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="creator-form-group">
            <label htmlFor="last">Last Name</label>
            <input
              id="last"
              name="last"
              type="text"
              required
              value={last}
              onChange={(e) => setLast(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="creator-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="creator-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="creator-subscribe-button"
            disabled={loading}
          >
            {loading ? "Processing..." : "Subscribe for $24.99/month"}
          </button>
        </form>
      </div>
    </div>
  );
}