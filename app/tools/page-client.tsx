'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';

import { ToolCard } from '@/components/ui/tool-card';
import { tools, getAllCategories } from '@/data/tools-data';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';

type ViewMode = 'grid' | 'list';
type SortMode = 'name' | 'category';

export function ToolsPageClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortMode, setSortMode] = useState<SortMode>('name');
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['all', ...getAllCategories()];

    const filteredTools = useMemo(() => {
        let filtered = tools;

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                tool =>
                    tool.name.toLowerCase().includes(searchLower) ||
                    tool.description.toLowerCase().includes(searchLower) ||
                    tool.categories.some(category => category.toLowerCase().includes(searchLower))
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(tool => tool.categories.includes(selectedCategory));
        }

        filtered.sort((a, b) => {
            switch (sortMode) {
                case 'category':
                    return a.categories[0].localeCompare(b.categories[0]);
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [searchTerm, selectedCategory, sortMode]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSortMode('name');
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('tools-search')?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-8 px-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb
                            items={[
                                { href: '/', title: 'Home' },
                                { href: '/tools', title: 'Tools' }
                            ]}
                        />
                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-6 mb-10 animate-fade-in-up">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                                    <span className="text-gradient-primary">All Developer Tools</span>
                                </h1>
                                <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-3xl">
                                    Explore our comprehensive collection of developer tools designed to boost your productivity and streamline your workflow.
                                </p>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="hidden md:flex items-center gap-1 p-1 bg-muted/20 border border-border/50 rounded-lg flex-shrink-0 ml-6">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2.5 rounded-md transition-all duration-300 hover:scale-105 ${
                                        viewMode === 'grid' 
                                            ? 'bg-primary text-white shadow-sm' 
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                    }`}
                                    aria-label="Grid view"
                                >
                                    <FiGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2.5 rounded-md transition-all duration-300 hover:scale-105 ${
                                        viewMode === 'list' 
                                            ? 'bg-primary text-white shadow-sm' 
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                    }`}
                                    aria-label="List view"
                                >
                                    <FiList className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-10 space-y-6 animate-fade-in-up animation-delay-150">
                        {/* Search Box */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1 max-w-2xl">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiSearch className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="tools-search"
                                    type="text"
                                    placeholder="Search tools... (Ctrl + K)"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 hover:border-border/70 transition-all text-lg placeholder:text-muted-foreground/70"
                                    aria-label="Search developer tools"
                                />
                            </div>

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center gap-3 px-6 py-4 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-background/90 hover:border-border/70 hover:scale-105 active:scale-95 transition-all"
                            >
                                <FiFilter className="w-5 h-5" />
                                <span className="font-medium">Filters</span>
                            </button>
                        </div>

                        {/* Filters */}
                        <div className={`${showFilters ? 'block animate-slide-in-up' : 'hidden md:block'} overflow-x-auto`}>
                            <div className="flex flex-col md:flex-row gap-6 min-w-0">
                                {/* Category Filter */}
                                <div className="flex-1 min-w-0">
                                    <label className="block text-sm font-semibold mb-3 text-foreground">Category:</label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category, index) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap hover:scale-105 animate-fade-in-up ${
                                                    selectedCategory === category
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                                        : 'bg-background/70 backdrop-blur-sm text-muted-foreground hover:bg-background/90 hover:text-foreground border border-border/50 hover:border-border/70'
                                                }`}
                                                style={{ animationDelay: `${index * 30}ms` }}
                                            >
                                                {category === 'all' ? 'All Categories' : category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Options */}
                                <div className="md:w-52 flex-shrink-0">
                                    <label className="block text-sm font-semibold mb-3 text-foreground">Sort by:</label>
                                    <select
                                        value={sortMode}
                                        onChange={e => setSortMode(e.target.value as SortMode)}
                                        className="w-full px-4 py-2.5 bg-background/70 backdrop-blur-sm border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 hover:border-border/70 transition-all text-sm font-medium"
                                    >
                                        <option value="name">Name A-Z</option>
                                        <option value="category">Category</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in-up animation-delay-300">
                        <div className="text-sm text-muted-foreground font-medium">
                            Showing <span className="text-foreground font-semibold">{filteredTools.length}</span> of <span className="text-foreground font-semibold">{tools.length}</span> tools
                            {searchTerm && <span className="text-primary"> for &quot;{searchTerm}&quot;</span>}
                            {selectedCategory !== 'all' && <span className="text-primary"> in &quot;{selectedCategory}&quot; category</span>}
                        </div>

                        {(searchTerm || selectedCategory !== 'all') && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-primary hover:text-primary/80 hover:scale-105 transition-all self-start sm:self-auto font-medium"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Tools Grid/List */}
                    {filteredTools.length > 0 ? (
                        <div className={`animate-fade-in-up animation-delay-500 ${
                            viewMode === 'grid' 
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                                : 'space-y-4'
                        }`}>
                            {filteredTools.map((tool, index) => (
                                <div
                                    key={tool.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <ToolCard tool={tool} viewMode={viewMode} className="h-full" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 animate-fade-in-up animation-delay-500">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
                                <FiSearch className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                We couldn&apos;t find any tools matching your search criteria. Try adjusting your filters or search terms.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
