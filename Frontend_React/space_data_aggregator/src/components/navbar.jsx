import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
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

    const navbarClass = scrolled
        ? "bg-gray-900 shadow-lg shadow-black/30 backdrop-blur-md"
        : "bg-gray-900/95 backdrop-blur-md";

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
                            <div className="hidden md:ml-6 md:block">
                                <div className="flex space-x-4">
                                    <Link to={"/"} className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-800 hover:bg-opacity-70"
                                          aria-current="page">Home</Link>
                                    <Link to={"/launches"}
                                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Launches</Link>
                                    <Link to={"/astronauts"}
                                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Astronauts</Link>
                                    <Link to={"/rockets"}
                                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Rockets</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {/* Login/Signup button */}
                            <button type="button"
                                    className="relative rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25">
                                <span className="absolute -inset-1.5"></span>
                                Login / Signup
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 bg-gray-900 border-t border-gray-800">
                        <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-800 hover:bg-opacity-70"
                              aria-current="page">Home</Link>
                        <Link to={"/launches"}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Launches</Link>
                        <Link to={"/astronauts"}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Astronauts</Link>
                        <Link to={"/rockets"}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-70 hover:text-white">Rockets</Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;