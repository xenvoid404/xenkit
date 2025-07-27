import type { Metadata } from 'next';
import { JwtBuilderDecoderClient } from './page-client';

export const metadata: Metadata = {
    title: 'JWT Builder & Decoder - XenKit',
    description: 'Create, decode, and verify JSON Web Tokens (JWT) with various algorithms. Perfect for API development and authentication testing.',
    keywords: ['jwt', 'json web token', 'auth', 'authentication', 'decode', 'verify', 'bearer', 'online tool'],
    openGraph: {
        title: 'JWT Builder & Decoder - XenKit',
        description: 'Create, decode, and verify JSON Web Tokens (JWT) with various algorithms',
        type: 'website'
    }
};

export default function JwtBuilderDecoderPage() {
    return <JwtBuilderDecoderClient />;
}