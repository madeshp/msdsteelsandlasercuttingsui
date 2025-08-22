import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text fade-in-left">
            <div className="hero-badge">
              <i className="fas fa-star"></i>
              <span>Premium Laser Cutting Services</span>
            </div>
            
            <h1 className="hero-title">
              Precision Laser Cutting Services
            </h1>
            
            <p className="hero-subtitle">
              Transform your ideas into reality with our cutting-edge laser technology and expert craftsmanship. 
              From decorative panels to industrial components, we deliver precision and quality in every cut.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                <i className="fas fa-rocket"></i>
                Get Free Quote
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('gallery')}
              >
                <i className="fas fa-images"></i>
                View Our Work
              </button>
            </div>
          </div>
          
          <div className="hero-image fade-in-right">
            <img 
              src={import.meta.env.BASE_URL + "images/machine.jpg"}
              alt="Modern Laser Cutting Workshop" 
              className="hero-img"
              loading="lazy"
            />
            
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;