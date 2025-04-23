import React from 'react';
import backgroundImage from './images/backgrnd.jpg';
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-black text-white">


            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-fixed bg-center"
                    style={{backgroundImage: `url(${backgroundImage})`}}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black"></div>
                </div>
                <div className="absolute inset-0 overflow-hidden opacity-70">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: `${Math.random() * 2 + 1}px`,
                                height: `${Math.random() * 2 + 1}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-24 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-5xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 tracking-tight">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 filter drop-shadow-lg animate-pulse">
                            Space Launch Tracker
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl font-medium mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Your mission control for tracking <span className="text-cyan-400">upcoming launches</span>,
                        <span className="text-indigo-400"> mission details</span>, and
                        <span className="text-purple-400"> space exploration</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <Link to="/launches" className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View Launches
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2.5 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-gray-400 mb-2 text-sm">Explore More</span>
                    <svg className="w-6 h-6 text-indigo-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>

            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/80 to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Explore the Universe</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Your portal to the wonders of space exploration, providing real-time data on missions across our solar system.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="group bg-gradient-to-br from-gray-900 to-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl border border-indigo-900/30 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-2">
                            <div className="bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-700/50 transition-all duration-300">
                                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">Upcoming Launches</h3>
                            <p className="text-gray-300 mb-6">Track upcoming rocket launches with real-time countdowns, mission details, and launch sites from agencies worldwide.</p>
                            <Link to="/launches" className="text-indigo-400 font-medium flex items-center transition-colors group-hover:text-indigo-300">
                                View schedule
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>

                        <div className="group bg-gradient-to-br from-gray-900 to-purple-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2">
                            <div className="bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-700/50 transition-all duration-300">
                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Astronaut Profiles</h3>
                            <p className="text-gray-300 mb-6">Discover detailed biographies, mission history, and achievements of the pioneers pushing the boundaries of space exploration.</p>
                            <Link to="/astronauts" className="text-purple-400 font-medium flex items-center transition-colors group-hover:text-purple-300">
                                Meet the crew
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>

                    </div>

                    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">150+</div>
                            <div className="text-gray-400">Annual Launches</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">20+</div>
                            <div className="text-gray-400">Space Agencies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">30+</div>
                            <div className="text-gray-400">Launch Sites</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">600+</div>
                            <div className="text-gray-400">Active Satellites</div>
                        </div>
                    </div>

                    <div className="mt-24 text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-12 rounded-3xl border border-indigo-900/30">
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to begin your space journey?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Join our community of space enthusiasts and never miss another launch.</p>
                        <Link to="/launches" className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View Upcoming Launches
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;