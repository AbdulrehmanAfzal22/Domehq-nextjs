"use client";
import React from 'react'
import logo from "../../../public/assets/logo.png"; 


import './hero.css'

export default function Hero() {
  return (
    <>
      <section className="hero">
      <div className="hero-content">
    <img src="/assets/logo.png" alt="Logo" className="logo1" />


    
        <div className="tagline-badge">
          <span className="sparkle">✨</span> AI-Powered Entrepreneurship
        </div>

        
        <h1 className="headline">
          It starts with <span className="highlight">(No)</span> Idea.
          <br />
          <span className="red-text">We make sure it</span>
          <br />
          <span className="red-text">doesn't end there.</span>
        </h1>
        <p className="subtext">
          AI tools to launch, grow, and scale your vision.
        </p>
        <div className="buttons">
          <button className="btn-primary">
            Start now with SwiftStart <span className="arrow">→</span>
          </button>
          <button className="btn-secondary">
            Contact Us
          </button>
        </div>
      </div>
    </section>




    </>
  )
}
