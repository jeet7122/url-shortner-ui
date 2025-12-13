import React, { useState } from "react";
import { FaBars, FaTimes, FaBolt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi.jsx";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { token, setToken } = useStoreContext();

    const toggleMenu = () => setIsOpen(!isOpen);

    const onLogoutHandler = () => {
        setIsOpen(false);
        setToken(null);
        localStorage.removeItem("JWT_TOKEN");
        navigate("/login");
    };

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
    ];

    const linkClasses =
        "text-gray-300 hover:text-neon transition-colors duration-300 font-medium";

    const primaryBtnClasses =
        "flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-lg glass transition-all duration-300 ease-in-out text-neon border-2 border-neon hover:bg-neon hover:text-black hover:scale-[1.05] shadow-neon/30 hover:shadow-neon";

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d10] border-b border-gray-800 px-5 sm:px-10 lg:px-20 py-4"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo and Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="URLShrinkIt Logo - Free URL Shortener"
                        className="w-8 h-8 drop-shadow-lg"
                    />
                    <span className="text-xl font-extrabold text-white sm:text-primary-gradient">
            Shrink-it
          </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.to} className={linkClasses}>
                            {link.name}
                        </Link>
                    ))}

                    {token ? (
                        <>
                            <Link to="/dashboard" className={primaryBtnClasses}>
                                <MdDashboard className="text-lg" />
                                Dashboard
                            </Link>
                            <button className={primaryBtnClasses} onClick={onLogoutHandler}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/register" className={primaryBtnClasses}>
                            <FaBolt className="text-lg" />
                            Sign Up
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="text-white focus:outline-none p-2 rounded-md hover:bg-gray-800"
                    >
                        {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden mt-4 pt-4 border-t border-gray-800 flex flex-col space-y-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={linkClasses}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`mt-4 ${primaryBtnClasses}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <FaBolt className="text-lg" />
                                Dashboard
                            </Link>
                            <button className={primaryBtnClasses} onClick={onLogoutHandler}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/register"
                            className={`mt-4 ${primaryBtnClasses}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <FaBolt className="text-lg" />
                            Sign Up
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
