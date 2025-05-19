import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function LaunchDetails() {
    const { id } = useParams();
    const [launch, setLaunch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLaunchDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api-space-dev/upcomingLaunches/${id}/`);
                setLaunch(response.data);
                setError(null);
            } catch (err) {
                // Try past launches if not found in upcoming
                try {
                    const response = await axios.get(`http://localhost:8000/api-space-dev/pastLaunches/${id}/`);
                    setLaunch(response.data);
                    setError(null);
                } catch (err2) {
                    setError("Launch not found.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLaunchDetails();
    }, [id]);    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-black">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-black dark:via-gray-900 dark:to-indigo-950 text-red-700 dark:text-red-400">
                <Navbar />
                <div className="text-2xl font-bold mt-24">{error}</div>
                <button className="mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 active:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600" onClick={() => navigate(-1)}>Go Back</button>
                <Footer />
            </div>
        );
    }
    if (!launch) return null;

    // Helper for boolean display
    const yesNo = (val) => val ? "Yes" : val === false ? "No" : "Unknown";    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 dark:from-black dark:via-gray-900 dark:to-indigo-950 dark:text-white">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 border border-indigo-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 flex flex-col items-center">
                            <img
                                src={launch.image_url || "/assets/default-rocket.jpg"}
                                alt={launch.name}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                                onError={e => { e.target.onerror = null; e.target.src = "/assets/default-rocket.jpg"; }}
                            />                            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded mt-2 shadow-sm">{launch.rocket_name}</span>
                        </div>
                        <div className="md:w-2/3">
                            <h1 className="text-3xl font-bold mb-2 text-indigo-900 dark:text-white">{launch.name}</h1>
                            <div className="text-indigo-600 dark:text-gray-400 text-sm mb-2">
                                {launch.mission_type && (
                                    <span className="inline-block bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs mr-2 shadow-sm border border-blue-100 dark:border-gray-600">{launch.mission_type}</span>
                                )}
                                {new Date(launch.window_start).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </div>                            <div className="mb-4">
                                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-sm border ${
                                    launch.status === 'Launch Successful' 
                                        ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/50 dark:border-green-800 dark:text-green-300' 
                                        : launch.status === 'Launch Unsuccessful' 
                                            ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300' 
                                            : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-yellow-900/50 dark:border-yellow-800 dark:text-yellow-300'
                                }`}>
                                    <span className={`w-3 h-3 mr-2 rounded-full ${
                                        launch.status === 'Success' 
                                            ? 'bg-green-500' 
                                            : launch.status === 'Failure' 
                                                ? 'bg-red-500' 
                                                : 'bg-amber-500'
                                    }`}></span>
                                    {launch.status || 'Unknown'}
                                </span>
                            </div>
                            <p className="text-indigo-950 dark:text-gray-300 mb-6 whitespace-pre-line leading-relaxed">{launch.mission_description || "No mission description available."}</p>                            {/* Countdown for upcoming launches */}
                            {launch.is_upcoming && (
                                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 dark:bg-gray-900/70 dark:border-gray-700 rounded-lg shadow-sm">
                                    <p className="text-center text-indigo-600 font-medium dark:text-indigo-300 text-sm mb-3">LAUNCH COUNTDOWN</p>
                                    <Countdown launchDate={launch.window_start} />
                                </div>
                            )}

                            <div className="mt-8 bg-indigo-50/80 border border-indigo-100 dark:bg-gray-800/60 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                                <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4">Launch Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-indigo-900 dark:text-gray-300 text-sm">
                                    {launch.pad_name && <div><span className="font-semibold text-indigo-600 dark:text-indigo-200">Pad:</span> {launch.pad_name}</div>}
                                    {launch.pad_location_name && <div><span className="font-semibold text-indigo-600 dark:text-indigo-200">Location:</span> {launch.pad_location_name}</div>}
                                    {(launch.pad_latitude && launch.pad_longitude) && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Coordinates:</span> {launch.pad_latitude}, {launch.pad_longitude}</div>}
                                    {launch.pad_wiki_url && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Pad Wiki:</span> <a href={launch.pad_wiki_url} className="underline text-indigo-700 dark:text-indigo-400" target="_blank" rel="noopener noreferrer">Link</a></div>}
                                    {launch.pad_map_url && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Pad Map:</span> <a href={launch.pad_map_url} className="underline text-indigo-700 dark:text-indigo-400" target="_blank" rel="noopener noreferrer">Map</a></div>}
                                    {launch.pad_image_url && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Pad Image:</span> <a href={launch.pad_image_url} className="underline text-indigo-700 dark:text-indigo-400" target="_blank" rel="noopener noreferrer">View</a></div>}
                                    {launch.mission_orbit && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Orbit:</span> {launch.mission_orbit}</div>}
                                    {launch.probability !== null && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Probability:</span> {launch.probability}%</div>}
                                    {launch.weather_concerns && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Weather:</span> {launch.weather_concerns}</div>}
                                    {launch.failreason && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Fail Reason:</span> {launch.failreason}</div>}
                                    {launch.hashtag && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Hashtag:</span> <span className="text-indigo-700 dark:text-indigo-400">{launch.hashtag}</span></div>}
                                    <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Webcast Live:</span> {yesNo(launch.webcast_live)}</div>
                                    {launch.infographic_url && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Infographic:</span> <a href={launch.infographic_url} className="underline text-indigo-700 dark:text-indigo-400" target="_blank" rel="noopener noreferrer">View</a></div>}
                                    {launch.program && <div><span className="font-semibold text-indigo-700 dark:text-indigo-200">Program:</span> {launch.program}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function Countdown({ launchDate }) {
    const [time, setTime] = useState(getTimeRemaining(launchDate));
    useEffect(() => {
        const timer = setInterval(() => setTime(getTimeRemaining(launchDate)), 1000);
        return () => clearInterval(timer);
    }, [launchDate]);
    if (!time) return null;
    return (
        <div className="flex justify-center space-x-6 text-indigo-900 dark:text-white font-mono">
            <div className="flex flex-col items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 px-4 py-3 rounded-lg text-3xl font-bold shadow-sm border border-indigo-200 dark:border-indigo-800">{time.days}</div>
                <div className="text-sm mt-1 text-indigo-600 dark:text-indigo-300 font-semibold">DAYS</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 px-4 py-3 rounded-lg text-3xl font-bold shadow-sm border border-indigo-200 dark:border-indigo-800">{time.hours}</div>
                <div className="text-sm mt-1 text-indigo-600 dark:text-indigo-300 font-semibold">HOURS</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 px-4 py-3 rounded-lg text-3xl font-bold shadow-sm border border-indigo-200 dark:border-indigo-800">{time.minutes}</div>
                <div className="text-sm mt-1 text-indigo-600 dark:text-indigo-300 font-semibold">MINS</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 px-4 py-3 rounded-lg text-3xl font-bold shadow-sm border border-indigo-200 dark:border-indigo-800">{time.seconds}</div>
                <div className="text-sm mt-1 text-indigo-600 dark:text-indigo-300 font-semibold">SECS</div>
            </div>
        </div>
    );
}

function getTimeRemaining(launchDate) {
    const difference = new Date(launchDate) - new Date();
    if (difference < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
}

export default LaunchDetails;
