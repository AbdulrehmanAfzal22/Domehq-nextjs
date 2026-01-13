"use client";
import React from 'react'
import './productsgrid.css'

export default function ProductsGrid() {



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
  

    </>
  )
}
