'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolCard } from '@/components/ui/tool-card';
import { tools, getAllCategories } from '@/data/tools-data';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';

type ViewMode = 'grid' | 'list';
type SortMode = 'name' | 'category';

// Memoized components for better performance
const SearchInput = ({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) => (
    <div className="relative flex-1 max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
            id="tools-search"
            type="text"
            placeholder="Search tools... (Ctrl  K)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-background border-2 border-muted/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-lg"
            aria-label="Search developer tools"
        />
    </div>
);

const ViewModeToggle = ({ viewMode, setViewMode }: { viewMode: ViewMode; setViewMode: (mode: ViewMode) => void }) => (
    <div className="hidden md:flex items-center gap-2 p-1 bg-muted/10 rounded-lg flex-shrink-0 ml-4">
        {[
            { mode: 'grid' as const, icon: FiGrid, label: 'Grid view' },
            { mode: 'list' as const, icon: FiList, label: 'List view' }
        ].map(({ mode, icon: Icon, label }) => (
            <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded-md transition-colors ${
                    viewMode === mode ? 'bg-primary text-background' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={label}
            >
                <Icon className="w-4 h-4" />
            </button>
        ))}
    </div>
);

const CategoryFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory
}: {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}) => (
    <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium mb-2">Category:</label>
        <div className="flex flex-wrap gap-2">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedCategory === category
                            ? 'bg-primary text-background shadow-lg shadow-primary/25'
                            : 'bg-muted/10 text-muted-foreground hover:bg-muted/20 hover:text-foreground border border-muted/30'
                    }`}
                >
                    {category === 'all' ? 'All Categories' : category}
                </button>
            ))}
        </div>
    </div>
);

const EmptyState = ({ onClearFilters }: { onClearFilters: () => void }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/10 flex items-center justify-center">
            <FiSearch className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No tools found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">Try adjusting your search criteria or explore all available tools.</p>
        <button
            onClick={onClearFilters}
            className="px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
            Clear Filters
        </button>
    </motion.div>
);

export function ToolsPageClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortMode, setSortMode] = useState<SortMode>('name');
    const [showFilters, setShowFilters] = useState(false);

    const categories = useMemo(() => ['all', ...getAllCategories()], []);

    const filteredTools = useMemo(() => {
        let filtered = tools;

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                tool =>
                    tool.name.toLowerCase().includes(searchLower) ||
                    tool.description.toLowerCase().includes(searchLower) ||
                    tool.categories.some(category => category.toLowerCase().includes(searchLower))
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(tool => tool.categories.includes(selectedCategory));
        }

        // Sort
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

    // Keyboard shortcuts
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

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Tools', href: '/tools' }
    ];

    const hasFilters = searchTerm || selectedCategory !== 'all';

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-7xl mx-auto w-full">
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <motion.div
                    className="flex flex-col gap-4 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                <span className="text-gradient-glow">All Developer Tools</span>
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Explore our comprehensive collection of developer tools to boost your productivity
                            </p>
                        </div>
                        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    className="mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-4 bg-muted/10 border border-muted/30 rounded-xl hover:bg-muted/20 transition-colors"
                        >
                            <FiFilter className="w-5 h-5" />
                            <span>Filter</span>
                        </button>
                    </div>

                    <div className={`${showFilters ? 'block' : 'hidden md:block'} overflow-x-auto`}>
                        <div className="flex flex-col md:flex-row gap-4 min-w-0">
                            <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            <div className="md:w-48 flex-shrink-0">
                                <label className="block text-sm font-medium mb-2">Sort by:</label>
                                <select
                                    value={sortMode}
                                    onChange={e => setSortMode(e.target.value as SortMode)}
                                    className="w-full px-3 py-2 bg-background border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                >
                                    <option value="name">Name A-Z</option>
                                    <option value="category">Category</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Summary */}
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="text-sm text-muted-foreground">
                        Showing {filteredTools.length} of {tools.length} tools
                        {searchTerm && ` for "${searchTerm}"`}
                        {selectedCategory !== 'all' && ` in "${selectedCategory}" category`}
                    </div>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-primary hover:text-primary/80 transition-colors self-start sm:self-auto"
                        >
                            Clear Filters
                        </button>
                    )}
                </motion.div>

                {/* Tools Grid/List */}
                <AnimatePresence mode="wait">
                    {filteredTools.length > 0 ? (
                        <motion.div
                            key={`${viewMode}-${selectedCategory}-${sortMode}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}
                        >
                            {filteredTools.map(tool => (
                                <ToolCard key={tool.id} tool={tool} viewMode={viewMode} className="h-full" />
                            ))}
                        </motion.div>
                    ) : (
                        <EmptyState onClearFilters={clearFilters} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
