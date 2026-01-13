"use client";
import React from 'react'
import logo from "../../../public/assets/logo.png"; 
import './footer.css'


export default function Footer() {
  return (
  <>
  
  
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-logo">
           <img src="/assets/logo.png" alt="Logo" className="logo-img" />

            <span className="logo-text">DOME</span>
          </div>
          <p className="tagline">
            Building the future of entrepreneurship with AI
          </p>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h4>Products</h4>
            <ul>
              <li><a href="#">keyTABs</a></li>
              <li><a href="#">Author's Bookshelf</a></li>
              <li><a href="#">StartupScore</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#">SwiftSTART</a></li>
              <li><a href="#">Consulting</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 DOME. All rights reserved.</p>
      </div>
    </footer>
  
  </>
  )
}
