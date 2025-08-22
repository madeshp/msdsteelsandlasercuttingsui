import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-cut footer-icon"></i>
              <span className="footer-logo-text">MSD Steel and Laser Cuttings</span>
            </div>
            <p className="footer-description">
              Your trusted partner for precision laser cutting and services. Quality craftsmanship, 
              advanced technology, and exceptional customer service.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/msdsteelsandlasercuttings" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.youtube.com/@msdsteelsandlasercuttings" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  Precision Laser Cutting
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  Decorative Panels
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  Custom Parts
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('gallery');
                  }}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Our Location</h3>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              borderRadius: '10px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
            }}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                src="https://www.google.com/maps?q=12.123490636240453,78.15546746757965&hl=en&z=16&output=embed"
                title="MSD Steels and Laser Cuttings Location"
              />
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="footer-contact">
              <p>
                <i className="fas fa-map-marker-alt"></i> 
                4/727/B, Vennampatti Road,Ellakiyampatti Panchayat, Indra Nagar,Teacher Colony, Dharmapuri,Tamil Nadu - 636701 
                (landmark: Behind GH/Near Amala School)
              </p>
              <p>
                <i className="fas fa-phone"></i> 
                (+91)- 8270708443
              </p>
              <p>
                <i className="fas fa-envelope"></i> 
                msdsteelsandlasercuttings@gmail.com
              </p>
              <p>
                <i className="fas fa-clock"></i> 
                Mon-Sat: 9AM-7PM
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} MSD Steels and Laser Cuttings. All rights reserved. | 
            Designed with precision and craftsmanship
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;