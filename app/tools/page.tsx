import { type Metadata } from 'next';
import { ToolsPageClient } from './page-client';

export const metadata: Metadata = {
    title: 'All Developer Tools - Complete Collection of Web Utilities',
    description: 'Browse our complete collection of developer tools including password generators, formatters, encoders, decoders, and more. Free online utilities for developers.',
    keywords: [
        'developer tools collection',
        'all developer tools',
        'web tools directory',
        'online developer utilities',
        'coding tools',
        'programming utilities',
        'free developer tools',
        'web development tools',
        'developer toolkit',
        'online tools'
    ],
    openGraph: {
        title: 'All Developer Tools - Complete Collection | Xenkit',
        description: 'Browse our complete collection of developer tools. Free online utilities for developers.',
        type: 'website',
        url: 'https://xenkit.com/tools'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'All Developer Tools - Complete Collection | Xenkit',
        description: 'Browse our complete collection of developer tools. Free online utilities for developers.'
    },
    alternates: {
        canonical: 'https://xenkit.com/tools'
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function ToolsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Developer Tools Collection',
        description: 'Complete collection of free online developer tools and utilities',
        url: 'https://xenkit.com/tools',
        mainEntity: {
            '@type': 'ItemList',
            name: 'Developer Tools',
            description: 'Collection of essential developer tools and utilities',
            numberOfItems: 25,
            itemListElement: [
                {
                    '@type': 'SoftwareApplication',
                    name: 'Password Generator',
                    description: 'Generate secure, random passwords with customizable options',
                    url: 'https://xenkit.com/tools/password-generator',
                    applicationCategory: 'SecurityApplication',
                    operatingSystem: 'Web Browser'
                }
            ]
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://xenkit.com'
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Tools',
                    item: 'https://xenkit.com/tools'
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ToolsPageClient />
        </>
    );
}
