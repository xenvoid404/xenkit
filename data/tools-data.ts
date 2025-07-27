import { type IconType } from 'react-icons';
import { FiLock } from 'react-icons/fi';

export interface Tool {
    id: string;
    name: string;
    description: string;
    categories: string[];
    icon: IconType;
    url: string;
    keywords?: string[];
}

export const tools: Tool[] = [
    {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Generate secure passwords with custom options for enhanced security',
        categories: ['Generators', 'Security', 'Utilities'],
        icon: FiLock,
        url: '/tools/password-generator',
        keywords: ['password', 'secure', 'random', 'generator', 'security', 'strong password', 'auth']
    }
];

// Consistent color scheme for categories
export const categoryColors: { [key: string]: string } = {
    // Security & Privacy
    'Security': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/15',
    'Privacy': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/15',
    'Encryption': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/15',
    
    // Generators
    'Generators': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/15',
    'Random': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/15',
    
    // Text & Content
    'Text': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/15',
    'Content': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/15',
    'Writing': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/15',
    
    // Formatters & Converters
    'Formatters': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/15',
    'Converters': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/15',
    'Transform': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/15',
    
    // Development
    'Development': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/15',
    'Code': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/15',
    'Programming': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/15',
    
    // Web & API
    'Web': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/15',
    'API': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/15',
    'Network': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/15',
    
    // Design & Media
    'Design': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 hover:bg-pink-500/15',
    'Media': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 hover:bg-pink-500/15',
    'Graphics': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 hover:bg-pink-500/15',
    
    // Utilities & Productivity
    'Utilities': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:bg-slate-500/15',
    'Productivity': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:bg-slate-500/15',
    'Tools': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:bg-slate-500/15',
    
    // Data & Analytics
    'Data': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15',
    'Analytics': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15',
    'Statistics': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15',
    
    // Finance & Math
    'Finance': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15',
    'Math': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15',
    'Calculator': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15'
};

// Utility functions
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function getAllCategories(): string[] {
    const categories = new Set<string>();
    tools.forEach(tool => {
        tool.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories).sort();
}

export function getToolsByCategory(category: string): Tool[] {
    return tools.filter(tool => tool.categories.includes(category));
}

export function getToolsByCategories(categories: string[]): Tool[] {
    return tools.filter(tool => categories.some(category => tool.categories.includes(category)));
}

export function getRandomToolsByCategory(category: string, count: number = 6): Tool[] {
    const categoryTools = getToolsByCategory(category);
    const shuffled = shuffleArray(categoryTools);
    return shuffled.slice(0, count);
}

export function getRandomTools(count: number = 6): Tool[] {
    const shuffled = shuffleArray(tools);
    return shuffled.slice(0, count);
}

export function searchTools(query: string): Tool[] {
    const lowerQuery = query.toLowerCase();
    return tools.filter(
        tool =>
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.categories.some(cat => cat.toLowerCase().includes(lowerQuery)) ||
            (tool.keywords && tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)))
    );
}

export function getRelatedTools(toolId: string, count: number = 4): Tool[] {
    const currentTool = tools.find(tool => tool.id === toolId);
    if (!currentTool) return [];

    const relatedTools = tools.filter(tool => 
        tool.id !== toolId && 
        tool.categories.some(category => currentTool.categories.includes(category))
    );

    const shuffled = shuffleArray(relatedTools);
    return shuffled.slice(0, count);
}

// Category metadata for better organization
export const categoryMetadata: { [key: string]: { description: string; icon?: string } } = {
    'Security': { description: 'Tools for security, encryption, and privacy protection' },
    'Generators': { description: 'Generate random data, passwords, and unique identifiers' },
    'Formatters': { description: 'Format and beautify code, JSON, XML, and other data' },
    'Converters': { description: 'Convert between different formats and encodings' },
    'Utilities': { description: 'General-purpose tools for everyday tasks' },
    'Development': { description: 'Tools specifically for developers and programmers' },
    'Text': { description: 'Text processing, manipulation, and analysis tools' },
    'Web': { description: 'Web development and URL-related utilities' },
    'Design': { description: 'Design tools for colors, images, and graphics' },
    'Data': { description: 'Data processing, analysis, and visualization tools' }
};
