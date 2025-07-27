import { type Metadata } from 'next';
import { PasswordGeneratorClient } from './page-client';

export const metadata: Metadata = {
    title: 'Password Generator - Secure & Random Password Creator',
    description: 'Generate strong, secure passwords with customizable options. Free online tool with uppercase, lowercase, numbers, and special characters. No data stored.',
    keywords: [
        'password generator',
        'secure password',
        'random password',
        'strong password',
        'password creator',
        'password maker',
        'online password generator',
        'free password tool',
        'cybersecurity',
        'password security'
    ],
    openGraph: {
        title: 'Password Generator - Secure & Random Password Creator | Xenkit',
        description: 'Generate strong, secure passwords with customizable options. Free online tool with no data storage.',
        type: 'website',
        url: 'https://xenkit.com/tools/password-generator'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Password Generator - Secure & Random Password Creator | Xenkit',
        description: 'Generate strong, secure passwords with customizable options. Free online tool with no data storage.'
    },
    alternates: {
        canonical: 'https://xenkit.com/tools/password-generator'
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function PasswordGeneratorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Password Generator',
        description: 'Generate strong, secure passwords with customizable options including length, character types, and complexity settings.',
        url: 'https://xenkit.com/tools/password-generator',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        featureList: [
            'Customizable password length',
            'Include/exclude character types',
            'Copy to clipboard',
            'Secure generation',
            'No data storage',
            'Multiple password generation'
        ],
        creator: {
            '@type': 'Organization',
            name: 'Xenkit',
            url: 'https://xenkit.com'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PasswordGeneratorClient />
        </>
    );
}