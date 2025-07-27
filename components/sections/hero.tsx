'use client';

import Link from 'next/link';
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import { GoZap } from 'react-icons/go';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/5"
            aria-labelledby="hero-heading"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in-up">
                        <GoZap className="w-4 h-4" />
                        <span>25 Developer Tools Available</span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-6 animate-fade-in-up animation-delay-150">
                        <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
                            <span className="block">
                                <span className="text-gradient-glow">Powerful Tools</span>
                            </span>
                            <span className="block mt-2">For Modern Developers</span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                            Your ultimate toolkit with all the essential utilities for development, security and productivity in one place.
                            <span className="text-foreground font-medium"> Free, fast, and secure.</span>
                        </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
                        <div className="flex items-center gap-2">
                            <IoShieldCheckmarkOutline className="w-4 h-4 text-green-500" />
                            <span>No signup required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaRegClock className="w-4 h-4 text-blue-500" />
                            <span>Instant results</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GoZap className="w-4 h-4 text-yellow-500" />
                            <span>Always free</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-500">
                        <Link href="#featured-tools">
                            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10">Explore Tools</span>
                                <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
