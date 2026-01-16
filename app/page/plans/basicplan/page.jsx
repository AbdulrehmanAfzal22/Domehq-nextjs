'use client';

// SubscriptionPlan.jsx
import './basics.css';

export default function SubscriptionPlan() {
  return (
    <div className="plan-container">
      <div className="plan-card">
        <div className="plan-header">
          <div className="plan-icon">💬</div>
          <h2 className="plan-title">Basic Plan</h2>
        </div>

        <div className="plan-description">
          50 messages / day • 1-month subscription
        </div>

        <form className="plan-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
            />
          </div>

          <button type="submit" className="pay-button">
            Pay $9.99 for 1 Month
          </button>
        </form>
      </div>
    </div>
  );
}