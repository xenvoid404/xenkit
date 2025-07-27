import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JsonLd, createWebPageSchema, createSoftwareApplicationSchema, createBreadcrumbListSchema } from '@/components/ui/json-ld';
import { SITE_CONFIG } from '@/lib/constants';
import { PasswordGeneratorClient } from './page-client';

export const metadata: Metadata = {
    title: 'Password Generator - Generate Secure Passwords Online | Xenkit',
    description:
        'Generate strong, secure passwords instantly with our free online password generator. Customize length, characters, and complexity. Perfect for developers and security-conscious users.',
    keywords: [
        'password generator',
        'secure password',
        'strong password generator',
        'random password',
        'password creator',
        'secure password generator',
        'password maker',
        'strong password creator',
        'random password generator',
        'safe password generator',
        'password security',
        'developer tools',
        'security tools',
        'online password generator'
    ],
    openGraph: {
        title: 'Password Generator - Generate Secure Passwords Online | Xenkit',
        description: 'Generate strong, secure passwords instantly with our free online password generator. Customize length, characters, and complexity.',
        type: 'website',
        url: 'https://xenkit.com/tools/password-generator'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Password Generator - Generate Secure Passwords Online',
        description: 'Generate strong, secure passwords instantly with customizable options. Free and secure.'
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
    const pageSchema = createWebPageSchema(
        'https://xenkit.com/tools/password-generator',
        'Password Generator - Generate Secure Passwords Online',
        'Generate strong, secure passwords instantly with our free online password generator. Customize length, characters, and complexity.'
    );

    const softwareSchema = createSoftwareApplicationSchema(
        'Password Generator',
        'A free online tool to generate secure, strong passwords with customizable options including length, character types, and complexity.',
        'https://xenkit.com/tools/password-generator'
    );

    const breadcrumbSchema = createBreadcrumbListSchema([
        { name: 'Home', url: SITE_CONFIG.url },
        { name: 'Tools', url: `${SITE_CONFIG.url}/tools` },
        { name: 'Password Generator', url: `${SITE_CONFIG.url}/tools/password-generator` }
    ]);

    return (
        <>
            <JsonLd data={pageSchema} />
            <JsonLd data={softwareSchema} />
            <JsonLd data={breadcrumbSchema} />
            
            <Suspense
                fallback={
                    <div className="min-h-screen bg-background py-8 px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="animate-pulse">
                                <div className="h-6 bg-muted/20 rounded-lg w-48 mb-4"></div>
                                <div className="h-8 bg-muted/20 rounded-lg w-80 mb-4"></div>
                                <div className="h-4 bg-muted/20 rounded-lg w-96 mb-8"></div>
                                <div className="h-64 bg-muted/20 rounded-lg mb-8"></div>
                            </div>
                        </div>
                    </div>
                }
            >
                <PasswordGeneratorClient />
            </Suspense>
        </>
    );
}
