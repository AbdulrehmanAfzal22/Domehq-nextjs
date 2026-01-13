
"use client";
import React from 'react';
// import ReactDOM from 'react-dom/client';
import './swiftstart.css';
import Journey from '../journey1/page';

export default function Swiftstart() {
  const openJourney = () => {
    const newTab = window.open('', '_blank');
    
    if (newTab) {
      // Get current theme from the parent document
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      
      // Collect all stylesheets from the current document
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            const link = styleSheet.href;
            return link ? `@import url('${link}');` : '';
          }
        })
        .join('\n');

      // Write HTML with theme attribute
      newTab.document.write(`
        <!DOCTYPE html>
        <html${currentTheme === 'light' ? ' data-theme="light"' : ''}>
          <head>
            <title>Journey Form</title>
            <style>
              ${styles}
              
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background-color: var(--bg-primary);
                color: var(--text-primary);
              }
            </style>
          </head>
          <body>
            <div id="journey-root"></div>
          </body>
        </html>
      `);
      newTab.document.close();

      // Optional: Sync theme changes in real-time
      const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-theme') {
            const newTheme = document.documentElement.getAttribute('data-theme');
            if (newTab && !newTab.closed) {
              if (newTheme === 'light') {
                newTab.document.documentElement.setAttribute('data-theme', 'light');
              } else {
                newTab.document.documentElement.removeAttribute('data-theme');
              }
            }
          }
        });
      });

      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });

      // Create a root and render the Journey component
      const container = newTab.document.getElementById('journey-root');
      const root = ReactDOM.createRoot(container);
      
      const handleClose = () => {
        themeObserver.disconnect();
        newTab.close();
        window.focus();
      };
      
      root.render(
        <Journey onClose={handleClose} />
      );

      newTab.addEventListener('beforeunload', () => {
        themeObserver.disconnect();
        window.focus();
      });
    }
  };

  return (
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
              <strong>Idea Generation</strong><br />
              AI-powered brainstorming
            </div>
          </div>

          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Market Research</strong><br />
              Comprehensive analysis
            </div>
          </div>

          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Product Development</strong><br />
              Full-stack implementation
            </div>
          </div>

          <div className="feature-item">
            <span className="red-dot">•</span>
            <div>
              <strong>Launch Support</strong><br />
              Go-to-market strategy
            </div>
          </div>
        </div>

          <a href="/page/journey1"><button className="cta-button" >
      Start Your Journey <span className="arrow">→</span>
        
        </button></a>
      </div>
    </section>
  );
}