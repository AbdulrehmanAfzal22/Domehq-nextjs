"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./Inquiries.css";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
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
        setFilteredInquiries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // Apply filters whenever search query or selected month changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedMonth, inquiries]);

  const applyFilters = () => {
    let filtered = [...inquiries];

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((inq) => {
        return (
          inq.name?.toLowerCase().includes(lowercasedQuery) ||
          inq.email?.toLowerCase().includes(lowercasedQuery) ||
          inq.phone?.toLowerCase().includes(lowercasedQuery) ||
          inq.jobType?.toLowerCase().includes(lowercasedQuery) ||
          inq.message?.toLowerCase().includes(lowercasedQuery)
        );
      });
    }

    // Apply month filter
    if (selectedMonth !== "") {
      filtered = filtered.filter((inq) => {
        if (!inq.createdAt?.toDate) return false;
        const inquiryMonth = inq.createdAt.toDate().getMonth();
        return inquiryMonth === parseInt(selectedMonth);
      });
    }

    setFilteredInquiries(filtered);
  };

  // Full Screen Loading UI
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-box">
          <div className="spinner"></div>
          <h3>Your inquiries are loading...</h3>
          <p>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inquiries-page">
      <button className="back-btn1" onClick={() => router.back()}>
        ← Back
      </button>

      <h2>All Inquiries</h2>

      <div className="filters">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Month Dropdown */}
        <div className="month-filter">
          <select
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
          >
            <option value="">All Months</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p style={{ color: "#fff", marginBottom: "20px", fontSize: "14px" }}>
        Showing {filteredInquiries.length} of {inquiries.length} inquiries
        {searchQuery && ` matching "${searchQuery}"`}
        {selectedMonth !== "" && ` in ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][parseInt(selectedMonth)]}`}
      </p>

      <div className="cards-container">
        {filteredInquiries.length === 0 ? (
          <div style={{ textAlign: "center", color: "#fff", padding: "40px" }}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>No inquiries found</p>
            <p style={{ fontSize: "14px", opacity: 0.8 }}>
              {searchQuery || selectedMonth !== "" 
                ? "Try adjusting your filters" 
                : "No inquiries have been submitted yet"}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inq, index) => (
            <div key={inq.id} className="inquiry-card">
              <p><strong>#:</strong> {index + 1}</p>
              <p><strong>Name:</strong> {inq.name}</p>
              <p><strong>Email:</strong> {inq.email}</p>
              <p><strong>Phone:</strong> {inq.phone}</p>
              <p><strong>Job Type:</strong> {inq.jobType}</p>
              <p><strong>Message:</strong> {inq.message}</p>
              <p>
                <strong>Submitted:</strong>{" "}
                {inq.createdAt?.toDate
                  ? inq.createdAt.toDate().toLocaleString()
                  : "—"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
