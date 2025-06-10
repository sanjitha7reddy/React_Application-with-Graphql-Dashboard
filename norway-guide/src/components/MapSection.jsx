import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import './MapSection.css';

// Custom marker icons with different colors
const createCustomIcon = (color, iconType = 'circle') => {
  const iconHtml = iconType === 'heart' 
    ? `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
         </svg>
       </div>`
    : iconType === 'star'
    ? `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
         <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
         </svg>
       </div>`
    : iconType === 'camera'
    ? `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
         <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
           <path d="M12 15.5c1.93 0 3.5-1.57 3.5-3.5S13.93 8.5 12 8.5 8.5 10.07 8.5 12s1.57 3.5 3.5 3.5zm0-5c.83 0 1.5.67 1.5 1.5S12.83 13.5 12 13.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/>
           <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
         </svg>
       </div>`
    : `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const LOCATIONS = [
  {
    id: 1,
    name: "Lofoten Islands",
    position: [68.1500, 13.6000],
    description: "Dramatic peaks, pristine beaches, and picturesque fishing villages in Arctic Norway.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#FF6B6B",
    type: "heart",
    category: "Natural Wonder"
  },
  {
    id: 2,
    name: "Geirangerfjord",
    position: [62.1000, 7.0000],
    description: "UNESCO World Heritage fjord with spectacular waterfalls and dramatic cliffs.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#4ECDC4",
    type: "star",
    category: "UNESCO Site"
  },
  {
    id: 3,
    name: "Preikestolen",
    position: [58.9864, 6.1881],
    description: "Famous cliff plateau offering breathtaking views over Lysefjord.",
    image: "https://images.unsplash.com/photo-1583719088850-4ab5be7ed5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#45B7D1",
    type: "camera",
    category: "Adventure"
  },
  {
    id: 4,
    name: "Trolltunga",
    position: [60.1242, 6.7397],
    description: "Spectacular rock formation jutting out from the mountain 700 meters above sea level.",
    image: "https://images.unsplash.com/photo-1516637090014-9a72a2c5de8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#96CEB4",
    type: "star",
    category: "Hiking"
  },
  {
    id: 5,
    name: "Bergen",
    position: [60.3913, 5.3221],
    description: "Historic Hanseatic city with colorful wooden houses and gateway to the fjords.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#FFEAA7",
    type: "circle",
    category: "City"
  },
  {
    id: 6,
    name: "Northern Lights Viewing",
    position: [69.6492, 18.9553],
    description: "Prime location for viewing the magical Aurora Borealis in winter months.",
    image: "https://images.unsplash.com/photo-1516637090014-9a72a2c5de8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#A29BFE",
    type: "star",
    category: "Northern Lights"
  },
  {
    id: 7,
    name: "Atlantic Road",
    position: [63.0175, 7.3561],
    description: "Scenic road with dramatic bridges connecting small islands along the coast.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#FD79A8",
    type: "circle",
    category: "Scenic Drive"
  },
  {
    id: 8,
    name: "Flåm Railway",
    position: [60.8619, 7.1131],
    description: "One of the world's steepest train rides through spectacular mountain scenery.",
    image: "https://images.unsplash.com/photo-1583719088850-4ab5be7ed5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "#6C5CE7",
    type: "circle",
    category: "Railway"
  }
];

export default function MapSection({ setActiveLocation, activeLocation, className = '' }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  return (
    <section className={`mb-5 ${className}`}>
      {/* Header Section */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">
         
          
          <h2 className="display-5 fw-bold text-dark mb-0">Interactive Map</h2>
        </div>
        <p className="text-muted lead" style={{maxWidth: '48rem'}}>
          Get an interactive, playful and visually appealing map that helps you navigate the noise
        </p>
      </div>

      {/* Map Container starts from here */}
      <div className="bg-white rounded shadow-lg overflow-hidden">
        <div className="position-relative">


          {/* Fullscreen button for the map*/}
          <button 
            className="btn btn-light position-absolute fullscreen-btn"
            style={{top: '1rem', right: '1rem', zIndex: 10}}
            aria-label="Expand map to fullscreen"
          >
            <svg className="bi bi-arrows-fullscreen" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
            </svg>
          </button>


          <div className="map-container" style={{height: '500px'}} aria-label="Norway locations map">
            <MapContainer
              center={[64.0, 12.0]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              className="rounded"
              aria-label="Interactive map of Norway"

              scrollWheelZoom={true}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              {LOCATIONS.map(location => (
                <Marker
                  key={location.id}
                  position={location.position}
                  icon={createCustomIcon(location.color, location.type)}
                  eventHandlers={{
                    click: () => setActiveLocation(location),
                    mouseover: () => setHoveredLocation(location),
                    mouseout: () => setHoveredLocation(null),
                  }}
                  aria-label={`Marker for ${location.name}`}
                >
                  {/* Once pressed on a location,popup displays */}
                  <Popup>
                    <div className="text-center p-2">
                      
                      <div 
                        className="rounded-circle mx-auto mb-2"
                        style={{ 
                          backgroundColor: location.color,
                          width: '32px',
                          height: '32px'
                        }}
                      ></div>
                      <h3 className="fw-bold text-dark mb-1 fs-6">{location.name}</h3>
                      <p className="text-muted mb-2" style={{fontSize: '0.75rem'}}>{location.category}</p>
                      <p className="text-secondary small">{location.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Location Details Card */}
      {activeLocation && (
        <div className="mt-4 bg-white rounded shadow-lg overflow-hidden location-card">
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src={activeLocation.image}
                alt={activeLocation.name}
                className="img-fluid h-100 object-fit-cover"
                style={{minHeight: '250px'}}
              />
            </div>
            <div className="col-md-7 d-flex align-items-center">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle me-2"
                    style={{ 
                      backgroundColor: activeLocation.color,
                      width: '12px',
                      height: '12px'
                    }}
                  ></div>
                  <span className="text-muted text-uppercase fw-medium small">
                    {activeLocation.category}
                  </span>
                </div>
                <h3 className="card-title h4 fw-bold text-dark mb-3">{activeLocation.name}</h3>
                <p className="card-text text-muted mb-4 lh-lg">{activeLocation.description}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary px-4"
                    aria-label={`View details for ${activeLocation.name}`}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setActiveLocation(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 bg-light rounded p-4 map-legend">
        <h4 className="fw-semibold text-dark mb-3">Map Legend</h4>
        <div className="row row-cols-2 row-cols-md-4 g-3">

          {[...new Set(LOCATIONS.map(loc => loc.category))].map(category => {
            const location = LOCATIONS.find(loc => loc.category === category);

            return (
              <div key={category} className="col">
                <div className="d-flex align-items-center legend-item rounded p-2">
                  {/* Creating a dot,the name of the place */}
                  <div 
                    className="rounded-circle me-2"
                    style={{ 
                      backgroundColor: location.color,
                      width: '16px',
                      height: '16px'
                    }}
                  ></div>
                  <span className="small text-secondary">{category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

MapSection.propTypes = {
  setActiveLocation: PropTypes.func.isRequired,
  activeLocation: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
    description: PropTypes.string,
    image: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string
  }),
  className: PropTypes.string
};