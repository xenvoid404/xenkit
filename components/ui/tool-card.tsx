'use client';

import Link from 'next/link';
import { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { type Tool, categoryColors } from '@/data/tools-data';
import { LuExternalLink } from 'react-icons/lu';

interface ToolCardProps {
    tool: Tool;
    className?: string;
    style?: CSSProperties;
    viewMode?: 'grid' | 'list';
}

export function ToolCard({ tool, className = '', style, viewMode = 'grid' }: ToolCardProps) {
    const IconComponent = tool.icon;

    if (viewMode === 'list') {
        return (
            <motion.article
                whileHover={{ x: 5, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-muted/20 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 will-change-transform ${className}`}
                style={style}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-6">
                    {/* Icon */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 flex-shrink-0"
                    >
                        <IconComponent className="w-8 h-8 text-primary transition-colors duration-300" />
                    </motion.div>

                    {/* Main content */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                                        {tool.name}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{tool.description}</p>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {tool.categories.slice(0, 4).map(category => (
                                        <motion.span
                                            key={category}
                                            whileHover={{ scale: 1.05 }}
                                            className={`text-xs px-2 py-1 rounded-full border transition-all duration-300 cursor-default ${
                                                categoryColors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                            }`}
                                            title={`Category: ${category}`}
                                        >
                                            {category}
                                        </motion.span>
                                    ))}
                                    {tool.categories.length > 4 && (
                                        <span
                                            className="text-xs px-2 py-1 rounded-full bg-muted/20 text-muted-foreground border border-muted/30"
                                            title={`${tool.categories.length - 4} more categories`}
                                        >
                                            {tool.categories.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Action button */}
                            <Link href={tool.url}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group/btn relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 hover:from-primary/20 hover:to-secondary/20 hover:border-primary/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background flex-shrink-0"
                                    aria-label={`Open ${tool.name} tool`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <span>Open Tool</span>
                                        <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                    </span>

                                    {/* Button hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Subtle border animation on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-sm" />
                </div>
            </motion.article>
        );
    }

    // Grid view (default)
    return (
        <motion.article
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-muted/20 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 will-change-transform ${className}`}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 space-y-4">
                {/* Header with icon */}
                <header className="flex items-start justify-between">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300"
                    >
                        <IconComponent className="w-7 h-7 text-primary transition-colors duration-300" />
                    </motion.div>
                </header>

                {/* Title and description */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {tool.name}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{tool.description}</p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {tool.categories.slice(0, 3).map(category => (
                        <motion.span
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            className={`text-xs px-2 py-1 rounded-full border transition-all duration-300 cursor-default ${
                                categoryColors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            }`}
                            title={`Category: ${category}`}
                        >
                            {category}
                        </motion.span>
                    ))}
                    {tool.categories.length > 3 && (
                        <span
                            className="text-xs px-2 py-1 rounded-full bg-muted/20 text-muted-foreground border border-muted/30"
                            title={`${tool.categories.length - 3} more categories`}
                        >
                            {tool.categories.length - 3}
                        </span>
                    )}
                </div>

                {/* Action button */}
                <Link href={tool.url} className="block mt-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:from-primary/20 hover:to-secondary/20 hover:border-primary/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={`Open ${tool.name} tool`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>Open Tool</span>
                            <LuExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </span>

                        {/* Button hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                </Link>
            </div>

            {/* Subtle border animation on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-sm" />
            </div>
        </motion.article>
    );
}
