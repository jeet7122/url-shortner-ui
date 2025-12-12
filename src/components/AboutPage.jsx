import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

/**
 * AboutPage — responsive 2x2 card grid with center node + animated connecting lines.
 *
 * Requirements:
 *  - framer-motion
 *  - react-icons
 *  - Tailwind v4 + the CSS theme file (provided below)
 *
 * Usage:
 *  - import "./path/to/theme.css" in your root (index.css) or ensure theme variables are loaded.
 *  - place <AboutPage /> where needed.
 */

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const svgRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-120px" });

    // SVG path strings for the 4 connections (card -> center)
    const [paths, setPaths] = useState(["", "", "", ""]);
    const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });

    // feature data
    const features = [
        {
            icon: <FaLink className="text-neon text-4xl" />,
            title: "Instant URL Shrinking",
            text: "Turn long, messy URLs into clean, aesthetic links in seconds. Built for speed, minimalism, and effortless sharing.",
        },
        {
            icon: <FaShareAlt className="text-accent text-4xl" />,
            title: "Share Anywhere",
            text: "Drop your short links across socials, emails, DMs, and websites. Always trackable, fast, and creator-friendly.",
        },
        {
            icon: <FaEdit className="text-secondary text-4xl" />,
            title: "Smart Link Customization",
            text: "Brand your identity with custom slugs, keywords, and creator-focused styling that helps your links stand out.",
        },
        {
            icon: <FaChartLine className="text-neon text-4xl" />,
            title: "Real Analytics",
            text: "See clicks, devices, countries, referrers, and time-based trends. Your link performance, visualized.",
        },
    ];

    // helper: get center coords relative to SVG container
    function getRelativePoint(containerRect, rect, side = "center") {
        // side: "left", "right", "center"
        const x =
            side === "left"
                ? rect.left - containerRect.left
                : side === "right"
                    ? rect.right - containerRect.left
                    : rect.left - containerRect.left + rect.width / 2;

        const y = rect.top - containerRect.top + rect.height / 2;
        return { x, y };
    }

    // build a smooth cubic-Bezier path from start -> center
    function buildCurvePath(start, end) {
        // midX is half-distance; make curve bend toward center
        const midX = (start.x + end.x) / 2;
        // C control points chosen to make a smooth S-like curve
        return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} C ${midX.toFixed(
            2
        )} ${start.y.toFixed(2)} ${midX.toFixed(2)} ${end.y.toFixed(
            2
        )} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
    }

    // compute all 4 paths based on card positions and container
    const computePaths = () => {
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const cX = containerRect.width / 2;
        const cY = containerRect.height / 2;
        setCenterPoint({ x: cX, y: cY });

        const newPaths = features.map((_, i) => {
            const card = cardRefs.current[i];
            if (!card) return "";

            const rect = card.getBoundingClientRect();

            // mapping you requested:
            // index 0 (card1)   => right center
            // index 1 (card2)   => left center
            // index 2 (card3)   => right center (bottom-left card connects from right)
            // index 3 (card4)   => left center
            const side = i === 0 || i === 2 ? "right" : "left";
            const start = getRelativePoint(containerRect, rect, side);
            // center (end) in container coords:
            const end = { x: cX, y: cY };

            return buildCurvePath(start, end);
        });

        setPaths(newPaths);
    };

    // compute positions on mount, on in-view, on resize
    useLayoutEffect(() => {
        computePaths();

        let raf = null;
        const onResize = () => {
            // throttle with requestAnimationFrame for smoothness
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                computePaths();
            });
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onResize, { passive: true });

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onResize);
            if (raf) cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // recompute once we become visible (ensures layout settled)
    useLayoutEffect(() => {
        if (isInView) computePaths();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    // Utility to set ref for each card
    const setCardRef = (el, i) => {
        cardRefs.current[i] = el;
    };

    return (
        <div className="px-5 sm:px-10 lg:px-20 py-20 bg-[#0d0d10] text-white mt-5">
            {/* Header */}
            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold mb-5 text-primary-gradient"
            >
                About Shrink-it
            </motion.h1>

            <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
                className="text-gray-300 max-w-3xl leading-relaxed text-base sm:text-lg mb-16"
            >
                Shrink-it is a next-gen link management tool built for creators, students,
                startups, and businesses that want cleaner, smarter URLs. Shorten links instantly,
                customize slugs, track advanced analytics, and manage everything inside a smooth
                neon-styled dashboard designed for the modern web.
            </motion.p>

            {/* Feature Cards + Animated Lines */}
            <section
                ref={containerRef}
                className="relative w-full max-w-6xl mx-auto"
                aria-label="Features and connections"
            >
                {/* center glowing node (optional) */}
                <div
                    aria-hidden
                    style={{
                        left: `${centerPoint.x}px`,
                        top: `${centerPoint.y}px`,
                    }}
                    className="hidden md:block pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            boxShadow: "0 0 18px rgba(0,234,255,0.55)",
                            background: "var(--color-neon)",
                            borderRadius: 9999,
                        }}
                    />
                </div>

                {/* SVG connections (show on md+ only) */}
                <motion.svg
                    ref={svgRef}
                    className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
                    preserveAspectRatio="none"
                    // do not animate whole SVG; paths animate individually
                >
                    {paths.map((d, idx) => (
                        <motion.path
                            key={idx}
                            d={d}
                            stroke="var(--color-neon)"
                            strokeWidth={3}
                            strokeLinecap="round"
                            fill="transparent"
                            initial={{ pathLength: 0 }}
                            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 1.1 + idx * 0.18, ease: "easeInOut" }}
                            style={{
                                filter: "drop-shadow(0 0 10px rgba(0,234,255,0.45))",
                                opacity: 0.9,
                            }}
                        />
                    ))}
                </motion.svg>

                {/* Cards grid */}
                <div className="grid sm:grid-cols-2 gap-30 w-full relative">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            ref={(el) => setCardRef(el, i)}
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className={
                                "relative z-20 p-8 rounded-2xl glass shadow-primary transition-all " +
                                // responsive card height: tall on small screens, smaller on wide screens
                                "min-h-[65vh] sm:min-h-[48vh] lg:min-h-[28vh] flex flex-col justify-start"
                            }
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {item.icon}
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
