"use client";

import "./Navbar.css";
import Image from "../../../public/assets/logo.png"; 
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageComponent from "next/image";
import { useAuth } from "../firebase/AuthContext";
import Pic from "../../../public/assets/profile.png"; 
export default function Navbar({ toggleTheme, currentTheme }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setProfileMenu(false);
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-left">
        <div className="logo" onClick={() => router.push("/")}>
          <ImageComponent src={Image} alt="logo" width={40} height={40} />
          <span className="logo-text">DOME</span>
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
<ul className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
  <li><a href="#products">Products</a></li>
  <li><a href="#coming">Coming Soon</a></li>
  <li><a href="#swift">Services</a></li>
  <li><a href="#about">About Us</a></li>

  {!user && (
    <li className="mobile-get-started">
      <button className="get-started-btn" onClick={() => router.push("/page/login")}>Get Started</button>
    </li>
  )}

  {user && (
    <li className="mobile-profile">
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
  )}
</ul>

      <div className={`navbar-right ${menuOpen ? "hide-on-mobile" : ""}`}>
        
        <div className="icons">
          <span onClick={toggleTheme}>
            {currentTheme === "dark" ? <FaMoon /> : <FaSun />}
          </span>
          <span><FaGlobe /></span>
        </div>

        {!user && (
          <button className="get-started-btn" onClick={() => router.push("/page/login")}>
            Get Started
          </button>
        )}

        {user && (
          <div className="profile-wrapper">
  <img
  src={Pic.src }
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
        )}

      </div>
    </nav>
  );
}
