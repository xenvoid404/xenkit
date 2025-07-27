'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { navigations, socials } from '@/data/navigations';
import { DonationButton } from '@/components/ui/donation-button';

export function AppFooter() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');

    const handleEmailSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Email subscribed:', email);
        setEmail('');
    };

    return (
        <footer className="relative bg-gradient-to-br from-background via-muted/5 to-background border-t border-muted/20">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section - Xenkit */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-3">
                                <span className="text-gradient-glow">Xenkit</span>
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                Your ultimate developer toolkit with all the essential utilities for development, security and productivity in one
                                place.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-1">
                        <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>
                        <ul className="space-y-3">
                            {navigations.map(item => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Email Subscribe */}
                    <div className="lg:col-span-1">
                        <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get the latest updates about new tools and features directly in your inbox.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="px-3 py-2 bg-background border border-muted/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Social Media */}
                    <div className="lg:col-span-1">
                        <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
                        <div className="flex flex-col space-y-3">
                            {socials.map(item => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="border-t border-muted/20 pt-6 pb-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-3">
                                Love using Xenkit? Support the project and help us keep it free!
                            </p>
                            <DonationButton />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="border-t border-muted/20 pt-4">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            © {currentYear} Xenkit. All rights reserved. Made with ❤️ by{' '}
                            <a
                                href="https://github.com/xenvoid404"
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                xenvoid404
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50" />
        </footer>
    );
}
