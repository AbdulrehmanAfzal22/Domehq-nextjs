"use client";

import "./Navbar.css";
import Image from "../../../public/assets/logo.png"; 
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ImageComponent from "next/image";
import { useAuth } from "../firebase/AuthContext";
import Pic from "../../../public/assets/profile.png"; 
import Link from 'next/link'; // Use Link for internal navigation

export default function Navbar({ toggleTheme, currentTheme }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [globeMenu, setGlobeMenu] = useState(false);

  // Reset state on page load
  useEffect(() => {
    setMenuOpen(false); // Close the menu when the component loads
    setProfileMenu(false); // Close profile menu when page loads
  }, [router.pathname]); // Runs when the page path changes

  const handleLogout = async () => {
    await logout();
    setProfileMenu(false); // Close profile menu after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => router.push("/")}>
          <ImageComponent src={Image} alt="logo" width={40} height={40} />
          <span>DOME</span>
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
        <li><Link href="#products">Products</Link></li>
        <li><Link href="#coming">Coming Soon</Link></li>
        <li><Link href="#swift">Services</Link></li>
        <li><Link href="#about">About Us</Link></li>
        {user && (
          <li>
            <Link href="/page/my-quiries">My Inquiries</Link>
          </li>
        )}

        {user && user.email === "musa@gmail.com" && (
          <li><Link href="/page/Inquiries">Quiries</Link></li>
        )}

        {!user && (
          <li className="mobile-get-started mobile-only">
            <button className="get-started-btn" onClick={() => router.push("/page/login")}>Get Started</button>
          </li>
        )}

        {user && (
          <>
            <li className="mobile-pricing mobile-only">
              <button className="pricing-btn" onClick={() => router.push("../pricing/PricingPlans")}>Pricing</button>
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
          <span onClick={toggleTheme}>
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
          <button className="get-started-btn" onClick={() => router.push("/page/login")}>
            Get Started
          </button>
        )}

        {user && (
          <>
            <button className="pricing-btn" onClick={() => router.push("/page/pricing")}>
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
