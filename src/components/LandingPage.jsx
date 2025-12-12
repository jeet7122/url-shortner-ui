import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaWrench } from "react-icons/fa";
import {useStoreContext} from "../contextApi/ContextApi.jsx"; // Icons for the buttons

/**
 * LandingPage — Hero section for the application, featuring the new logo
 * and a streamlined button design.
 *
 * Requirements:
 * - framer-motion
 * - react-icons
 * - Tailwind v4 + the CSS theme file (must be loaded)
 * - Place the logo (image_267880.png) in your public folder as /logo.png
 */

// Inherit the animation properties for consistency
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
    const {token} = useStoreContext()
    console.log("Token from landing page: " + token)

    return (
        // Consistent dark background
        <div className="min-h-[90vh] flex items-center justify-center px-5 sm:px-10 lg:px-20 py-20 bg-[#0d0d10] text-white">
            <div className="w-full max-w-5xl text-center">

                {/* Logo Section */}
                <motion.img
                    src="logo.png" // Assumes the logo is saved in the public directory
                    alt="Shrink-it Logo"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 drop-shadow-lg"
                />

                {/* Main Heading */}
                <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6"
                >
                    <span className="text-neon-gradient">Shrink-it.</span>
                    <br className="sm:hidden" />
                    Smarter Links.
                </motion.h1>

                {/* Subtitle / Tagline */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg sm:text-xl mb-12"
                >
                    The next-gen link manager for creators. Instant URL shrinking, custom slugs,
                    and <b>real-time analytics</b>-all in one smooth dashboard.
                </motion.p>

                {/* Call-to-Action Buttons */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >

                    {/* Primary Button: Create Short Links (Redesigned for sleeker Neon/Glass Look) */}
                    <a
                        href="/dashboard" // Link target
                        className="group flex items-center justify-center gap-3 px-8 py-3 text-lg font-bold rounded-xl glass transition-all duration-300 ease-in-out
                                   text-neon border-2 border-neon hover:bg-neon hover:text-black hover:scale-[1.05] shadow-neon/40 hover:shadow-neon"
                    >
                        <FaBolt className="text-xl transition-colors duration-300 group-hover:text-black" />
                        Create Short Links
                    </a>

                    {/* Secondary Button: Manage Links (Secondary style - kept consistent) */}
                    <a
                        href="/dashboard" // Link target
                        className="group flex items-center justify-center gap-3 px-8 py-3 text-lg font-bold rounded-xl glass transition-all duration-300 ease-in-out
                                   bg-transparent border-2 border-secondary text-white hover:bg-secondary hover:shadow-accent/50 hover:scale-[1.05]"
                    >
                        <FaWrench className="text-xl" />
                        Manage Links
                    </a>
                </motion.div>

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="mt-12 text-sm text-gray-500"
                >
                    Trusted by 10,000+ users to shorten and track millions of links.
                </motion.div>

            </div>
        </div>
    );
}