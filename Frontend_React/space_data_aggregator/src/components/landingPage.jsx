import React from 'react';
import backgroundImage from './images/backgrnd.jpg';
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Background image with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{backgroundImage: `url(${backgroundImage})`}}
            >
                {/* Reduced opacity overlay */}
                <div
                    className="absolute inset-0 bg-black bg-opacity-30 bg-gradient-to-t from-black via-transparent"></div>
            </div>

            {/* Hero content */}
            <div
                className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
                {/* Add a subtle text shadow to improve readability against lighter background */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
    <span
        className="block p-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700 animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_15px_rgba(79,70,229,0.6)] transition-all hover:scale-105">
        Welcome to the Space Launch Tracker
    </span>
                </h1>

                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 max-w-4xl transition-all">
    <span
        className="bg-gradient-to-r from-cyan-400 to-indigo-400 text-transparent bg-clip-text animate-[pulse_4s_ease-in-out_infinite] drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">
        Never Miss a Launch Again
    </span>
                </p>

                {/* Scroll indicator */}
                <div
                    className="absolute bottom-8 left-1/2.5 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
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
            <div className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black">
                <div className="max-w-7xl mx-auto">
                    {/* Features section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Explore the Universe</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">Stay updated with the latest space missions,
                            rocket launches, and astronaut activities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature cards */}
                        <div
                            className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-indigo-900/30 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                            <div className="text-indigo-400 mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Upcoming Launches</h3>
                            <p className="text-gray-300">Get real-time updates on upcoming rocket launches from SpaceX
                                and other agencies.</p>
                        </div>

                        <div
                            className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-indigo-900/30 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                            <div className="text-indigo-400 mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Astronaut Profiles</h3>
                            <p className="text-gray-300">Learn about the brave men and women pushing the boundaries of
                                space exploration.</p>
                        </div>

                        <div
                            className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-indigo-900/30 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                            <div className="text-indigo-400 mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Rocket Database</h3>
                            <p className="text-gray-300">Explore detailed specifications and history of rockets that
                                make space travel possible.</p>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold text-white mb-6">Ready to start your space journey?</h2>
                        <Link to="/launches"
                              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50">
                            View Upcoming Launches
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;