import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-transparent absolute w-full z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                            <button 
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:bg-opacity-50 hover:text-white focus:outline-none"
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
                                        <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
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
                                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-800 hover:bg-opacity-50"
                                       aria-current="page">Home</a>
                                    <a href="#"
                                       className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-50 hover:text-white">Launches</a>
                                    <a href="#"
                                       className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-50 hover:text-white">Astronauts</a>
                                    <a href="#"
                                       className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-50 hover:text-white">Rockets</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {/* Login/Signup button */}
                            <button type="button"
                                    className="relative rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25">
                                <span className="absolute -inset-1.5"></span>
                                Login / Signup
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 backdrop-blur-md bg-black bg-opacity-70">
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-800 hover:bg-opacity-50"
                           aria-current="page">Home</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-50 hover:text-white">Launches</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-50 hover:text-white">Astronauts</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-800 hover:bg-opacity-50 hover:text-white">Rockets</a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;