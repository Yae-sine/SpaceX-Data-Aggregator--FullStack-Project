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
                const launchDetailsPromises = savedLaunches.map((savedLaunch) =>
                    axios.get(`http://localhost:8000/api-space-dev/upcomingLaunches/${savedLaunch.launch}`, {                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    })
                );

                const launchDetailsResponses = await Promise.all(launchDetailsPromises);
                const launches = launchDetailsResponses.map((response) => response.data);
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

    return (
        <div className="FavoriteLaunchesPage min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-4xl font-bold text-white text-center mb-8">Favorite Launches</h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && favoriteLaunches.length === 0 && (
                    <div className="text-center text-gray-400 py-16">
                        You have no favorite launches saved.
                    </div>
                )}

                {!loading && !error && favoriteLaunches.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favoriteLaunches.map((launch) => (
                            <div
                                key={launch.id}
                                className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group relative"
                            >
                                <div className="flex flex-col">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <img
                                            src={launch.image_url || "/assets/default-rocket.jpg"}
                                            alt={launch.name}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/assets/default-rocket.jpg";
                                            }}
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                            {launch.name}
                                        </h2>
                                        <p className="mt-2 text-gray-400 text-sm">
                                            {new Date(launch.window_start).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <p className="mt-3 text-gray-300 line-clamp-3">
                                            {launch.mission_description || "No mission description available."}
                                        </p>
                                        <span
                                            className="inline-block bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded mt-2"
                                        >
                                            {launch.rocket_name}
                                        </span>
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