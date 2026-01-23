"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Import your firebase config
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions
import { useAuth } from "../firebase/AuthContext"; // To get user data
import { useRouter } from "next/navigation"; // To navigate between pages
import "./my-quiries.css";

export default function MyInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the current user
  const router = useRouter();

  useEffect(() => {
    // Wait until the user state is fully initialized before making any decisions
    if (user === undefined) {
      return; // Don't proceed with fetching inquiries until user state is set
    }

    if (!user) {
      router.push("/page/my-quiries"); // If no user is logged in, redirect to login page
      return;
    }

    const fetchInquiries = async () => {
      try {
        // Query to get inquiries submitted by the logged-in user based on their email
        const q = query(
          collection(db, "inquiries"),
          where("email", "==", user.email) // Filter by the logged-in user's email
        );
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
  }, [user, router]); // Re-run the effect when user or router changes

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <div className="my-inquiries-page">
      <h2>My Inquiries</h2>

      {/* Back Button */}
      <button className="back-btn" onClick={() => router.back()}>
        ← Back
      </button>

      {/* If there are no inquiries */}
      {inquiries.length === 0 ? (
        <p>No inquiries found</p>
      ) : (
        <div className="inquiries-list">
          {inquiries.map((inq, index) => (
            <div key={inq.id} className="inquiry-card">
              <p><strong>#{index + 1}</strong></p>
              <p><strong>Name:</strong> {inq.name}</p>
              <p><strong>Email:</strong> {inq.email}</p>
              <p><strong>Phone:</strong> {inq.phone}</p>
              <p><strong>Job Type:</strong> {inq.jobType}</p>
              <p><strong>Message:</strong> {inq.message}</p>
              <p><strong>Submitted:</strong> {inq.createdAt?.toDate?.().toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
