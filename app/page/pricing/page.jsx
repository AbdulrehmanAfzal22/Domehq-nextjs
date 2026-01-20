"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./PricingPlans.css";
import Navbar from "../navbar/pricingnav/page";
import { useAuth } from "../firebase/AuthContext";

const PricingPlans = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/"); // go to main page if logged out
    }
  }, [user, router]);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Navbar />
      <div className="pricing-wrapper">
        <h2 className="pricing-title">Choose Your Plan</h2>
        <p className="pricing-subtitle">
          From casual chats to power users — pick what fits your conversation needs.
        </p>

        <div className="plans-grid">
          {/* Free Plan */}
          <div className="plan free-plan">
            <div className="plan-header1">
              <span className="badge blue-badge">Free</span>
            </div>
            <h3 className="plan-name">Free</h3>
            <p className="plan-description1">
              Perfect for casual chats and trying out different moods
            </p>
            <ul className="plan-features">
              <li>✓ 2 messages per day</li>
              <li>✓ Access all 9 personalities</li>
              <li>✓ Everything in Free plan</li>
              <li>✓ ✨ Mood of the Day</li>
            </ul>
            <button className="btn-plan-free">Start for Free</button>
          </div>

          {/* Basic Plan */}
          <div className="plan basic-plan">
            <div className="plan-header1">
              <span className="plan-price">$9.99</span>
              <span className="plan-period">/month</span>
            </div>
            <h3 className="plan-name">Basic</h3>
            <p className="plan-description2">
              Ideal for regular users who want more room to talk
            </p>
            <ul className="plan-features">
              <li>✓ 50 messages per day</li>
              <li>✓ Plan lasts 1 month</li>
              <li>✓ Everything in Free plan</li>
            </ul>
            <button
              className="btn-plan-basic"
              onClick={() => router.push("./plans/basic")}
            >
              Go Basic
            </button>
          </div>

          {/* Creator Plan */}
          <div className="plan creator-plan popular-plan">
            <div className="plan-header1">
              <span className="badge purple-badge">Popular</span>
            </div>
            <div className="plan-price-section">
              <span className="plan-price">$24.99</span>
              <span className="plan-period">/month</span>
            </div>
            <h3 className="plan-name">Creator</h3>
            <p className="plan-description1">
              For content creators and power users
            </p>
            <ul className="plan-features">
              <li>✓ 363 messages per day</li>
              <li>✓ Priority support</li>
              <li>✓ Everything in Basic plan</li>
            </ul>
            <button
              className="btn-plan-creator"
              onClick={() => router.push("./plans/creator")}
            >
              Upgrade Now
            </button>
          </div>

          {/* Founder Plan */}
          <div className="plan founder-plan">
            <div className="ribbon">MOST VALUABLE</div>
            <div className="plan-header1">
              <span className="badge crown-badge">Founder Plan</span>
            </div>
            <div className="plan-price-section special">
              <span className="old-price">$799.99</span>
              <span className="plan-price">$399</span>
              <span className="plan-period">/3 years</span>
            </div>
            <h3 className="plan-name">Founder Plan</h3>
            <p className="plan-description1">
              Everything in Creator, for 3 years
            </p>
            <ul className="plan-features">
              <li>✓ 500 messages per day</li>
              <li>✓ Priority access to all future updates and tools</li>
            </ul>
            <button
              className="btn-plan-founder"
              onClick={() => router.push("./plans/founder")}
            >
              Activate Now
            </button>
          </div>
        </div>

        <div className="bottom-note">
          <button className="btn-plan-free big">Start for Free</button>
          <p>No credit card required for free plan.</p>
        </div>
      </div>
    </>
  );
};

export default PricingPlans;
