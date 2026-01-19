"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    const res = await fetch("/api/skipcash/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: "10.00",
        firstName: "John",
        lastName: "Doe",
        phone: "966500000000",
        email: "john@example.com",
        plan: "basic",
      }),
    });

    const data = await res.json();
    window.location.href = data.payUrl;
  };

  return (
    <button onClick={handlePay} disabled={loading}>
      {loading ? "Redirecting..." : "Pay with SkipCash"}
    </button>
  );
}
