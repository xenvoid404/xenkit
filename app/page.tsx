import { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { FeaturedTools } from '@/components/sections/featured-tools';
import { JsonLd, createWebSiteSchema } from '@/components/ui/json-ld';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Xenkit - Free Developer Tools & Utilities for Modern Development',
    description:
        'Boost your productivity with 25 free online developer tools. Password generators, UUID generators, Base64 encoders, JSON formatters, regex testers and more. No signup required.',
    keywords: [
        'free developer tools',
        'online development utilities',
        'password generator',
        'uuid generator',
        'base64 encoder decoder',
        'json formatter',
        'url encoder',
        'regex tester',
        'color picker',
        'hash generator',
        'developer productivity tools',
        'coding utilities',
        'web development tools',
        'free online tools'
    ],
    openGraph: {
        title: 'Xenkit - Free Developer Tools & Utilities for Modern Development',
        description: 'Boost your productivity with 25 free online developer tools. No signup required.',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Xenkit Developer Tools Homepage'
            }
        ]
    }
};

export default function Home() {
    const websiteSchema = createWebSiteSchema(SITE_CONFIG.url, SITE_CONFIG.title, SITE_CONFIG.description);

    return (
        <>
            <JsonLd data={websiteSchema} />

            {/* Skip Navigation Link for Accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
            >
                Skip to main content
            </a>

            {/* Main content */}
            <main id="main-content" className="flex flex-col">
                {/* Hero Section */}
                <Hero />

                {/* Featured Tools */}
                <FeaturedTools />
            </main>
        </>
    );
}
