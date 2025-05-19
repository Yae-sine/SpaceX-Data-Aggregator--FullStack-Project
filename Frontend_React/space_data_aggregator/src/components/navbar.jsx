import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://127.0.0.1:8000/api-authentication/logout/', {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setIsDropdownOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/');
        }
    };

    const navbarClass = scrolled
        ? "bg-indigo-900 dark:bg-gray-900 shadow-lg shadow-indigo-900/20 dark:shadow-black/30 backdrop-blur-md"
        : "bg-indigo-900/95 dark:bg-gray-900/95 backdrop-blur-md";

    return (
        <>
            <nav className={`${navbarClass} w-full z-50 fixed transition-all duration-300`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-indigo-900/50 hover:text-white focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                onClick={toggleMenu}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${isMenuOpen ? 'hidden' : 'block'} size-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>

                                <svg
                                    className={`${isMenuOpen ? 'block' : 'hidden'} size-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center md:justify-start">
                            <div className="flex shrink-0 items-center">
                                <div className="flex items-center gap-2">
                                    <div className="relative h-10 w-10">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse"></div>
                                        <div className="absolute inset-0.5 rounded-full bg-gray-900 flex items-center justify-center">
                                            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex flex-col -space-y-1">
                                        <span className="text-white text-xl font-bold tracking-tight">Space Launch</span>
                                        <span className="text-indigo-400 text-sm tracking-wider">TRACKER</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:ml-20 md:block">
                                <div className="flex space-x-4">
                                    <Link to={"/"} className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-800 hover:bg-opacity-70"
                                          aria-current="page">Home</Link>
                                    <Link to={"/launches"}
                                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Launches</Link>
                                    <Link to={"/astronauts"}
                                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Astronauts</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="relative h-10 w-10 rounded-full focus:outline-none"
                                        aria-expanded={isDropdownOpen}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                                        <div className="absolute inset-0.5 rounded-full bg-gray-900 flex items-center justify-center">
                                            <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                                                Profile
                                            </Link>
                                            <Link to="/favoriteLaunches" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                                                Favorite Launches
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/authentication">
                                    <button
                                        type="button"
                                        className="relative rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        Login / Signup
                                    </button>
                                </Link>
                            )}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full bg-indigo-800 hover:bg-indigo-700 transition-colors text-white dark:text-yellow-300 shadow-inner"
                                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {theme === 'dark' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M18.72 5.28l1.06-1.06M12 7.5A4.5 4.5 0 1112 16.5a4.5 4.5 0 010-9z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.28 2.712-7.92 6.548-9.21.5-.17 1.052.03 1.32.488.267.459.12 1.045-.326 1.32A7.501 7.501 0 0012 19.5c2.485 0 4.687-1.21 6.208-3.09.33-.41.946-.482 1.32-.326.459.267.658.82.488 1.32z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 bg-gray-900 border-t border-gray-800">
                        <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-800 hover:bg-opacity-70"
                              aria-current="page">Home</Link>
                        <Link to="/launches"
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Launches</Link>
                        <Link to="/astronauts"
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Astronauts</Link>

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;