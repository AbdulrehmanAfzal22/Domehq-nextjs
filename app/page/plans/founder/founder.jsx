'use client';
import './founder.css';

export default function FounderPlan() {
  return (
    <div className="founder-plan-container">
      <div className="founder-plan-card">
        <div className="founder-plan-header">
          <h2 className="founder-plan-title">👑 Founder 3 Year Plan</h2>
          <div className="founder-plan-subtitle">MOST VALUABLE OFFER</div>
        </div>
        <form className="founder-plan-form">
          <div className="founder-form-group">
            <label htmlFor="first">First Name</label>
            <input type="text" id="first" placeholder="First Name" required />
          </div>
          <div className="founder-form-group">
            <label htmlFor="last">Last Name</label>
            <input type="text" id="last" placeholder="Last Name" required />
          </div>
          <div className="founder-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="founder-form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" placeholder="Phone" />
          </div>
          <button type="submit" className="founder-pay-button">
            Pay $399.99 for 3 Year Access
          </button>
        </form>
      </div>
    </div>
  );
}