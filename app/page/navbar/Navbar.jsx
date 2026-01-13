"use client";

import "./Navbar.css";
import Image from "next/image";
import logo from "../../../public/assets/logo.png"; 

import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Navbar({ toggleTheme, currentTheme }) {
  const router = useRouter();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();

    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80; // Adjust if navbar height changes
      const sectionTop = section.offsetTop - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });

      // Update URL hash without reloading
      window.history.pushState(null, "", `/#${sectionId}`);
    } else {
      // If section not found (maybe on another page), navigate to homepage first
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

      <ul className="navbar-menu">
        {/* <li>
          <a href="#hero" onClick={(e) => handleSectionClick(e, "hero")}>
            Home
          </a>
        </li> */}
        <li>
          <a href="#products" onClick={(e) => handleSectionClick(e, "products")}>
            Products
          </a>
        </li>
        <li>
          <a href="#coming" onClick={(e) => handleSectionClick(e, "coming")}>
            Coming Soon
          </a>
        </li>
        <li>
          <a href="#swift" onClick={(e) => handleSectionClick(e, "swift")}>
            Services
          </a>
        </li>
        <li>
          <a href="#about" onClick={(e) => handleSectionClick(e, "about")}>
            About Us
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="icons">
          <span className="icon-theme" onClick={toggleTheme}>
            {currentTheme === "dark" ? <FaMoon /> : <FaSun />}
          </span>
          <span className="icon-globe">
            <FaGlobe />
          </span>
        </div>

        <a href="/page/login">
          <button className="get-started-btn">Get Started</button>
        </a>
      </div>
    </nav>
  );
}
