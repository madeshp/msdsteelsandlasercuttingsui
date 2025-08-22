import React, { useState, useEffect } from 'react';
import Lightbox from './Lightbox';
import useFadeInAnimations from "./useFadeInAnimations";
const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  useFadeInAnimations(); // activates animations
  // Function to dynamically load all images from workgallery folder
  useEffect(() => {
    const loadGalleryImages = () => {
      // Direct reference to images in public folder - more reliable with Vite
      const imagePaths = [
        'images/workgallery/100.jpg',
        'images/workgallery/101.jpg',
        'images/workgallery/102.jpg',
        'images/workgallery/103.jpg',
        'images/workgallery/104.jpg',
        'images/laser-cutting-industrial.jpeg'
      ];

      // Create gallery items with dynamic data
      const items = imagePaths.map((path, index) => {
        const filename = path.split('/').pop(); // Extract filename from path
        const name = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
        
        // Use direct path without BASE_URL - Vite serves public folder at root
        const baseUrl = import.meta.env.BASE_URL.endsWith('/') 
          ? import.meta.env.BASE_URL 
          : import.meta.env.BASE_URL + '/';
        const fullPath = baseUrl + path;
        
        return {
          src: fullPath,
          alt: `Gallery Image ${index + 1} - ${name}`,
          title: name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Convert filename to title
          description: `Professional laser cutting work showcasing precision and quality craftsmanship.`,
          delay: (index * 100).toString()
        };
      });

      setGalleryItems(items);
        
        // Debug: Log the generated URLs
        console.log('Gallery items loaded:', items);
        console.log('BASE_URL:', import.meta.env.BASE_URL);
      };

    loadGalleryImages();
  }, []);

  const placeholderItems = [
    {
      icon: 'fas fa-plus',
      title: 'More Projects',
      description: 'Coming Soon',
      delay: '300'
    },
    {
      icon: 'fas fa-tools',
      title: 'Custom Work',
      description: 'Contact Us',
      delay: '400'
    },
    {
      icon: 'fas fa-image',
      title: 'Your Project',
      description: 'Could Be Here',
      delay: '500'
    }
  ];

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">Our Work Gallery</h2>
          <p className="section-subtitle">
            Showcasing our precision laser cutting capabilities and craftsmanship
          </p>
        </div>
        
        <div className="gallery-wrapper">
          <div className="gallery-grid" id="galleryGrid">
            {/* Dynamic gallery items */}
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                className="gallery-item fade-in-up" 
                data-delay={item.delay}
                style={{
                  animationDelay: `${item.delay}ms`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  const overlay = e.currentTarget.querySelector('.gallery-overlay');
                  if (overlay) {
                    overlay.style.transform = 'translateY(0)';
                  }
                }}
                onMouseLeave={(e) => {
                  const overlay = e.currentTarget.querySelector('.gallery-overlay');
                  if (overlay) {
                    overlay.style.transform = 'translateY(100%)';
                  }
                }}
              >
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="gallery-img" 
                  loading="lazy"
                  onLoad={() => {
                    console.log(`Image loaded successfully: ${item.src}`);
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${item.src}`, e);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    visibility: 'visible',
                    opacity: 1,
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: '#f0f0f0',
                    border: '2px solid red'
                  }}
                />
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                  color: 'white',
                  padding: '20px',
                  transform: 'translateY(100%)',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}>
                  <div className="gallery-info">
                    <h3>{item.title}</h3>
                    <p>{item.description.substring(0, 60)}...</p>
                    <button 
                      className="gallery-btn"
                      onClick={() => openLightbox(item)}
                      style={{
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      <i className="fas fa-expand"></i>
                      View Full Size
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Placeholder items */}
            {placeholderItems.map((item, index) => (
              <div 
                key={`placeholder-${index}`}
                className="gallery-item gallery-placeholder fade-in-up" 
                data-delay={item.delay}
                style={{
                  animationDelay: `${item.delay}ms`
                }}
              >
                <div className="placeholder-content">
                  <i className={item.icon}></i>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <Lightbox
          image={currentImage}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
};

export default Gallery;