import { type IconType } from 'react-icons';
import { FiLock, FiKey, FiShield, FiCode, FiFileText, FiHash, FiLink, FiMail, FiImage, FiClock, FiDatabase, FiGlobe } from 'react-icons/fi';

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
        description: 'Generate secure passwords with custom options',
        categories: ['Generators', 'Security', 'Utilities'],
        icon: FiLock,
        url: '/tools/password-generator',
        keywords: ['password', 'secure', 'random', 'generator', 'security', 'strong password']
    },
    {
        id: 'uuid-generator',
        name: 'UUID Generator',
        description: 'Generate unique identifiers (UUIDs) for your applications',
        categories: ['Generators', 'Utilities'],
        icon: FiKey,
        url: '/tools/uuid-generator',
        keywords: ['uuid', 'guid', 'unique', 'identifier', 'generator', 'random']
    },
    {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate MD5, SHA-1, SHA-256, and other hash values',
        categories: ['Generators', 'Security', 'Utilities'],
        icon: FiHash,
        url: '/tools/hash-generator',
        keywords: ['hash', 'md5', 'sha1', 'sha256', 'checksum', 'digest']
    },
    {
        id: 'base64-encoder',
        name: 'Base64 Encoder/Decoder',
        description: 'Encode and decode Base64 strings easily',
        categories: ['Encoders', 'Utilities'],
        icon: FiCode,
        url: '/tools/base64-encoder',
        keywords: ['base64', 'encode', 'decode', 'string', 'conversion']
    },
    {
        id: 'url-encoder',
        name: 'URL Encoder/Decoder',
        description: 'Encode and decode URLs for web development',
        categories: ['Encoders', 'Web Development'],
        icon: FiLink,
        url: '/tools/url-encoder',
        keywords: ['url', 'encode', 'decode', 'percent', 'encoding', 'web']
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Format, validate, and minify JSON data',
        categories: ['Formatters', 'Development'],
        icon: FiFileText,
        url: '/tools/json-formatter',
        keywords: ['json', 'format', 'validate', 'minify', 'pretty', 'parse']
    }
];

export const categoryColors: { [key: string]: string } = {
    Generators: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
    Security: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20',
    Utilities: 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:bg-pink-500/20',
    Encoders: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
    Formatters: 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20',
    Development: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20',
    'Web Development': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
};

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

    const relatedTools = tools.filter(tool => tool.id !== toolId && tool.categories.some(category => currentTool.categories.includes(category)));

    const shuffled = shuffleArray(relatedTools);
    return shuffled.slice(0, count);
}
