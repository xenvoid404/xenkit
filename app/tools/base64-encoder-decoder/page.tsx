import type { Metadata } from 'next';
import { Base64EncoderDecoderClient } from './page-client';

export const metadata: Metadata = {
    title: 'Base64 Encoder & Decoder - XenKit',
    description: 'Encode and decode text to/from Base64 format with real-time conversion. Fast, secure, and works entirely in your browser.',
    keywords: ['base64', 'encode', 'decode', 'encoding', 'conversion', 'text', 'binary', 'online tool'],
    openGraph: {
        title: 'Base64 Encoder & Decoder - XenKit',
        description: 'Encode and decode text to/from Base64 format with real-time conversion',
        type: 'website'
    }
};

export default function Base64EncoderDecoderPage() {
    return <Base64EncoderDecoderClient />;
}