import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";

function AstronautsPage() {
    const [astronauts, setAstronauts] = useState([]);
    const [agencies, setAgencies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [astronautsResponse, agenciesResponse] = await Promise.all([
                    axios('http://localhost:8000/api-space-dev/astronauts'),
                    axios('http://localhost:8000/api-space-dev/agencies')
                ]);

                const agencyMap = {};
                agenciesResponse.data.forEach(agency => {
                    agencyMap[agency.id] = agency.name;
                });

                setAstronauts(astronautsResponse.data);
                setAgencies(agencyMap);
                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="AstronautsPage min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-slate-100 text-gray-900 dark:from-black dark:via-gray-900 dark:to-indigo-950 dark:text-white">
            <Navbar/>
            <div className="container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800 dark:text-white">Astronauts</h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg text-center shadow-sm dark:bg-red-900/30 dark:border-red-500 dark:text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && astronauts.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-16">
                        No astronauts found
                    </div>
                )}

                {!loading && !error && astronauts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {astronauts.map(astronaut => (                            <div key={astronaut.id}
                                 className="bg-indigo-50/95 shadow-lg dark:bg-gray-800/60 border border-indigo-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex flex-col h-full">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        {astronaut.profile_image ? (
                                            <img
                                                src={astronaut.profile_image}
                                                alt={`${astronaut.name}`}
                                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/assets/default-astronaut.jpg";
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="h-full w-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-indigo-900 flex items-center justify-center">
                                                <svg className="w-20 h-20 text-indigo-400 dark:text-indigo-300/50" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                </svg>
                                            </div>
                                        )}                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-800/90 dark:from-black to-transparent px-5 py-4">
                                            <h2 className="text-2xl font-bold text-white dark:text-white group-hover:text-indigo-100 dark:group-hover:text-indigo-300 transition-colors">{astronaut.name}</h2>
                                            <div className="flex items-center">
                                                <span className="px-2 py-1 bg-indigo-700/80 dark:bg-indigo-900/60 rounded-md text-indigo-100 dark:text-indigo-300 text-sm font-medium">
                                                    {agencies[astronaut.agency] || 'Independent'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-grow flex flex-col">
                                        <div className="bg-indigo-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 shadow-inner">
                                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                <span className="text-indigo-700 dark:text-gray-400 font-medium">Nationality:</span>
                                                <span className="text-gray-800 dark:text-white text-right">{astronaut.nationality || 'Unknown'}</span>

                                                <span className="text-indigo-700 dark:text-gray-400 font-medium">Born:</span>
                                                <span className="text-gray-800 dark:text-white text-right">
                                                    {astronaut.date_of_birth
                                                        ? new Date(astronaut.date_of_birth).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                        : 'Unknown'}
                                                </span>

                                                <span className="text-indigo-700 dark:text-gray-400 font-medium">Flights:</span>
                                                <span className="text-indigo-600 dark:text-indigo-300 text-right font-bold">
                                                    {astronaut.flights_count ? (
                                                        <span className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/60 w-6 h-6 rounded-full">
                                                            {astronaut.flights_count}
                                                        </span>
                                                    ) : '0'}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 line-clamp-3 flex-grow">
                                            {astronaut.biography || "No biographical information available."}
                                        </p>

                                        {astronaut.wiki_link && (
                                            <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-gray-700">
                                                <a
                                                    href={astronaut.wiki_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300 w-full justify-center shadow-sm"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                    </svg>
                                                    Read More
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default AstronautsPage;