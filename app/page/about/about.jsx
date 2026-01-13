"use client";
import React from 'react'
import './about.css'

import { FaLaptopCode, FaRobot,FaHeadset,FaBullseye,FaEye} from 'react-icons/fa'

export default function About() {
  return (
    <>


<section className="about-us-section">
      <div className="about-content">
        <h2 className="section-title">About Us</h2>

        <h3 className="tagline1">
          It starts with <span className="no-highlight">(No)</span> Idea.
        </h3>

        <p className="intro-text">
          Whether you have money and no idea, or an idea and no money — Dome is the solution.
        </p>

        <p className="main-description">
          Dome is a Qatar-based AI and software ecosystem built to give ideas weight.
          We believe innovation should be accessible — not limited by capital, connections, or circumstance.
          Dome provides the tools, structure, and intelligence to turn ambition into action.
        </p>

        <p className="closing-text">
          From concept to creation, Dome helps entrepreneurs, creators, and businesses launch startups,
          build digital products, and create new income streams — all within one connected ecosystem.
        </p>
      </div>
    </section>


 <section className="mission-vision-section">
      <div className="cards-container">
        {/* Mission Card */}
        <div className="mission-card card">
          <div className="icon-container">
            <div className="icon mission-icon"> {<FaBullseye />} </div>
          </div>
          <h3 className="card-title">Mission</h3>
          <p className="card-description">
            To empower people to build with purpose, by bridging the gap between vision and execution.
          </p>
          <p className="card-secondary">
            Through AI, data, and design, Dome transforms uncertainty into direction — helping anyone, anywhere, go from no idea to a launched idea.
          </p>
        </div>

        {/* Vision Card */}
        <div className="vision-card card">
          <div className="icon-container">
            <div className="icon vision-icon"> {<FaEye />}  </div>
          </div>
          <h3 className="card-title">Vision</h3>
          <p className="card-description">
            To build the world's most dynamic AI ecosystem for creators and entrepreneurs — starting from Qatar, reaching the world.
          </p>
          <p className="card-secondary">
            Because every idea, or lack of one, deserves a place to begin.
          </p>
        </div>
      </div>
    </section>



<section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">
          Ready to build your<br />
          next income stream?
        </h2>

        <p className="cta-subtitle">
          Join thousands of entrepreneurs using DOME to launch and scale their<br />
          digital businesses
        </p>

        <button className="cta-button">
          Get Started Now <span className="arrow">→</span>
        </button>
      </div>
    </section>

    </>
  )
}