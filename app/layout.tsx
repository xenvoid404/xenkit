import type { Metadata, Viewport } from 'next';
import { type ReactNode } from 'react';
import { Figtree } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/contexts/theme-provider';
import AppLayout from '@/layouts/app-layout';
import './globals.css';

const figtree = Figtree({
    variable: '--font-figtree',
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
        { media: '(prefers-color-scheme: dark)', color: '#a855f7' }
    ]
};

export const metadata: Metadata = {
    metadataBase: new URL('https://xenkit.com'),
    title: {
        default: 'Xenkit - Developer Tools for the Web',
        template: '%s | Xenkit'
    },
    description:
        'Xenkit is a modern toolkit for developers offering a wide range of utilities such as encoders, decoders, generators, and formatters — all in one place to enhance your productivity.',
    keywords: [
        'developer tools',
        'online dev tools',
        'code formatter',
        'base64 decoder',
        'uuid generator',
        'text utilities',
        'developer productivity',
        'online tools for developers',
        'web tools',
        'Xenkit',
        'password generator',
        'json formatter',
        'url encoder',
        'regex tester',
        'color picker',
        'hash generator',
        'free online tools',
        'developer utilities',
        'coding tools'
    ],
    authors: [{ name: 'Xenvoid', url: 'https://github.com/xenvoid404' }],
    creator: 'Xenvoid',
    publisher: 'Xenkit',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
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
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: 'https://xenkit.com'
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://xenkit.com',
        siteName: 'Xenkit',
        title: 'Xenkit - Developer Tools for the Web',
        description: 'Your ultimate toolkit with all the essential utilities for development, security and productivity in one place.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Xenkit - Developer Tools for the Web'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Xenkit - Developer Tools for the Web',
        description: 'Your ultimate toolkit with all the essential utilities for development, security and productivity in one place.',
        images: ['/og-image.png'],
        creator: '@xenvoid404'
    },
    category: 'Technology',
    classification: 'Developer Tools',
    other: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Xenkit',
        'google-site-verification': 'your-google-verification-code-here'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    // JSON-LD structured data for the website
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Xenkit',
        description: 'Modern toolkit for developers with essential utilities for development, security and productivity.',
        url: 'https://xenkit.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://xenkit.com/tools?search={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Xenkit',
            url: 'https://xenkit.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://xenkit.com/logo.png'
            },
            sameAs: [
                'https://github.com/xenvoid404'
            ]
        },
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
                    applicationCategory: 'SecurityApplication'
                }
            ]
        }
    };

    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svgxml" />
                <link rel="apple-touch-icon" href="/favicon-180.png" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="google-site-verification" content="your-google-verification-code-here" />
                
                {/* JSON-LD structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${figtree.variable} font-figtree antialiased bg-background text-foreground`}>
                {/* Google Analytics */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX');
                    `}
                </Script>

                <ThemeProvider>
                    <AppLayout>{children}</AppLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
