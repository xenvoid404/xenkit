'use client';

import { useState } from 'react';
import { FiCoffee, FiHeart } from 'react-icons/fi';

interface DonationButtonProps {
    className?: string;
    variant?: 'default' | 'minimal';
}

export function DonationButton({ className = '', variant = 'default' }: DonationButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleDonationClick = () => {
        // Replace with your actual Buy Me a Coffee URL
        window.open('https://buymeacoffee.com/xenvoid404', '_blank', 'noopener,noreferrer');
    };

    if (variant === 'minimal') {
        return (
            <button
                onClick={handleDonationClick}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Support the project by buying me a coffee"
            >
                <FiCoffee className={`h-4 w-4 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`} />
                <span>Buy me a coffee</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleDonationClick}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40 transition-all duration-300 group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Support the project by buying me a coffee"
        >
            <FiCoffee className={`h-4 w-4 transition-transform duration-200 ${isHovered ? 'scale-110 rotate-12' : ''}`} />
            <span className="font-medium">Buy me a coffee</span>
            <FiHeart className={`h-3 w-3 text-red-500 transition-transform duration-200 ${isHovered ? 'scale-125' : ''}`} />
        </button>
    );
}
