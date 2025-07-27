import type { Metadata } from 'next';
import { RsaKeyGeneratorClient } from './page-client';

export const metadata: Metadata = {
    title: 'RSA Key Generator - XenKit',
    description: 'Generate RSA public/private key pairs with customizable key sizes. Perfect for encryption, digital signatures, and security applications.',
    keywords: ['rsa', 'public key', 'private key', 'encryption', 'cryptography', 'pem', 'key pair', 'online tool'],
    openGraph: {
        title: 'RSA Key Generator - XenKit',
        description: 'Generate RSA public/private key pairs with customizable key sizes',
        type: 'website'
    }
};

export default function RsaKeyGeneratorPage() {
    return <RsaKeyGeneratorClient />;
}