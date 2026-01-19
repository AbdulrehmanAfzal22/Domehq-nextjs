
"use client"

import React from "react";
import "./contact.css";

const InquiryForm = ({ onClose }) => {
  return (
    <div className="inquiry-page">
      <div className="inquiry-card">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="title">Inquiry Form</h2>
        <p className="subtitle">We’d love to hear from you</p>

        <form className="inquiry-form">
          <input type="text" placeholder="Your Name" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="email" placeholder="Email Address" required />

          <select required>
            <option value="">Select Job Type</option>
            <option>Web Development</option>
            <option>UI / UX Design</option>
            <option>Mobile App</option>
            <option>Other</option>
          </select>

          <textarea placeholder="Your Inquiry..." rows="4" required />

          <button type="submit" className="submit-btn">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
