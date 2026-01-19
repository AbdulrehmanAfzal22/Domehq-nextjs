'use client';
// CreatorPlan.jsx
import './creator.css';

export default function CreatorPlan() {

  const handleClose = () => {
    window.history.back(); // Go back or close the page view
  };

  return (
    <div className="creator-plan-container">
      <div className="creator-plan-card">

        {/* Close Button */}
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>

        <div className="creator-plan-header">
          <h2 className="creator-plan-title">Upgrade to Creator Plan</h2>
        </div>

        <div className="creator-plan-description">
          Get 363 messages per day for just $24.99/month
        </div>

        <form className="creator-plan-form">
          <div className="creator-form-group">
            <label htmlFor="first">First Name</label>
            <input type="text" id="first" placeholder="First Name" required />
          </div>

          <div className="creator-form-group">
            <label htmlFor="last">Last Name</label>
            <input type="text" id="last" placeholder="Last Name" required />
          </div>

          <div className="creator-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>

          <div className="creator-form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" placeholder="Phone" />
          </div>

          <button type="submit" className="creator-subscribe-button1">
            Subscribe for $24.99/month
          </button>
        </form>
      </div>
    </div>
  );
}
