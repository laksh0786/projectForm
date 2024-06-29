import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                    Trident Group India
                </div>
                <div className="flex space-x-4">
                    <NavLink
                        to="/cost-buffing-form"
                        className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
                    >
                        Cost Buffing Form
                    </NavLink>
                    
                    <NavLink
                        to="/clri-form"
                        className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
                    >
                        CLRI Form
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
