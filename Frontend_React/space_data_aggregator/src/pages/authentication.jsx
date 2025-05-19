import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function AuthenticationPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            if (isLogin) {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api-authentication/login/",
                    {
                        username: formData.username,
                        password: formData.password,
                    }
                );

                localStorage.setItem("token", response.data.token);
                setSuccess("Login successful! Redirecting...");

                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api-authentication/register/",
                    {
                        username: formData.username,
                        password: formData.password,
                        email: formData.email,
                    }
                );
                setSuccess("Registration successful! Please log in.");
                setIsLogin(true);
                setFormData({ ...formData, password: "" });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "An error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };    return (        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-slate-100 text-gray-900 dark:from-black dark:via-gray-900 dark:to-indigo-950 dark:text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300/40 dark:bg-indigo-800/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/30 dark:bg-blue-900/20 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            <Navbar />            <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center relative z-10">
                <div className="max-w-md w-full bg-indigo-50/95 dark:bg-gray-900/80 backdrop-blur-sm border border-indigo-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700"></div>
                    <div className="absolute top-3 right-3 opacity-30 dark:opacity-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-700 dark:text-indigo-300">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="6"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                    </div>
                    <div className="p-8">
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-900 dark:text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p className="text-center text-indigo-600/70 dark:text-indigo-400 mb-8">{isLogin ? 'Sign in to continue to Space Data Aggregator' : 'Join us to explore the cosmos'}</p>
                        
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center mb-6 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center mb-6 dark:bg-green-900/30 dark:border-green-500 dark:text-green-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {success}
                        </div>
                    )}                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="relative transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]">
                                <label htmlFor="email" className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">
                                    Email
                                </label>
                                <div className="flex group">
                                    <div className="flex items-center px-3 bg-indigo-100 dark:bg-indigo-900/40 border border-r-0 border-indigo-200 dark:border-indigo-700 rounded-l-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/80 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 rounded-r-lg px-4 py-3 text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors duration-300"
                                    placeholder="your.email@example.com"
                                    required={!isLogin}
                                />
                                </div>
                            </div>
                        )}                        <div className="relative transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]">
                            <label htmlFor="username" className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">
                                Username
                            </label>
                            <div className="flex group">
                                <div className="flex items-center px-3 bg-indigo-100 dark:bg-indigo-900/40 border border-r-0 border-indigo-200 dark:border-indigo-700 rounded-l-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-white/80 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 rounded-r-lg px-4 py-3 text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors duration-300"
                                    placeholder="your_username"
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>                        <div className="relative transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]">
                            <label htmlFor="password" className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">
                                Password
                            </label>
                            <div className="flex group">
                                <div className="flex items-center px-3 bg-indigo-100 dark:bg-indigo-900/40 border border-r-0 border-indigo-200 dark:border-indigo-700 rounded-l-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/80 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 rounded-r-lg px-4 py-3 text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors duration-300"
                                    placeholder="••••••••"
                                    required
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                />
                                <div className="absolute right-3 top-9">
                                    <div className="text-indigo-400 dark:text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer">
                                        {/* Password visibility toggle could be added here */}
                                    </div>
                                </div>
                            </div>
                            {!isLogin && (
                                <p className="text-xs text-indigo-500/70 dark:text-indigo-400/70 mt-1">Password must be at least 8 characters</p>
                            )}
                        </div>                        <div className="pt-6 space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner dark:from-indigo-700 dark:to-indigo-600 dark:hover:from-indigo-600 dark:hover:to-indigo-500 transform hover:translate-y-[-2px] active:translate-y-0"
                            >
                                {loading ? (
                                    <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                                ) : isLogin ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                                        <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                )}
                                <span className="font-medium">{isLogin ? "Sign In" : "Create Account"}</span>
                            </button>                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-indigo-300 dark:border-indigo-800"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-indigo-50 dark:bg-gray-900 text-indigo-600 dark:text-indigo-400">or</span>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="mt-6 text-center pb-2">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium transition-all duration-300 hover:translate-x-1"
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                      <div className="bg-indigo-200/60 dark:bg-indigo-900/20 py-3 px-6 text-center text-xs text-indigo-700 dark:text-indigo-400/70">
                        <p>Explore the cosmos with our space data aggregator</p>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AuthenticationPage;