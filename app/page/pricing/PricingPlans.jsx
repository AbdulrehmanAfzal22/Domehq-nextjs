"use client";

import React from 'react';
import './PricingPlans.css';

const PricingPlans = () => {
  return (
    <div className="pricing-section">
      <h2>Choose Your Plan</h2>
      <p className="subtitle">
        From casual chats to power users — pick what fits your conversation needs.
      </p>

      <div className="plans-container">
        {/* Free */}
        <div className="plan-card free">
          <div className="plan-header">
            <span className="badge blue">Free</span>
          </div>
          <h3>Free</h3>
          <p className="description">
            Perfect for casual chats and trying out different moods
          </p>

          <ul className="features">
            <li>✓ 2 messages per day</li>
            <li>✓ Access all 9 personalities</li>
            <li>✓ Everything in Free plan</li>
            <li>✓ ✨ Mood of the Day</li>
          </ul>

          <button className="btn btn-free">Start for Free</button>
        </div>

        {/* Basic */}
        <div className="plan-card basic">
          <div className="plan-header">
            <span className="price">$9.99</span>
            <span className="period">/month</span>
          </div>
          <h3>Basic</h3>
          <p className="description">
            Ideal for regular users who want more room to talk
          </p>

          <ul className="features">
            <li>✓ 50 messages per day</li>
            <li>✓ Plan lasts 1 month</li>
            <li>✓ Everything in Free plan</li>
          </ul>

          <button className="btn btn-basic">Go Basic</button>
        </div>

        {/* Creator - Popular */}
        <div className="plan-card creator popular">
          <div className="plan-header">
            <span className="badge purple">Popular</span>
          </div>
          <div className="plan-price">
            <span className="price">$24.99</span>
            <span className="period">/month</span>
          </div>
          <h3>Creator</h3>
          <p className="description">
            For content creators and power users
          </p>

          <ul className="features">
            <li>✓ 363 messages per day</li>
            <li>✓ Priority support</li>
            <li>✓ Everything in Basic plan</li>
          </ul>

          <button className="btn btn-creator">Upgrade Now</button>
        </div>

        {/* Founder */}
        <div className="plan-card founder">
          <div className="ribbon">MOST VALUABLE</div>
          <div className="plan-header">
            <span className="badge crown">Founder Plan</span>
          </div>
          <div className="plan-price special">
            <span className="old-price">$799.99</span>
            <span className="price">$399</span>
            <span className="period">/3 years</span>
          </div>
          <h3>Founder Plan</h3>
          <p className="description">
            Everything in Creator, for 3 years
          </p>

          <ul className="features">
            <li>✓ 500 messages per day</li>
            <li>✓ Priority access to all future updates and tools</li>
          </ul>

          <button className="btn btn-founder">Activate Now</button>
        </div>
      </div>

      <div className="bottom-note">
        <button className="btn btn-free big">Start for Free</button>
        <p>No credit card required for free plan.</p>
      </div>
    </div>
  );
};

export default PricingPlans;