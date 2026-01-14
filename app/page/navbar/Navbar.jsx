"use client";

import "./Navbar.css";
import Image from "next/image";
import logo from "../../../public/assets/logo.png"; 
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ toggleTheme, currentTheme }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80;
      const sectionTop = section.offsetTop - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
      window.history.pushState(null, "", `/#${sectionId}`);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => router.push("/")}>
          <Image src={logo} alt="logo" width={40} height={40} />
          <span className="logo-text">DOME</span>
        </div>
      </div>

      {/* Hamburger menu icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menu links */}
      <ul className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
        <li><a href="#products" onClick={(e) => handleSectionClick(e, "products")}>Products</a></li>
        <li><a href="#coming" onClick={(e) => handleSectionClick(e, "coming")}>Coming Soon</a></li>
        <li><a href="#swift" onClick={(e) => handleSectionClick(e, "swift")}>Services</a></li>
        <li><a href="#about" onClick={(e) => handleSectionClick(e, "about")}>About Us</a></li>

        {/* Only show "Get Started" inside mobile menu */}
        <li className="mobile-get-started">
          <a href="/page/login">
            <button className="get-started-btn">Get Started</button>
          </a>
        </li>
      </ul>

      {/* Desktop icons */}
      <div className="navbar-right">
        <div className="icons">
          <span className="icon-theme" onClick={toggleTheme}>
            {currentTheme === "dark" ? <FaMoon /> : <FaSun />}
          </span>
          <span className="icon-globe"><FaGlobe /></span>
        </div>
      </div>
    </nav>
  );
}
