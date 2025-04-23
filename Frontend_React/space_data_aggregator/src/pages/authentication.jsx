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
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-24">
                <div className="w-full max-w-md">
                    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden p-8 shadow-lg shadow-indigo-500/20">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">
                            {isLogin ? "Login" : "Create Account"}
                        </h2>

                        {error && (
                            <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg text-center mb-4">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-900/30 border border-green-500 text-green-200 p-3 rounded-lg text-center mb-4">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="username" className="block text-gray-300 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                ) : null}
                                {isLogin ? "Sign In" : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AuthenticationPage;