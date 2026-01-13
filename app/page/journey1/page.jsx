"use client";
import React from 'react';
import './journey.css';
import "../../theme.css";
import { useRouter } from 'next/navigation';

export default function Journey({ onClose }) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Fallback for standalone page: navigate back to home
      router.push('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Form submitted! (Add your submission logic)");
  };

  return (
    <div className="journey-modal-root">
      <div className="journey-overlay" onClick={handleClose}></div>

      <div className="journey-modal-content">
        <div className="contact-card">
          <button className="close-btn" onClick={() => router.push("/")} aria-label="Close">
            ×
          </button>

          <h2 className="contact-title">Start Your Journey</h2>
          <p className="contact-subtitle">
            Tell us about yourself and your business idea — we'll handle the rest.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="idea">Your Business Idea</label>
              <textarea
                id="idea"
                rows="5"
                placeholder="Describe your startup vision in detail..."
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="submit-btn">
                Submit Application
                <span className="arrow">→</span>
              </button>

             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}