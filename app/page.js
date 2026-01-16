"use client";  // Add this to enable client-side state

import { useState, useEffect } from "react";  // Add imports for state and effect
import Navbar from "./page/navbar/Navbar";
import Hero from "./page/hero/page";
import ProductsGrid from "./page/productgrid/productsgrid";
import ComingSoon from "./page/comingsoon/comingsoon";
import Swiftstart from "./page/swiftstart/swiftstart";
import Footer from "./page/footer/footer";
import About from "./page/about/about";
import "./theme.css";
import Login from "./page/login/page";
import RegisterPage from "./page/register/page";
import PricingPlans from "./page/pricing/page";


export default function Page() {
  const [currentTheme, setCurrentTheme] = useState("dark");  // Default to dark

  // Function to toggle theme
  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Apply theme to the document on change
  useEffect(() => {
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [currentTheme]);

  return (
    <>
   <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme} />  

      <section id="hero">
        <Hero />
      </section>

      <section id="products">
        <ProductsGrid />
      </section>

      <section id="coming">
        <ComingSoon />
      </section>

 <section id="swift">
        <Swiftstart />
      </section>

      <section id="about">
        <About />
      </section>

     

      <section id="footer">
        <Footer />
      </section>  
    
     


    </>
  );
}