export const SITE_CONFIG = {
    name: 'Xenkit',
    title: 'Xenkit - Developer Tools for the Web',
    description:
        'Xenkit is a modern toolkit for developers offering a wide range of utilities such as encoders, decoders, generators, and formatters — all in one place to enhance your productivity.',
    url: 'https://xenkit.com',
    ogImage: '/og-image.png',
    author: {
        name: 'Xenvoid',
        github: 'https://github.com/xenvoid404',
        twitter: '@xenvoid404'
    }
} as const;

// Animation Constants
export const ANIMATION_DURATION = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
} as const;

// Common Keywords
export const COMMON_KEYWORDS = [
    'developer tools',
    'online dev tools',
    'free online tools',
    'developer utilities',
    'coding tools',
    'web tools',
    'developer productivity',
    'Xenkit'
] as const;

// Default Metadata
export const DEFAULT_METADATA = {
    keywords: [
        ...COMMON_KEYWORDS,
        'code formatter',
        'base64 decoder',
        'uuid generator',
        'text utilities',
        'password generator',
        'json formatter',
        'url encoder',
        'regex tester',
        'color picker',
        'hash generator'
    ],
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    }
} as const;

// Theme Colors
export const THEME_COLORS = {
    light: '#8b5cf6',
    dark: '#a855f7'
} as const;
