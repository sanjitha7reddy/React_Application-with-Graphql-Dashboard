import { useState } from 'react';

const LandingPage = ({ onEnter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Aurora-like effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-400/10 to-transparent animate-pulse opacity-30" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-4">
        {/* Title with glowing effect */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 relative">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent animate-pulse">
            NORWAY
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">
            NORWAY
          </div>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover the magic of the Nordic wilderness through an expertly crafted journey
        </p>

        {/* Interactive Enter Button */}
        <div className="relative">
          <button
            onClick={onEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-12 py-4 text-xl font-semibold text-white border-2 border-white/30 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:border-white/60 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            {/* Button glow effect */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-green-400 opacity-0 transition-opacity duration-500 blur-xl ${isHovered ? 'opacity-30' : ''}`} />
            
            {/* Button text */}
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Enter the Journey</span>
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>

            {/* Ripple effect on hover */}
            {isHovered && (
              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" />
            )}
          </button>
        </div>

        {/* Subtle hint text */}
        <p className="text-gray-400 text-sm mt-8 animate-bounce">
          Click to explore your Norwegian adventure
        </p>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Side decorative lines */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default LandingPage;