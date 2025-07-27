'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdMenu } from 'react-icons/md';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { navigation } from '@/data/navigation';

export function AppHeader({ sidebarOpen }: { sidebarOpen: () => void }) {
    const pathname = usePathname();

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-40 w-full h-16 flex items-center justify-center border-b border-foreground/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        >
            <div className="flex w-full items-center justify-between px-4 py-2 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group" aria-label="Xenkit - Go to homepage">
                    <h1 className="text-2xl md:text-3xl font-bold text-gradient-neon group-hover:scale-105 transition-transform duration-300">
                        Xenkit
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
                    {navigation.map(item =>
                        item.isExternal ? (
                            <a
                                key={item.title}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
                                    pathname === item.href ? 'text-primary' : 'text-foreground/80'
                                }`}
                            >
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.title}
                            </a>
                        ) : (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`flex items-center gap-2 relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
                                    pathname === item.href ? 'text-primary' : 'text-foreground/80'
                                }`}
                            >
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.title}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                                        initial={false}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 30
                                        }}
                                    />
                                )}
                            </Link>
                        )
                    )}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    <ThemeToggle />

                    {/* Mobile menu button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Open mobile menu"
                        onClick={sidebarOpen}
                        className="md:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors duration-300"
                    >
                        <MdMenu className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
}
