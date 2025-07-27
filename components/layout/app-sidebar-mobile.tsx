'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

import { navigations } from '@/data/navigations';

export function AppSidebarMobile({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 400); // Match animation duration
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden ${
            isClosing ? 'animate-fade-out' : 'animate-fade-in'
        }`}>
            <div className={`flex flex-col h-full ${
                isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'
            }`}>
                <div className="flex justify-end p-6 animate-fade-in-up animation-delay-150">
                    <button
                        onClick={handleClose}
                        aria-label="Close Sidebar Menu"
                        className="text-foreground p-2 rounded-full hover:bg-background/30 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-6">
                    <nav className="flex flex-col items-center gap-6 w-full">
                        {navigations.map((item, index) => (
                            <div
                                key={item.href}
                                className="w-full text-center animate-fade-in-up"
                                style={{ animationDelay: `${300 + (index * 100)}ms` }}
                            >
                                {item.isExternal ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleClose}
                                        className="text-2xl font-medium text-foreground py-3 block w-full flex items-center justify-center gap-3 hover:scale-105 hover:text-primary active:scale-95 transition-all duration-300"
                                    >
                                        {item.icon && <item.icon className="h-6 w-6" />}
                                        {item.title}
                                    </a>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={handleClose}
                                        className="text-2xl font-medium text-foreground py-3 block w-full hover:scale-105 hover:text-primary active:scale-95 transition-all duration-300"
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
