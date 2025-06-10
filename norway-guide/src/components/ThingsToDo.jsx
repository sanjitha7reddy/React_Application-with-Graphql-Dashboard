import { MountainSnowIcon } from 'lucide-react';
import './ThingsToDo.css';
import React from 'react';

// Custom SVG Icons
const EyeIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const MountainIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.5 4.5L12 3l3.5 4.5L19 3v18H5V3z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ACTIVITIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Sightseeing",
    title: "One of my favourite spots",
    icon: MountainSnowIcon
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1576786922543-bec019028cd9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJldHR5JTIwdmlld3N8ZW58MHx8MHx8fDA%3D",
    category: "Sightseeing",
    title: "Swing with amazing views",
    icon: EyeIcon
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Hike",
    title: "Beautiful view point",
    icon: MountainIcon
  },
  {
    id: 4,
    image:"https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW91bnRhaW58ZW58MHx8MHx8fDA%3D",
    category: "Sightseeing",
    title: "Mountain adventure",
    icon: EyeIcon
  }
];

export default function ThingsToDo({ className = '' }) {
//const [currentIndex, setCurrentIndex] = React.useState(0);
  const containerRef = React.useRef(null);//creates ref to dom,allows u to scroll throughcards programmatically

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={`things-todo-container ${className}`}>
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-light rounded-circle me-3 nav-btn">
          <ChevronLeftIcon />
        </button>
        <div>
          <h1 className="display-4 fw-bold text-dark mb-2">161 things to do</h1>
          <p className="text-muted header-description">
            Get a curated list of all the best things to do with exact location, detailed info and inspiring content
          </p>
          <button className="btn btn-link p-0 fw-semibold preview-link">
            Preview for FREE
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="position-relative">
        <div 
          ref={containerRef}
          className="d-flex gap-4 overflow-auto pb-3 cards-container"
        >
          {ACTIVITIES.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div 
                key={activity.id} 
                className="flex-shrink-0 bg-white rounded-3 overflow-hidden shadow activity-card"
              >
                <div className="position-relative card-image-container">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 card-gradient" />
                </div>
                
                <div className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <IconComponent className="icon-sm text-secondary" />
                    <span className="text-secondary fw-medium category-text">
                      {activity.category}
                    </span>
                  </div>
                  <h3 className="h5 fw-bold text-dark lh-sm">
                    {activity.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollLeft}
          className="btn btn-light rounded-circle shadow position-absolute nav-arrow nav-arrow-left"
        >
          <ChevronLeftIcon />
        </button>
        
        <button 
          onClick={scrollRight}
          className="btn btn-light rounded-circle shadow position-absolute nav-arrow nav-arrow-right"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}