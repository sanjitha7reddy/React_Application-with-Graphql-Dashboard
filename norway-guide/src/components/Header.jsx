import PropTypes from 'prop-types';
import './Header.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useAuth } from '../AuthContext';

export default function Header({ className = '' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

const navigate = useNavigate();
const client = useApolloClient();

const handleLogout = async () => {
  await client.clearStore();              
  logout();                               
  localStorage.removeItem('jwt_token');   
  setIsMobileMenuOpen(false);            
  navigate('/login');                    
};


  return (
    <header className={`custom-header ${className}`}>
      <div className="container-xxl">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo-section">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex align-items-center">
                {/* Circular logo with "R" */}
                <div className="logo-circle">
                  <span className="logo-text">R</span>
                </div>
                <span className="brand-name">𝗥𝗲𝘅𝗯𝘆</span>
              </div>
            </Link>
          </div>
          
          {/* Right Section */}
          <div className="header-actions">
            {/* Globe/Language Icon */}
            <button
              className="btn"
             
            >
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </button>
            
            {/* Authentication Section - Desktop */}
            <div className="d-none d-md-flex align-items-center">
              {isAuthenticated() ? (
                <>
                  {/* User Avatar/Name */}
                  {user && (
                    <div className="d-flex align-items-center me-3">
                      <div className="user-avatar me-2">
                        <span className="user-initial">
                          {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="user-name text-dark fw-medium">
                        {user.username}
                      </span>
                    </div>
                  )}
                  
                  <Link 
                    to="/dashboard" 
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Dashboard
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Login
                  </Link>
                  
                  <Link 
                    to="/signup" 
                    className="btn btn-sm login-btn"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            {/* Menu Button - Mobile */}
            <button
              className="btn action-btn d-md-none"
              aria-label="Open menu"
              onClick={toggleMobileMenu}
            >
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu d-md-none">
            <div className="mobile-menu-content">
              {isAuthenticated() ? (
                <>
                  {/* User Info */}
                  {user && (
                    <div className="mobile-user-info">
                      <div className="d-flex align-items-center mb-3">
                        <div className="user-avatar me-2">
                          <span className="user-initial">
                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div>
                          <div className="fw-medium text-dark">{user.username}</div>
                          <div className="small text-muted">{user.email}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Link 
                    to="/dashboard" 
                    className="mobile-menu-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Dashboard
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="mobile-menu-item text-danger border-0 bg-transparent w-100 text-start"
                  >
                    <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="mobile-menu-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Login
                  </Link>
                  
                  <Link 
                    to="/signup" 
                    className="mobile-menu-item text-primary fw-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string
};