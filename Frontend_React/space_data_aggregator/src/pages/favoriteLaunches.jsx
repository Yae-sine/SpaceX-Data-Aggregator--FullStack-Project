import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";

function FavoriteLaunches() {
    const [favoriteLaunches, setFavoriteLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteLaunches = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("token");
                const savedLaunchesResponse = await axios.get(
                    "http://127.0.0.1:8000/api-favorite-launch/save-space-dev-launch/",
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                const savedLaunches = savedLaunchesResponse.data;
                console.log("Saved launches:", savedLaunches);

                const launchDetailsPromises = savedLaunches.map((savedLaunch) =>
                    axios.get(`http://localhost:8000/api-space-dev/upcomingLaunches/${savedLaunch.launch}`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    })
                );

                const launchDetailsResponses = await Promise.all(launchDetailsPromises);
                const launches = launchDetailsResponses.map((response) => response.data);
                console.log("Launch details:", launches);

                setFavoriteLaunches(launches);

            } catch (err) {
                console.error("Error fetching favorite launches:", err);
                setError("Failed to load favorite launches.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteLaunches();
    }, []);

    // Helper function to safely format date
    const formatDate = (dateString) => {
        if (!dateString) return "Date not available";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid date";

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Dynamic grid classes based on number of launches
    const getGridClasses = () => {
        const count = favoriteLaunches.length;

        // Base classes
        let classes = "flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl w-full";

        return classes;
    };

    // Calculate card width based on number of cards
    const getCardWidth = () => {
        const count = favoriteLaunches.length;

        if (count === 1) {
            return "w-full max-w-md"; // Single card is medium width
        } else if (count === 2) {
            return "w-full max-w-sm"; // Two cards are slightly narrower
        } else {
            return "w-full sm:max-w-sm"; // Three or more use responsive sizing
        }
    };    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-slate-100 text-gray-900 dark:from-black dark:via-gray-900 dark:to-indigo-950 dark:text-white">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16 flex-grow flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900 dark:text-white">Favorite Launches</h1>

                {loading && (
                    <div className="flex justify-center items-center h-64 w-full">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
                    </div>
                )}                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center shadow-sm dark:bg-red-900/30 dark:border-red-500 dark:text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && favoriteLaunches.length === 0 && (
                    <div className="text-center text-indigo-400 dark:text-gray-400 py-16 bg-white/80 dark:bg-gray-800/40 rounded-xl shadow-sm border border-indigo-100 dark:border-gray-700 px-8">
                        <svg className="mx-auto h-20 w-20 text-indigo-300 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-xl font-medium text-indigo-700 dark:text-gray-300">No Favorite Launches</h3>
                        <p className="mt-2 text-indigo-600 dark:text-gray-400">You haven't saved any launches to your favorites yet.</p>
                    </div>
                )}                {!loading && !error && favoriteLaunches.length > 0 && (
                    <div className={getGridClasses()}>
                        {favoriteLaunches.map((launch, index) => (
                            <div
                                key={launch?.id || index}
                                className={`${getCardWidth()} bg-white/90 dark:bg-gray-800/60 border border-indigo-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group relative`}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="relative aspect-video overflow-hidden bg-indigo-900">
                                        <img
                                            src={launch?.image_url || "/assets/default-rocket.jpg"}
                                            alt={launch?.name || "Launch"}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/assets/default-rocket.jpg";
                                            }}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <span className="inline-block bg-indigo-900/80 text-indigo-300 text-xs px-2 py-1 rounded">
                                                {launch?.rocket_name || "Unknown Rocket"}
                                            </span>
                                        </div>
                                    </div>                                    <div className="p-5 flex-grow flex flex-col">
                                        <h2 className="text-xl font-bold text-indigo-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                            {launch?.name || "Unknown Launch"}
                                        </h2>
                                        <p className="mt-2 text-indigo-600 dark:text-gray-400 text-sm flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(launch?.window_start)}
                                        </p>
                                        <div className="mt-3 flex-grow">
                                            <p className="text-indigo-950 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                                {launch?.mission_description?.trim() || "Mission description not available."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default FavoriteLaunches;