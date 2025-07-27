import type { Metadata } from 'next';
import { UuidGeneratorClient } from './page-client';

export const metadata: Metadata = {
    title: 'UUID Generator - XenKit',
    description: 'Generate various types of UUIDs (v1, v4, v5) and custom identifiers. Perfect for unique ID generation in applications.',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'random', 'v1', 'v4', 'v5', 'nanoid', 'online tool'],
    openGraph: {
        title: 'UUID Generator - XenKit',
        description: 'Generate various types of UUIDs (v1, v4, v5) and custom identifiers',
        type: 'website'
    }
};

export default function UuidGeneratorPage() {
    return <UuidGeneratorClient />;
}