import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

function LaunchesPage() {
    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [savedLaunches, setSavedLaunches] = useState([]);
    const [savingLaunch, setSavingLaunch] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        const fetchLaunches = async () => {
            try {
                setLoading(true);
                const endpoint = activeTab === 'upcoming'
                    ? 'http://localhost:8000/api-space-dev/upcomingLaunches'
                    : 'http://localhost:8000/api-space-dev/pastLaunches';

                const response = await axios(endpoint);
                setLaunches(response.data);
                setError(null);
            } catch (error) {
                console.error(`Error fetching ${activeTab} launches:`, error);
                setError(`Failed to load ${activeTab} launches. Please try again later.`);
            } finally {
                setLoading(false);
            }
        };

        fetchLaunches();

        if (token) {
            fetchSavedLaunches(token);
        }
    }, [activeTab]);

    const fetchSavedLaunches = async (token) => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api-favorite-launch/save-space-dev-launch/',
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );

            const savedLaunchesMap = response.data.reduce((acc, item) => {
                acc[item.launch] = item.id;
                return acc;
            }, {});
            setSavedLaunches(savedLaunchesMap);
        } catch (error) {
            console.error('Error fetching saved launches:', error);
        }
    };

    const handleSaveLaunch = async (launchId) => {
        if (!isAuthenticated) {
            navigate('/authentication');
            return;
        }

        try {
            setSavingLaunch(launchId);
            const token = localStorage.getItem('token');

            if (savedLaunches[launchId]) {
                // DELETE request using the SavedSpaceDevLaunch ID
                const savedLaunchId = savedLaunches[launchId];
                await axios.delete(
                    `http://127.0.0.1:8000/api-favorite-launch/save-space-dev-launch/${savedLaunchId}/`,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }
                );
                // Remove the launch from the saved launches map
                const updatedSavedLaunches = { ...savedLaunches };
                delete updatedSavedLaunches[launchId];
                setSavedLaunches(updatedSavedLaunches);
            } else {
                // POST request to save the launch
                const response = await axios.post(
                    'http://127.0.0.1:8000/api-favorite-launch/save-space-dev-launch/',
                    { launch: launchId },
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }
                );
                // Add the new saved launch to the saved launches map
                setSavedLaunches({
                    ...savedLaunches,
                    [launchId]: response.data.id // Use the returned SavedSpaceDevLaunch ID
                });
            }
        } catch (error) {
            console.error('Error saving/unsaving launch:', error);
        } finally {
            setSavingLaunch(null);
        }
    };

    const calculateTimeRemaining = (launchDate) => {
        const difference = new Date(launchDate) - new Date();


        if (difference < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const LaunchCountdown = ({ launchDate }) => {
        const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(launchDate));

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeRemaining(calculateTimeRemaining(launchDate));
            }, 1000);

            return () => clearInterval(timer);
        }, [launchDate]);

        return (
            <div className="flex justify-center space-x-6 text-white font-mono">
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-900 px-4 py-3 rounded-md text-3xl font-bold">{timeRemaining.days}</div>
                    <div className="text-sm mt-1">DAYS</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-900 px-4 py-3 rounded-md text-3xl font-bold">{timeRemaining.hours}</div>
                    <div className="text-sm mt-1">HOURS</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-900 px-4 py-3 rounded-md text-3xl font-bold">{timeRemaining.minutes}</div>
                    <div className="text-sm mt-1">MINS</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-900 px-4 py-3 rounded-md text-3xl font-bold">{timeRemaining.seconds}</div>
                    <div className="text-sm mt-1">SECS</div>
                </div>
            </div>
        );
    };

    return (
        <div className="LaunchPage min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950">
            <Navbar/>
            <div className="container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-4xl font-bold text-white text-center mb-8">Space Launches</h1>

                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-gray-800 rounded-lg p-1">
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'upcoming' ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming Launches
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'past' ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setActiveTab('past')}
                        >
                            Past Launches
                        </button>
                    </div>
                </div>

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

                {!loading && !error && launches.length === 0 && (
                    <div className="text-center text-gray-400 py-16">
                        No {activeTab} launches found
                    </div>
                )}

                {!loading && !error && launches.length > 0 && (
                    <div className="grid grid-cols-1 gap-8">
                        {launches.map(launch => (
                            <div key={launch.id}
                                 className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group relative">

                                <button
                                    onClick={() => handleSaveLaunch(launch.id)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-900/80 hover:bg-indigo-800/80 transition-colors"
                                    title={savedLaunches.hasOwnProperty(launch.id) ? "Remove from favorites" : "Save to favorites"}
                                    disabled={savingLaunch === launch.id}
                                >
                                    {savingLaunch === launch.id ? (
                                        <div
                                            className="animate-spin h-5 w-5 border-2 border-indigo-300 border-t-transparent rounded-full"></div>
                                    ) : (
                                        <svg
                                            className="h-5 w-5"
                                            fill={savedLaunches.hasOwnProperty(launch.id) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            style={{color: savedLaunches.hasOwnProperty(launch.id) ? '#818cf8' : '#9ca3af'}}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                                        </svg>
                                    )}
                                </button>

                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 md:max-w-xs">
                                        {launch.image_url ? (
                                            <div className="h-full flex items-center justify-center p-2">
                                                <img
                                                    src={launch.image_url}
                                                    alt={`${launch.name} mission`}
                                                    className="w-full h-48 md:h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "/assets/default-rocket.jpg";
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="h-48 md:h-full bg-gradient-to-r from-gray-900 to-indigo-900 flex items-center justify-center p-2">
                                                <svg className="w-16 h-16 text-indigo-300/50" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:w-2/3 p-5">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                {launch.name}
                                            </h2>
                                            <span
                                                className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded">
                                                {launch.rocket_name}
                                            </span>
                                        </div>

                                        <div className="mt-2 text-gray-400 text-sm">
                                            {launch.mission_type && (
                                                <span
                                                    className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs mr-2">
                                                    {launch.mission_type}
                                                </span>
                                            )}
                                            {new Date(launch.window_start).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>

                                        <p className="mt-3 text-gray-300 line-clamp-3">
                                            {launch.mission_description || "No mission description available."}
                                        </p>

                                        {activeTab === 'upcoming' && (
                                            <div className="mt-6 p-4 bg-gray-900/70 rounded-lg">
                                                <p className="text-center text-indigo-300 text-sm mb-3">LAUNCH
                                                    COUNTDOWN</p>
                                                <LaunchCountdown launchDate={launch.window_start}/>
                                            </div>
                                        )}

                                        {activeTab === 'past' && (
                                            <div className="mt-6 p-4 bg-gray-900/70 rounded-lg">
                                                <p className="text-center text-indigo-300 text-sm mb-3">LAUNCH
                                                    STATUS</p>
                                                <div className="flex justify-center items-center">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                            launch.status === 'Launch Successful' ? 'bg-green-900/50 text-green-300' :
                                launch.status === 'Launch Unsuccessful' ? 'bg-red-900/50 text-red-300' :
                                    'bg-yellow-900/50 text-yellow-300'
                        }`}>
                            <span className={`w-3 h-3 mr-2 rounded-full ${
                                launch.status === 'Success' ? 'bg-green-400' :
                                    launch.status === 'Failure' ? 'bg-red-400' :
                                        'bg-yellow-400'
                            }`}></span>
                            {launch.status || 'Unknown'}
                        </span>
                                                </div>
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

export default LaunchesPage;