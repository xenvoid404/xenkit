'use client';

import Link from 'next/link';
import { ToolCard } from '@/components/ui/tool-card';
import { tools, categoryColors, getAllCategories } from '@/data/tools-data';
import { FaArrowRight } from 'react-icons/fa';

export function FeaturedTools() {
    const categories = getAllCategories();

    return (
        <section id="featured-tools" className="py-20 px-4 bg-gradient-to-br from-background via-muted/5 to-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gradient-glow">Featured Tools</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Discover our most popular developer tools organized by category. From generators to formatters, we&apos;ve got everything you
                        need.
                    </p>
                </div>

                {/* Categories */}
                <div className="grid gap-16">
                    {categories.slice(0, 3).map((category, categoryIndex) => {
                        const categoryTools = tools.filter(tool => tool.categories.includes(category)).slice(0, 4);

                        return (
                            <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                                {/* Category Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl md:text-3xl font-bold">{category}</h3>
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
                                                categoryColors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                            }`}
                                        >
                                            {categoryTools.length} tools
                                        </span>
                                    </div>
                                    <Link
                                        href={`/tools?category=${encodeURIComponent(category)}`}
                                        className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                                    >
                                        <span>View all</span>
                                        <FaArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>

                                {/* Tools Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {categoryTools.map((tool, toolIndex) => (
                                        <div
                                            key={tool.id}
                                            className="animate-fade-in-up"
                                            style={{ animationDelay: `${(categoryIndex * 200) + (toolIndex * 100)}ms` }}
                                        >
                                            <ToolCard tool={tool} className="h-full" />
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile View All Link */}
                                <div className="sm:hidden mt-6 text-center">
                                    <Link
                                        href={`/tools?category=${encodeURIComponent(category)}`}
                                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                                    >
                                        <span>View all {category} tools</span>
                                        <FaArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Tools CTA */}
                <div className="text-center mt-16 animate-fade-in-up animation-delay-1000">
                    <Link href="/tools">
                        <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10">View All Tools</span>
                            <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
