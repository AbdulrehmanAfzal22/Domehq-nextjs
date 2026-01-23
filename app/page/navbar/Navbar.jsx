"use client";

import "./Navbar.css";
import Image from "../../../public/assets/logo.png"; 
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ImageComponent from "next/image";
import { useAuth } from "../firebase/AuthContext";
import Pic from "../../../public/assets/profile.png"; 

export default function Navbar({ toggleTheme, currentTheme }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  // Handle hash changes (including browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        scrollToSection(hash);
      }
    };

    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(() => handleHashChange(), 100);
    }

    // Close menus when route changes
    setMenuOpen(false);
    setProfileMenu(false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
    setMenuOpen(false);
  };

  // Handle navigation clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    
    // Update URL hash
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Scroll to section
    scrollToSection(sectionId);
  };

  const handleLogout = async () => {
    await logout();
    setProfileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div 
          className="logo" 
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMenuOpen(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          <ImageComponent src={Image} alt="logo" width={40} height={40} />
          <span>DOME</span>
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
        <li>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')}>
            Products
          </a>
        </li>
        <li>
          <a href="#coming" onClick={(e) => handleNavClick(e, 'coming')}>
            Coming Soon
          </a>
        </li>
        <li>
          <a href="#swift" onClick={(e) => handleNavClick(e, 'swift')}>
            Services
          </a>
        </li>
        <li>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            About Us
          </a>
        </li>
        
        {user && (
          <li>
            <a 
              href="/page/my-quiries"
              onClick={(e) => {
                e.preventDefault();
                router.push('/page/my-quiries');
                setMenuOpen(false);
              }}
            >
              My Inquiries
            </a>
          </li>
        )}

        {user && user.email === "musa@gmail.com" && (
          <li>
            <a 
              href="/page/Inquiries"
              onClick={(e) => {
                e.preventDefault();
                router.push('/page/Inquiries');
                setMenuOpen(false);
              }}
            >
              Queries
            </a>
          </li>
        )}

        {!user && (
          <li className="mobile-get-started mobile-only">
            <button 
              className="get-started-btn" 
              onClick={() => {
                router.push("/page/login");
                setMenuOpen(false);
              }}
            >
              Get Started
            </button>
          </li>
        )}

        {user && (
          <>
            <li className="mobile-pricing mobile-only">
              <button 
                className="pricing-btn" 
                onClick={() => {
                  router.push("/page/pricing");
                  setMenuOpen(false);
                }}
              >
                Pricing
              </button>
            </li>
            <li className="mobile-profile mobile-only">
              <div className="profile-wrapper">
                <img
                  src={Pic.src}
                  alt="profile"
                  className="profile-img"
                  onClick={() => setProfileMenu(!profileMenu)}
                />
                {profileMenu && (
                  <div className="profile-menu">
                    <p>{user.email}</p>
                    <button onClick={handleLogout}>Sign Out</button>
                  </div>
                )}
              </div>
            </li>
          </>
        )}
      </ul>

      <div className={`navbar-right ${menuOpen ? "hide-on-mobile" : ""}`}>
        <div className="icons">
          <span onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            {currentTheme === "dark" ? <FaMoon /> : <FaSun />}
          </span>
          <div className="globe-wrapper">
            <FaGlobe className="globe-icon" />
            <div className="globe-menu dropdown-menu">
              <button>English</button>
              <button>Arabic</button>
            </div>
          </div>
        </div>

        {!user && (
          <button 
            className="get-started-btn" 
            onClick={() => router.push("/page/login")}
          >
            Get Started
          </button>
        )}

        {user && (
          <>
            <button 
              className="pricing-btn" 
              onClick={() => router.push("/page/pricing")}
            >
              Pricing
            </button>
            <div className="profile-wrapper">
              <img
                src={Pic.src}
                alt="profile"
                className="profile-img"
                onClick={() => setProfileMenu(!profileMenu)}
              />
              {profileMenu && (
                <div className="profile-menu">
                  <p>{user.email}</p>
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}