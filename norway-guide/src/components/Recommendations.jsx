import React, { useRef } from 'react';
import './recommendations.css'; // Import custom CSS

// Navigation Icons
const ChevronLeftIcon = () => (
  <svg className="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const RECOMMENDATIONS = [
  {
    id: 1,
    title: "Iceland Guide",
    subtitle: "Iceland • by asasteinars",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291bnRyeXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    title: "Explore Lithuania",
    subtitle: "Lithuania • by lauraeleva",
    image: "https://images.unsplash.com/photo-1468950487387-88b8240b0166?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvdW50cnl8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Exploring Ireland's Hidden Gems",
    subtitle: "Ireland • by furstonetravels",
    image: "https://images.unsplash.com/photo-1433883669848-fa8a7ce070b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdW50cnl8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    title: "Local Secrets of the Dolomites",
    subtitle: "Italy • by giuligartner",
    image: "https://plus.unsplash.com/premium_photo-1669047983532-c91a5ea6a81d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291bnRyeXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    title: "Scottish Highlands Adventure",
    subtitle: "Scotland • by highland_explorer",
    image: "https://images.unsplash.com/photo-1616715076601-17462bf47b61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNvdW50cnl8ZW58MHx8MHx8fDA%3D"
  }
];

export default function Recommendations({ className = '' }) {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-4 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="recommendations-title mb-4">Top Recommendations</h2>
            
            <div className="recommendations-wrapper position-relative">
              {/* Horizontal Scrolling Container */}
              <div 
                ref={containerRef}
                className="recommendations-container d-flex"
              >
                {RECOMMENDATIONS.map((item) => (
                  <div 
                    key={item.id}
                    className="recommendation-card card h-100"
                  >
                    {/* Image */}
                    <div className="recommendation-image-wrapper">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="card-img-top recommendation-image"
                      />
                      {/* Optional overlay for better text contrast */}
                      <div className="recommendation-overlay"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="card-body">
                      <h3 className="card-title recommendation-card-title">
                        {item.title}
                      </h3>
                      <p className="card-text recommendation-subtitle">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={scrollLeft}
                className="btn nav-arrow nav-arrow-left"
                type="button"
              >
                <ChevronLeftIcon />
              </button>
              
              <button 
                onClick={scrollRight}
                className="btn nav-arrow nav-arrow-right"
                type="button"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}