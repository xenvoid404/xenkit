'use client';

import Link from 'next/link';
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import { GoZap } from 'react-icons/go';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
            aria-labelledby="hero-heading"
        >
            {/* Background decoration - more subtle */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
                <div className="text-center space-y-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium animate-fade-in-up backdrop-blur-sm">
                        <GoZap className="w-4 h-4" />
                        <span>25+ Developer Tools Available</span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-8 animate-fade-in-up animation-delay-150">
                        <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                            <span className="block mb-2">
                                <span className="text-gradient-primary">Powerful Tools</span>
                            </span>
                            <span className="block text-foreground">For Modern Developers</span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                            Your ultimate toolkit with all the essential utilities for development, security and productivity in one place.
                            <span className="text-foreground font-medium block mt-2 sm:inline sm:mt-0"> Free, fast, and secure.</span>
                        </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/15 transition-colors duration-300">
                                <IoShieldCheckmarkOutline className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="font-medium">No signup required</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/15 transition-colors duration-300">
                                <FaRegClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium">Instant results</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 group-hover:bg-yellow-500/15 transition-colors duration-300">
                                <GoZap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <span className="font-medium">Always free</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="animate-fade-in-up animation-delay-500">
                        <Link href="#featured-tools">
                            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10">Explore Tools</span>
                                <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
