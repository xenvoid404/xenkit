'use client';

import Link from 'next/link';
import { type CSSProperties } from 'react';
import { motion, type Variants } from 'framer-motion';
import { type Tool, categoryColors } from '@/data/tools-data';
import { LuExternalLink } from 'react-icons/lu';

interface ToolCardProps {
    tool: Tool;
    className?: string;
    style?: CSSProperties;
    viewMode?: 'grid' | 'list';
}

// Shared components for both views
const ToolIcon = ({ tool, size = 'md' }: { tool: Tool; size?: 'sm' | 'md' | 'lg' }) => {
    const IconComponent = tool.icon;
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-14 h-14',
        lg: 'w-16 h-16'
    };
    const iconSizes = {
        sm: 'w-6 h-6',
        md: 'w-7 h-7',
        lg: 'w-8 h-8'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`flex items-center justify-center ${sizeClasses[size]} rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 flex-shrink-0`}
        >
            <IconComponent className={`${iconSizes[size]} text-primary transition-colors duration-300`} />
        </motion.div>
    );
};

const ToolCategories = ({ categories, maxDisplay }: { categories: string[]; maxDisplay: number }) => (
    <div className="flex flex-wrap gap-2">
        {categories.slice(0, maxDisplay).map(category => (
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
        {categories.length > maxDisplay && (
            <span
                className="text-xs px-2 py-1 rounded-full bg-muted/20 text-muted-foreground border border-muted/30"
                title={`${categories.length - maxDisplay} more categories`}
            >
                {categories.length - maxDisplay}
            </span>
        )}
    </div>
);

const ToolButton = ({ tool, fullWidth = false }: { tool: Tool; fullWidth?: boolean }) => (
    <Link href={tool.url} className={fullWidth ? 'block' : ''}>
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group/btn relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:from-primary/20 hover:to-secondary/20 hover:border-primary/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background ${
                fullWidth ? 'w-full' : 'px-6'
            }`}
            aria-label={`Open ${tool.name} tool`}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Open Tool</span>
                <LuExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </motion.button>
    </Link>
);

const BackgroundEffects = () => (
    <>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-sm" />
        </div>
    </>
);

export function ToolCard({ tool, className = '', style, viewMode = 'grid' }: ToolCardProps) {
    const baseClasses =
        'group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-muted/20 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 will-change-transform';

    const variants: Variants = {
        initial: {
            opacity: 0,
            [viewMode === 'list' ? 'x' : 'y']: viewMode === 'list' ? -20 : 20
        },
        animate: {
            opacity: 1,
            [viewMode === 'list' ? 'x' : 'y']: 0
        }
    };

    const transition = { duration: 0.5 };

    const hoverProps =
        viewMode === 'list'
            ? { whileHover: { x: 5, scale: 1.01 }, whileTap: { scale: 0.99 } }
            : { whileHover: { y: -5, scale: 1.02 }, whileTap: { scale: 0.98 } };

    if (viewMode === 'list') {
        return (
            <motion.article
                variants={variants}
                initial="initial"
                animate="animate"
                transition={transition}
                {...hoverProps}
                className={`${baseClasses} p-6 ${className}`}
                style={style}
            >
                <BackgroundEffects />
                <div className="relative z-10 flex items-center gap-6">
                    <ToolIcon tool={tool} size="lg" />
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300 mb-2">
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{tool.description}</p>
                                <ToolCategories categories={tool.categories} maxDisplay={4} />
                            </div>
                            <ToolButton tool={tool} />
                        </div>
                    </div>
                </div>
            </motion.article>
        );
    }

    return (
        <motion.article
            variants={variants}
            initial="initial"
            animate="animate"
            transition={transition}
            {...hoverProps}
            className={`${baseClasses} p-6 hover:shadow-xl ${className}`}
            style={style}
        >
            <BackgroundEffects />
            <div className="relative z-10 space-y-4">
                <header className="flex items-start justify-between">
                    <ToolIcon tool={tool} />
                </header>
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{tool.description}</p>
                </div>
                <ToolCategories categories={tool.categories} maxDisplay={3} />
                <div className="mt-6">
                    <ToolButton tool={tool} fullWidth />
                </div>
            </div>
        </motion.article>
    );
}
