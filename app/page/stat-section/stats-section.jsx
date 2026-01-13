"use client";
import React from 'react'
import './stats-section.css'    

import { FaLaptopCode, FaRobot,FaHeadset,FaBullseye,FaEye} from 'react-icons/fa'

export default function Statssection() {
  return (
    <>
      <section className="stats-section">
            {/* Top Stats Cards */}
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon"><FaLaptopCode /></div>
                <div className="stat-content">
                  <h3>10+</h3>
                  <p>Software Products</p>
                </div>
              </div>
      
              <div className="stat-card">
                <div className="stat-icon"><FaRobot /></div>
                <div className="stat-content">
                  <h3>100%</h3>
                  <p>AI-Powered</p>
                </div>
              </div>
      
              <div className="stat-card">
                <div className="stat-icon"><FaHeadset /></div>
                <div className="stat-content">
                  <h3>24/7</h3>
                  <p>Support</p>
                </div>
              </div>
            </div>
            <div className="section-title">
              <h2>Software Already Built</h2>
              <p>Production-ready tools to accelerate your entrepreneurial journey</p>
            </div>
          </section>
    </>
  )
}
