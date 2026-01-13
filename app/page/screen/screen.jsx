"use client";
import React from 'react'
import './screen.css'
import logo from '../assets/logo.png'


import { FaLaptopCode, FaRobot,FaHeadset,FaBullseye,FaEye} from 'react-icons/fa'

export default function Screen() {

const products = [
    {
      title: "KeyTABs",
      description: "Organize and manage your browser tabs with AI-powered intelligence",
    },
    {
      title: "Author's Bookshelf",
      description: "Curate and showcase your literary collection with style",
    },
    {
     
      title: "AlKeyTAB",
      description: "Advanced keyboard shortcuts and productivity enhancement tool",
    },
    {
      title: "AlHambra",
      description: "Beautiful architecture and design inspiration platform",
    },
    {
      title: "StartupScore",
      description: "Evaluate and score startup ideas with AI-driven insights",
    },
  ];
 
    
  return (
    
    <>
<section className="hero">
      <div className="hero-content">
        
        <img 
          src={logo}
          alt="DOME Logo"
          className="logo1"
        />
        

    
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



<section className="products-grid">
      <div className="grid-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="card-header">
              <h3 className="product-title">{product.title}</h3>
              <span className="active-badge">Active</span>
            </div>
            <p className="product-description">{product.description}</p>
            <button className="learn-more-btn">
              Learn More <span className="arrow">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  


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



<section className="swiftstart-section">
      <div className="section-header">
        <h2>We'll Do It For You</h2>
        <p>From (No) Idea to Launch</p>
      </div>

      <div className="swiftstart-card">
        <h3 className="service-title">SwiftSTART</h3>
        <p className="service-description">
          Complete startup launch service – we handle everything from ideation to deployment
        </p>

        <div className="features-grid">
          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Idea Generation</strong>
              <br />
              AI-powered brainstorming
            </div>
          </div>

          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Market Research</strong>
              <br />
              Comprehensive analysis
            </div>
          </div>

          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Product Development</strong>
              <br />
              Full-stack implementation
            </div>
          </div>

          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Launch Support</strong>
              <br />
              Go-to-market strategy
            </div>
          </div>
        </div>

        <button className="cta-button">
          Start Your Journey <span className="arrow">→</span>
        </button>
      </div>
    </section>



<section className="other-software-section">
      <div className="section-header">
        <h2>Other Software</h2>
        <p>Additional tools in our ecosystem</p>
      </div>

      <div className="software-grid">
        <div className="software-card">
          <h3 className="software-title">MoodGPT</h3>
          <p className="software-description">
            AI-powered mood tracking and mental wellness companion
          </p>
          <button className="explore-btn">
            Explore MoodGPT <span className="arrow">→</span>
          </button>
        </div>

        <div className="software-card">
          <h3 className="software-title">MindGrid</h3>
          <p className="software-description">
            Visual thinking and idea organization platform powered by AI
          </p>
          <button className="explore-btn">
            Explore MindGrid <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>



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


    <footer className="footer">
      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo}alt="DOME Logo" className="logo-img" />
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
