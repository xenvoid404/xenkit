import Script from 'next/script';
import { SITE_CONFIG } from '@/lib/constants';

interface JsonLdProps {
    data: object;
}

export function JsonLd({ data }: JsonLdProps) {
    return (
        <Script
            id="json-ld"
            type="application/ldjson"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
            strategy="afterInteractive"
        />
    );
}

// Helper functions for common JSON-LD schemas
export const createWebSiteSchema = (url: string, name: string, description: string) => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/tools?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
    }
});

export const createWebPageSchema = (url: string, name: string, description: string) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name,
    description,
    isPartOf: {
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url
    }
});

export const createSoftwareApplicationSchema = (name: string, description: string, url: string) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
    },
    author: {
        '@type': 'Person',
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.author.github
    }
});

export const createBreadcrumbListSchema = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
    }))
});
