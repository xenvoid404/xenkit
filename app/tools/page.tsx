import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ToolsPageClient } from '@/app/tools/page-client';
import { JsonLd, createWebPageSchema } from '@/components/ui/json-ld';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Developer Tools Collection - Free Online Utilities for Coders | Xenkit',
    description:
        'Discover a powerful collection of free developer tools including encoders, decoders, generators, formatters, and more. Built for speed, simplicity, and productivity.',
    keywords: [
        'developer tools',
        'free coding tools',
        'online developer utilities',
        'web development tools',
        'code formatter',
        'json encoder decoder',
        'programming tools online',
        'javascript utilities',
        'developer toolkit',
        'xenkit developer tools'
    ],
    openGraph: {
        title: 'Developer Tools Collection - Free Online Utilities for Coders | Xenkit',
        description:
            'A complete toolkit of developer utilities including encoders, decoders, formatters, and generators. Fast, easy, and free to use.',
        type: 'website',
        url: 'https://xenkit.com/tools'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Developer Tools Collection - Free Online Utilities for Coders',
        description:
            'Explore a complete set of online developer tools including encoders, decoders, formatters, and generators. Simple, fast, and free.'
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
    const pageSchema = createWebPageSchema(
        `${SITE_CONFIG.url}/tools`,
        'Developer Tools Collection - Free Online Utilities for Coders',
        'Discover a powerful collection of free developer tools including encoders, decoders, generators, formatters, and more. Built for speed, simplicity, and productivity.'
    );

    return (
        <>
            <JsonLd data={pageSchema} />
            <Suspense
                fallback={
                    <div className="min-h-screen bg-background py-8 px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="animate-pulse">
                                <div className="h-8 bg-muted/20 rounded-lg w-64 mb-4"></div>
                                <div className="h-4 bg-muted/20 rounded-lg w-96 mb-8"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="h-40 bg-muted/20 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                <ToolsPageClient />
            </Suspense>
        </>
    );
}
