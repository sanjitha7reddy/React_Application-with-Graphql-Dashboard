import React from 'react';
import './GuideSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Social Media Icons
const WebsiteIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const ThreadsIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01 1.5 8.434 2.35 5.58 3.995 3.529 5.845 1.225 8.598.044 12.179.02h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.58 22.5 8.434 22.5 12.01c0 3.576-.85 6.43-2.495 8.481-1.85 2.304-4.603 3.485-8.184 3.509zM12.018 2.464h-.005c-2.754.018-4.905.835-6.396 2.429-1.398 1.498-2.067 3.571-2.067 6.117 0 2.546.669 4.619 2.067 6.117 1.491 1.594 3.642 2.411 6.396 2.429h.005c2.754-.018 4.905-.835 6.396-2.429 1.398-1.498 2.067-3.571 2.067-6.117 0-2.546-.669-4.619-2.067-6.117-1.491-1.594-3.642-2.411-6.396-2.429z"/>
    <path d="M16.817 11.181c-.414-2.969-2.449-4.906-5.158-4.906-2.965 0-5.079 2.184-5.079 5.247 0 3.063 2.114 5.247 5.079 5.247 2.158 0 3.888-1.235 4.61-3.247l-2.418-.598c-.359 1.235-1.235 1.958-2.192 1.958-1.488 0-2.567-1.079-2.567-2.567 0-1.488 1.079-2.567 2.567-2.567 1.235 0 2.192.958 2.192 2.192h2.966z"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export default function GuideSection({ className = '' }) {
  return (
    <div className={`bg-light min-vh-100 p-4 guide-section ${className}`}>
      {/* Back Button */}
      <button className="btn p-2 mb-4 back-button">
        <ChevronLeftIcon />
      </button>

      <div className="container-fluid" style={{ maxWidth: '1200px' }}>
        <div className="row g-5">
          {/* Left Side - Guide Card */}
          <div className="col-lg-4 col-md-6">
            <div className="card shadow guide-card">
              {/* Guide Image */}
              <div className="guide-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Person relaxing in hammock in Norwegian landscape"
                  className="card-img-top guide-image"
                />
              </div>
              
              {/* Guide Info */}
              <div className="card-body p-4">
                <div className="text-muted small mb-2">
                  161 things to do | 1 itinerary | 0 travel tips
                </div>
                <h5 className="card-title fw-bold text-dark mb-1">Norway Guide</h5>
                <p className="card-text text-muted small mb-0">Norway</p>
              </div>
            </div>
          </div>

          {/* Right Side - Guide Details */}
          <div className="col-lg-8 col-md-6">
            <div className="pt-lg-4">
              <h1 className="display-5 fw-bold text-dark mb-2 guide-title">Guide by Åsa Steinars</h1>
              <p className="text-muted small mb-4">Joined in April 2022</p>
              
              {/* Social Media Icons */}
              <div className="d-flex gap-3 mb-4">
                <button className="btn social-btn d-flex align-items-center justify-content-center">
                  <WebsiteIcon />
                </button>
                <button className="btn social-btn d-flex align-items-center justify-content-center">
                  <InstagramIcon />
                </button>
                <button className="btn social-btn d-flex align-items-center justify-content-center">
                  <TikTokIcon />
                </button>
                <button className="btn social-btn d-flex align-items-center justify-content-center">
                  <ThreadsIcon />
                </button>
              </div>

              {/* Bio */}
              <p className="text-dark lh-lg mb-4 guide-bio">
                Åsa Steinars is an adventure photographer and videographer from Iceland. Growing up 
                in the north, surrounded by extreme landscapes and forever changing weather has 
                given her a tight bond to nature and its forces. This you can clearly see in her 
                photography. She works as a full time content creator, helping people to travel Iceland 
                like she does. She has a total following of almost 2 million across her social media 
                platforms.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-outline-secondary action-btn">
                  Message
                </button>
                <button className="btn btn-outline-secondary action-btn">
                  Storefront
                </button>
                <button className="btn btn-outline-secondary action-btn">
                  Guide Affiliate Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}