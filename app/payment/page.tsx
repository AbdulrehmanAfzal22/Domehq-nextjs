"use client";

import { useEffect, useState } from "react";

export default function PaymentSuccessPage({ searchParams }) {
  const uid = searchParams.uid;
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/skipcash/status?uid=${uid}`);
      const data = await res.json();

      if (data.status === "PAID") {
        setStatus("Payment Successful");
        clearInterval(interval);
      } else if (data.status === "FAILED") {
        setStatus("Payment Failed");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [uid]);

  return <div>{status}</div>;
}
