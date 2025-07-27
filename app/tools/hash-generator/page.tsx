import type { Metadata } from 'next';
import { HashGeneratorClient } from './page-client';

export const metadata: Metadata = {
    title: 'Hash Generator - XenKit',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-512 and other hash values from text. Fast, secure cryptographic hashing tool.',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'checksum', 'digest', 'crypto', 'online tool'],
    openGraph: {
        title: 'Hash Generator - XenKit',
        description: 'Generate MD5, SHA-1, SHA-256, SHA-512 and other hash values from text',
        type: 'website'
    }
};

export default function HashGeneratorPage() {
    return <HashGeneratorClient />;
}