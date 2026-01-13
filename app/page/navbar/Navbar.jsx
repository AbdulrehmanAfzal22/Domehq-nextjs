"use client";

import "./Navbar.css";
import Image from "next/image";
import logo from "../../../public/assets/logo.png"; 

import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ toggleTheme, currentTheme }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();

    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = 80;
        const sectionTop = section.offsetTop - navbarHeight;
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => router.push("/")}>
          <Image src={logo} alt="logo" className="img" width={40} height={40} />
          <span className="logo-text">DOME</span>
        </div>
      </div>

      <ul className="navbar-menu">

        <li>
          <a href="/#services" onClick={(e) => handleSectionClick(e, "hero")}>
           Home
          </a>
        </li>
        <li>
          <a href="/products" onClick={(e) => {
             e.preventDefault();
             handleSectionClick(e, "products");
             window.history.pushState(null, "", "/products");
          }}>
            Products
          </a>
        </li>
        <li>
          <a href="/#coming-soon" onClick={(e) => handleSectionClick(e, "coming")}>
            Coming Soon
          </a>
        </li>
        <li>
          <a href="/#services" onClick={(e) => handleSectionClick(e, "swift")}>
            Services
          </a>
        </li>
        <li>
          <a href="/#about" onClick={(e) => handleSectionClick(e, "about")}>
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

    <a href="/page/login"><button className="get-started-btn">
        Get Started
</button>
</a>

      </div>
    </nav>
  );
}
