'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { type Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { navigations } from '@/data/navigations';

export function AppSidebarMobile({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const sidebarVariants: Variants = {
        hidden: {
            opacity: 0,
            x: '100%',
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 300
            }
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                damping: 30,
                stiffness: 300,
                mass: 0.5,
                velocity: 2
            }
        },
        exit: {
            opacity: 0,
            x: '100%',
            transition: {
                type: 'spring',
                damping: 40,
                stiffness: 400,
                mass: 0.5,
                velocity: 2
            }
        }
    };

    const menuItemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 0.1 + i * 0.08,
                type: 'spring',
                damping: 15,
                stiffness: 150,
                mass: 0.5
            }
        }),
        exit: (i: number) => ({
            opacity: 0,
            y: 30,
            scale: 0.95,
            transition: {
                delay: i * 0.03,
                duration: 0.2
            }
        }),
        hover: {
            scale: 1.05,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={sidebarVariants}
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden"
                >
                    <div className="flex flex-col h-full">
                        <motion.div
                            className="flex justify-end p-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, type: 'spring' } }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <button
                                onClick={onClose}
                                aria-label="Close Sidebar Menu"
                                className="text-foreground p-2 rounded-full hover:bg-background/30 transition-colors"
                            >
                                <IoClose className="h-6 w-6" />
                            </button>
                        </motion.div>

                        <div className="flex flex-1 flex-col items-center justify-center px-6">
                            <nav className="flex flex-col items-center gap-6 w-full">
                                {navigations.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={menuItemVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="w-full text-center"
                                    >
                                        {item.isExternal ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={onClose}
                                                className="text-2xl font-medium text-foreground py-3 block w-full flex items-center justify-center gap-3"
                                            >
                                                {item.icon && <item.icon className="h-6 w-6" />}
                                                {item.title}
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onClick={() => {
                                                    onClose();
                                                }}
                                                className="text-2xl font-medium text-foreground py-3 block w-full"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
