import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItinerarySection.css'; // Import custom CSS

// Custom Route Icon
const RouteIcon = () => (
  <svg className="route-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

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

function ItinerarySection({ className = '' }) {
  const containerRef = React.useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className={`itinerary-container ${className}`}>
      {/* Header */}
      <div className="itinerary-header">
        <h1 className="itinerary-title">1 itinerary</h1>
        <p className="itinerary-description">
          Get expertly curated itineraries that help you organise all the 'things to do' in an ideal time order
        </p>
        <button className="btn preview-button">
          Preview for FREE
        </button>
      </div>

      {/* Horizontal Scrolling Cards */}
      <div className="position-relative">
        <div 
          ref={containerRef}
          className="cards-container"
        >
          {/* Itinerary Builder Card */}
          <div className="itinerary-card builder-card">
            <RouteIcon />
            <h3 className="card-title">
              Itinerary Builder
            </h3>
            <p className="card-subtitle">
              Create your own itinerary
            </p>
          </div>

          {/* Map Card */}
          <div className="itinerary-card map-card">
            <div className="map-container">
              {/* Map background */}
              <div className="map-background">
                {/* Overlay for better text readability */}
                <div className="map-overlay"></div>
                
                {/* Route visualization */}
                <svg className="route-svg" viewBox="0 0 300 400">
                  {/* Route line */}
                  <path
                    d="M50 80 Q 100 120 150 100 T 200 140 Q 220 180 180 220 T 160 280 Q 140 320 120 350"
                    stroke="#10B981"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  
                  {/* Route points */}
                  <circle cx="50" cy="80" r="4" fill="#EF4444" />
                  <circle cx="150" cy="100" r="4" fill="#EF4444" />
                  <circle cx="200" cy="140" r="4" fill="#EF4444" />
                  <circle cx="180" cy="220" r="4" fill="#EF4444" />
                  <circle cx="160" cy="280" r="4" fill="#EF4444" />
                  <circle cx="120" cy="350" r="4" fill="#EF4444" />
                </svg>
                
                {/* Location labels */}
                <div className="location-labels">
                  <div className="location-item">🏔️ Bergen</div>
                  <div className="location-item">🌊 Geiranger</div>
                  <div className="location-item">🏛️ Trondheim</div>
                </div>
              </div>
              
              {/* Bottom overlay with day info */}
              <div className="day-info-overlay">
                <div className="day-info">
                  <div className="day-number">Day 8</div>
                  <div className="day-title">Lofoten Road Trip</div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="itinerary-card preview-card">
            <div className="preview-icon">
              <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <button className="btn preview-link">
              Preview for FREE
            </button>
          </div>

          {/* Additional Ready to Explore Card */}
          <div className="itinerary-card ready-card">
            <div className="ready-icon">
              <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="card-title">
              Ready to Explore
            </h3>
            <p className="card-subtitle">
              Start your Norwegian adventure
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollLeft}
          className="nav-arrow nav-arrow-left"
        >
          <ChevronLeftIcon />
        </button>
        
        <button 
          onClick={scrollRight}
          className="nav-arrow nav-arrow-right"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

export default ItinerarySection;