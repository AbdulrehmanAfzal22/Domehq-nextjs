"use client";

import React, { useState } from "react";
import "./contact.css";
import { useRouter } from "next/navigation";
import { db } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";

const InquiryForm = ({ onClose }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [jobType, setJobType] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // for custom popup

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "inquiries"), {
        name,
        phone,
        email,
        jobType,
        message,
        createdAt: new Date(),
      });

      // Clear form
      setName("");
      setPhone("");
      setEmail("");
      setJobType("");
      setMessage("");

      // Show custom popup
      setShowPopup(true);

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    } catch (error) {
      console.error("Error saving inquiry:", error);
      alert("Something went wrong!"); // you can also make custom popup for errors
    }
  };

  return (
    <div className="inquiry-page">
      <div className="inquiry-card">
        <button className="close-btn" onClick={() => router.push("/")}>✕</button>

        <h2 className="title">Inquiry Form</h2>
        <p className="subtitle">We’d love to hear from you</p>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="tel" 
            placeholder="Phone Number" 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select 
            required
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Select Job Type</option>
            <option>Web Development</option>
            <option>UI / UX Design</option>
            <option>Mobile App</option>
            <option>Other</option>
          </select>

          <textarea 
            placeholder="Your Inquiry..." 
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Submit Inquiry
          </button>
        </form>

        {/* Custom Popup */}
        {showPopup && (
          <div className="custom-popup">
            Inquiry submitted successfully!
          </div>
        )}

      </div>
    </div>
  );
};

export default InquiryForm;
