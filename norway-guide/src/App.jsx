
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './AuthContext';
import './App.css';
import Header from './components/Header';
import MapSection from './components/MapSection';
import ThingsToDo from './components/ThingsToDo';
import CommunitySection from './components/CommunitySection';
import GuideSection from './components/GuideSection';
import Recommendations from './components/Recommendations';
import FAQ from './components/FAQ';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

// Create Apollo Client
const httpLink = createHttpLink({
  uri: 'https://api-qa.seamasterai.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function HomePage({ activeLocation, setActiveLocation }) {
  return (
    <>
      <main className="container-fluid px-4">
        
        
        <section className="row py-4 hero-section">
          {/* starting Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful Norwegian landscape with mountains, lake, and a red hammock"
                className="img-fluid rounded shadow-lg hero-image"
                style={{ height: '450px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Main title */}
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1 className="display-4 fw-bold text-dark mb-4 guide-title">
              Norway Guide
            </h1>
            
            {/* Author info */}
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lybCUyMHBob3RvfGVufDB8fDB8fHww"
                  alt="Åsa Steinars"
                  className="rounded-circle author-avatar"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </div>
              <div className="d-flex align-items-center flex-wrap">
                <span className="text-muted me-3">Guide by <strong>Asa Steinars</strong></span>
                <span className="text-muted me-3">Norway</span>
                <div className="d-flex align-items-center">
                  <svg className="text-primary me-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="badge bg-primary new-badge">New</span>
                </div>
              </div>
            </div>

            {/* Description at the side */}
            <div className="mb-4">
              <p className="text-muted mb-3 guide-description">
                Norway is my second home. I was born in Norway and I lived there until I was 7 years old. I 
                often come back and I love this country almost as much as Iceland. Last summer I spent 3 
                months on the road with my van exploring everything from the south tip up to Lofoten.
              </p>
              <p className="text-muted guide-description">
                This guide is my best tips for Norway to make sure you get the most out of your trip. It's 
                focused around the fjords in the west and Lofoten in the north. In my opinion, it's the best 
                areas to explore in Norway.
              </p>
            </div>

            {/*  Buttons below description */}
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <button className="btn btn-outline-secondary w-100 py-2 fw-medium preview-btn">
                  Preview
                </button>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-success w-100 py-2 fw-medium access-btn" style={{ backgroundColor: '#14b8a6', borderColor: '#14b8a6' }}>
                  GET ACCESS
                </button>
              </div>
            </div>

          
            <p className="small text-muted text-end mb-0">
              Used for <strong>100+</strong> trips
            </p>
          </div>
        </section>

        {/* Rest of your sections */}
        <div className="py-5">
          <MapSection setActiveLocation={setActiveLocation} activeLocation={activeLocation} />
          <ThingsToDo />
          <CommunitySection />
          <GuideSection />
          <Recommendations />
          <FAQ />
        </div>
      </main>

      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          {/*  Adding year to footer */}
          <p className="mb-0">© {new Date().getFullYear()} Norway Guide. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div className="min-vh-100 bg-white">
            <Header />
            
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route 
                path="/" 
                element={<HomePage activeLocation={activeLocation} setActiveLocation={setActiveLocation} />} 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;