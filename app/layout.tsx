import type { Metadata, Viewport } from 'next';
import { type ReactNode } from 'react';
import { Figtree } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/contexts/theme-provider';
import AppLayout from '@/layouts/app-layout';
import { SITE_CONFIG, DEFAULT_METADATA, THEME_COLORS } from '@/lib/constants';
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
        { media: '(prefers-color-scheme: light)', color: THEME_COLORS.light },
        { media: '(prefers-color-scheme: dark)', color: THEME_COLORS.dark }
    ]
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: SITE_CONFIG.title,
        template: `%s | ${SITE_CONFIG.name}`
    },
    description: SITE_CONFIG.description,
    keywords: [...DEFAULT_METADATA.keywords],
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.github }],
    creator: SITE_CONFIG.author.name,
    publisher: SITE_CONFIG.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    robots: DEFAULT_METADATA.robots,
    manifest: '/site.webmanifest',
    alternates: {
        canonical: SITE_CONFIG.url
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: SITE_CONFIG.title,
        description: 'Your ultimate toolkit with all the essential utilities for development, security and productivity in one place.',
        images: [
            {
                url: SITE_CONFIG.ogImage,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.title
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.title,
        description: 'Your ultimate toolkit with all the essential utilities for development, security and productivity in one place.',
        images: [SITE_CONFIG.ogImage],
        creator: SITE_CONFIG.author.twitter
    },
    category: 'Technology',
    classification: 'Developer Tools',
    other: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': SITE_CONFIG.name,
        'google-site-verification': 'your-google-verification-code-here'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
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
