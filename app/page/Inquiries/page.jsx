"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // adjust path
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./Inquiries.css";
import Navbar from "../navbar/Navbar";
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
    <>  
    
    {/* <Navbar/> */}
    
    
      <div className="inquiries-page">
    
      <button className="back-btn1" onClick={() => router.back()}>
        ← Back
      </button>

      <h2>All Inquiries</h2>

      <div className="table-wrapper">
        <table className="inquiries-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job Type</th>
              <th>Message</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No inquiries yet
                </td>
              </tr>
            ) : (
              inquiries.map((inq, index) => (
                <tr key={inq.id}>
                  <td data-label="#"> {index + 1} </td>
                  <td data-label="Name"> {inq.name} </td>
                  <td data-label="Email"> {inq.email} </td>
                  <td data-label="Phone"> {inq.phone} </td>
                  <td data-label="Job Type"> {inq.jobType} </td>
                  <td data-label="Message"> {inq.message} </td>
                  <td data-label="Submitted At">
                    {inq.createdAt?.toDate
                      ? inq.createdAt.toDate().toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    </>

  );
}
