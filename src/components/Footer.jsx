import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    // Define links for easy modification
    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/jeet7122", label: "GitHub" },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/jeet-thakkar-054ba123b/", label: "LinkedIn" },
        { icon: FaEnvelope, href: "mailto:urlshrinkit@gmail.com", label: "Email Support" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        // Consistent dark background and padding from the previous components
        <footer className="bg-[#0d0d10] text-gray-400 border-t border-gray-800 px-5 sm:px-10 lg:px-20 py-12">
            <div className="max-w-6xl mx-auto">

                {/* Top Section: Logo, Name, and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b border-gray-800 pb-8 mb-8">

                    {/* Brand/Logo Section */}
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <img
                            src="/logo.png" // Assumes the logo is saved in public/logo.png
                            alt="Shrink-it Logo"
                            className="w-10 h-10 mb-2 drop-shadow-lg"
                        />
                        <p className="text-xl font-bold text-neon-gradient">Shrink-it</p>
                        <p className="text-sm mt-1 text-gray-500">Smarter Links. Faster Growth.</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-6 text-2xl">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="text-gray-500 hover:text-neon transition-colors duration-300"
                            >
                                <link.icon />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Legal Links and Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center">

                    {/* Legal/Utility Links */}
                    <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 mb-4 sm:mb-0">
                        {legalLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} Shrink-it. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;