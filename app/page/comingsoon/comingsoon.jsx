"use client";
import React from 'react'
import './comingsoon.css'

export default function Comingsoon() {
  return (
    <>
    

<section className="coming-soon-section">
      <div className="section-header">
        <span className="coming-soon-badge">Coming Soon</span>
        <h2>Next Generation Tools</h2>
        <p>Innovative solutions launching soon</p>
      </div>

      <div className="preview-grid">
        <div className="preview-card">
          <div className="card-header">
            <h3 className="tool-title">NicheIT</h3>
            <span className="soon-badge">Soon</span>
          </div>
          <p className="tool-description">
            Discover profitable niches with AI-powered market analysis and trend prediction
          </p>
          <button className="notify-btn">Notify Me</button>
        </div>
      </div>
    </section>
      
    </>
  )
}
