import React from 'react';
import backgroundImage from './images/backgrnd.jpg';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Background image with overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Reduced opacity overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 bg-gradient-to-t from-black via-transparent"></div>
            </div>

            {/* Hero content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
                {/* Add a subtle text shadow to improve readability against lighter background */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse shadow-text">
                        Welcome to the Space Launch Tracker
                    </span>
                </h1>
                
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-10 max-w-3xl drop-shadow-lg">
                    Never Miss a Launch Again
                </p>
                
                <button className="px-8 py-3 rounded-full text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none">
                    Explore Launches
                </button>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-gray-200 mb-2 text-sm drop-shadow-md">Scroll Down</span>
                    <svg 
                        className="w-6 h-6 text-gray-200" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 