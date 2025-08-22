import React, { useState, useEffect } from 'react';
import Lightbox from './Lightbox';
import useFadeInAnimations from "./useFadeInAnimations";
const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(9); // 3 rows × 3 columns = 9 items per page
  useFadeInAnimations(); // activates animations
  // Function to dynamically load all images from workgallery folder
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        // Load gallery configuration from YAML file
        const response = await fetch(import.meta.env.BASE_URL+'/config/gallery-images.yaml');
        const yamlText = await response.text();
        
        // Parse YAML content (simple parsing for this use case)
        const lines = yamlText.split('\n');
        const galleryImages = [];
        let currentImage = {};
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('- path:')) {
            if (Object.keys(currentImage).length > 0) {
              galleryImages.push(currentImage);
            }
            currentImage = {};
            currentImage.path = trimmedLine.replace('- path:', '').trim().replace(/"/g, '');
          } else if (trimmedLine.startsWith('filename:')) {
            currentImage.filename = trimmedLine.replace('filename:', '').trim().replace(/"/g, '');
          } else if (trimmedLine.startsWith('title:')) {
            currentImage.title = trimmedLine.replace('title:', '').trim().replace(/"/g, '');
          } else if (trimmedLine.startsWith('description:')) {
            currentImage.description = trimmedLine.replace('description:', '').trim().replace(/"/g, '');
          }
        }
        
        // Add the last image
        if (Object.keys(currentImage).length > 0) {
          galleryImages.push(currentImage);
        }

        // Create gallery items with data from YAML
        const items = galleryImages.map((image, index) => {
          // Use direct path without BASE_URL - Vite serves public folder at root
          const baseUrl = import.meta.env.BASE_URL.endsWith('/') 
            ? import.meta.env.BASE_URL 
            : import.meta.env.BASE_URL + '/';
          const fullPath = baseUrl + image.path;
          
          return {
            src: fullPath,
            alt: `Gallery Image ${index + 1} - ${image.title}`,
            title: image.title,
            description: image.description,
            delay: (index * 100).toString()
          };
        });

        setGalleryItems(items);
        
        // Reset to first page when new images are loaded
        setCurrentPage(0);
        
        // Debug: Log the generated URLs
        console.log('Gallery items loaded from YAML:', items);
        console.log('BASE_URL:', import.meta.env.BASE_URL);
        
      } catch (error) {
        console.error('Error loading gallery configuration:', error);
        
        // Fallback to basic images if YAML loading fails
        const fallbackImages = [
          'images/workgallery/82.png',
          'images/workgallery/83.png',
          'images/workgallery/84.png'
        ];
        
        const fallbackItems = fallbackImages.map((path, index) => {
          const filename = path.split('/').pop();
          const name = filename.replace(/\.[^/.]+$/, '');
          const baseUrl = import.meta.env.BASE_URL.endsWith('/') 
            ? import.meta.env.BASE_URL 
            : import.meta.env.BASE_URL + '/';
          
          return {
            src: baseUrl + path,
            alt: `Gallery Image ${index + 1} - ${name}`,
            title: name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `Professional laser cutting work showcasing precision and quality craftsmanship.`,
            delay: (index * 100).toString()
          };
        });
        
        setGalleryItems(fallbackItems);
      }
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

  const nextPage = () => {
    const maxPage = Math.ceil(galleryItems.length / itemsPerPage) - 1;
    setCurrentPage(prev => prev < maxPage ? prev + 1 : prev);
  };

  const prevPage = () => {
    setCurrentPage(prev => prev > 0 ? prev - 1 : prev);
  };

  const goToPage = (page) => {
    const maxPage = Math.ceil(galleryItems.length / itemsPerPage) - 1;
    if (page >= 0 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  // Calculate current page items
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = galleryItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  return (
    <section id="gallery" className="gallery" style={{
      padding: '40px 0' // Reduced from default padding
    }}>
      <div className="container">
        <div className="section-header fade-in-up" style={{
          marginBottom: '30px' // Reduced from default margin
        }}>
          <h2 className="section-title">Our Work Gallery</h2>
          <p className="section-subtitle">
            Showcasing our precision laser cutting capabilities and craftsmanship
          </p>
        </div>
        
        <div className="gallery-wrapper">
          {/* Navigation Controls */}
          <div className="gallery-navigation" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px', // Reduced from 30px
            padding: '15px 0', // Reduced from 20px
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div className="nav-info" style={{
              fontSize: '16px',
              color: '#6b7280'
            }}>
              Showing {startIndex + 1}-{Math.min(endIndex, galleryItems.length)} of {galleryItems.length} images
            </div>
            
            <div className="nav-controls" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  background: currentPage === 0 ? '#f3f4f6' : 'white',
                  color: currentPage === 0 ? '#9ca3af' : '#374151',
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (currentPage > 0) {
                    e.target.style.background = '#f9fafb';
                    e.target.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage > 0) {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              >
                ← Previous
              </button>
              
              <div className="page-indicators" style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '2px solid #d1d5db',
                      borderRadius: '6px',
                      background: i === currentPage ? '#3b82f6' : 'white',
                      color: i === currentPage ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (i !== currentPage) {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.borderColor = '#9ca3af';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (i !== currentPage) {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#d1d5db';
                      }
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  background: currentPage === totalPages - 1 ? '#f3f4f6' : 'white',
                  color: currentPage === totalPages - 1 ? '#9ca3af' : '#374151',
                  cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (currentPage < totalPages - 1) {
                    e.target.style.background = '#f9fafb';
                    e.target.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage < totalPages - 1) {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              >
                Next →
              </button>
            </div>
          </div>
          
          <div className="gallery-grid" id="galleryGrid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 250px)',
            gap: '15px', // Reduced from 20px
            marginBottom: '20px' // Reduced from 30px
          }}>
            {/* Dynamic gallery items */}
            {currentItems.map((item, index) => (
              <div 
                key={startIndex + index}
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
            {/*placeholderItems.map((item, index) => (
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
            ))*/}
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