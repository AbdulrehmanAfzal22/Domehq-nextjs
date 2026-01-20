"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./Inquiries.css";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInquiries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) return <p>Loading inquiries...</p>;

  return (
    <div className="inquiries-page">
      <button className="back-btn1" onClick={() => router.back()}>
        ← Back
      </button>

      <h2>All Inquiries</h2>

      <div className="cards-container">
        {inquiries.length === 0 ? (
          <p style={{ textAlign: "center", color: "#fff" }}>No inquiries yet</p>
        ) : (
          inquiries.map((inq, index) => (
            <div key={inq.id} className="inquiry-card">
              <p><strong>#:</strong> {index + 1}</p>
              <p><strong>Name:</strong> {inq.name}</p>
              <p><strong>Email:</strong> {inq.email}</p>
              <p><strong>Phone:</strong> {inq.phone}</p>
              <p><strong>Job Type:</strong> {inq.jobType}</p>
              <p><strong>Message:</strong> {inq.message}</p>
              <p><strong>Submitted:</strong> {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleString() : "—"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
