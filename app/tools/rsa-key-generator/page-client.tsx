'use client';

import { useState, useCallback, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ToolCard } from '@/components/ui/tool-card';
import { getRandomTools, type Tool } from '@/data/tools-data';
import { FiCopy, FiShield, FiCheck, FiKey, FiLock, FiUnlock, FiZap, FiSettings, FiDownload } from 'react-icons/fi';
import forge from 'node-forge';

interface KeyPair {
    publicKey: string;
    privateKey: string;
    keySize: number;
    format: string;
}

export function RsaKeyGeneratorClient() {
    const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [keySize, setKeySize] = useState(2048);
    const [format, setFormat] = useState('PEM');
    const [copiedPublic, setCopiedPublic] = useState(false);
    const [copiedPrivate, setCopiedPrivate] = useState(false);
    const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const keySizes = [1024, 2048, 3072, 4096];
    const formats = ['PEM', 'PKCS#8'];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const tools = getRandomTools(isMobile ? 3 : 6);
        setRelatedTools(tools.filter(tool => tool.id !== 'rsa-key-generator'));
    }, [isMobile]);

    const generateKeyPair = useCallback(async () => {
        setIsGenerating(true);
        
        try {
            // Use setTimeout to allow UI to update
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const keyPair = forge.pki.rsa.generateKeyPair(keySize);
            
            let publicKeyPem: string;
            let privateKeyPem: string;
            
            if (format === 'PEM') {
                publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
                privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
            } else { // PKCS#8
                publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
                // Convert private key to PKCS#8 format
                const privateKeyInfo = forge.pki.wrapRsaPrivateKey(forge.pki.privateKeyToAsn1(keyPair.privateKey));
                privateKeyPem = forge.pki.privateKeyInfoToPem(privateKeyInfo);
            }
            
            setKeyPair({
                publicKey: publicKeyPem,
                privateKey: privateKeyPem,
                keySize: keySize,
                format: format
            });
        } catch (error) {
            console.error('Error generating RSA key pair:', error);
            setKeyPair({
                publicKey: 'Error generating public key',
                privateKey: 'Error generating private key',
                keySize: keySize,
                format: format
            });
        } finally {
            setIsGenerating(false);
        }
    }, [keySize, format]);

    const copyToClipboard = async (text: string, type: 'public' | 'private') => {
        if (!text || text.startsWith('Error')) return;

        try {
            await navigator.clipboard.writeText(text);
            if (type === 'public') {
                setCopiedPublic(true);
                setTimeout(() => setCopiedPublic(false), 2000);
            } else {
                setCopiedPrivate(true);
                setTimeout(() => setCopiedPrivate(false), 2000);
            }
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const downloadKey = (content: string, filename: string) => {
        if (!content || content.startsWith('Error')) return;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getEstimatedTime = (size: number) => {
        switch (size) {
            case 1024: return 'Very fast (~1s)';
            case 2048: return 'Fast (~2-3s)';
            case 3072: return 'Medium (~5-10s)';
            case 4096: return 'Slow (~10-20s)';
            default: return 'Unknown';
        }
    };

    const getSecurityLevel = (size: number) => {
        switch (size) {
            case 1024: return { level: 'Weak', color: 'text-orange-500', description: 'Not recommended for new applications' };
            case 2048: return { level: 'Good', color: 'text-green-500', description: 'Recommended minimum for most applications' };
            case 3072: return { level: 'Strong', color: 'text-blue-500', description: 'High security level' };
            case 4096: return { level: 'Very Strong', color: 'text-purple-500', description: 'Maximum security level' };
            default: return { level: 'Unknown', color: 'text-gray-500', description: '' };
        }
    };

    const security = getSecurityLevel(keySize);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-8 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Breadcrumb
                        items={[
                            { href: '/', title: 'Home' },
                            { href: '/tools', title: 'Tools' },
                            { href: '/tools/rsa-key-generator', title: 'RSA Key Generator' }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                            <FiShield className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="text-gradient-primary">RSA Key Generator</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        Generate RSA public/private key pairs with customizable key sizes. Perfect for encryption, digital signatures, 
                        SSL certificates, and secure communications. All keys are generated locally in your browser.
                    </p>
                </div>

                {/* Configuration Panel */}
                <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-150">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <FiSettings className="w-5 h-5 text-primary" />
                        </div>
                        Configuration
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Key Size Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-3">Key Size (bits)</label>
                            <div className="space-y-3">
                                {keySizes.map(size => {
                                    const sizeInfo = getSecurityLevel(size);
                                    return (
                                        <label key={size} className="flex items-center gap-3 cursor-pointer p-3 bg-muted/10 border border-border/20 rounded-lg hover:bg-muted/20 transition-all">
                                            <input
                                                type="radio"
                                                name="keySize"
                                                value={size}
                                                checked={keySize === size}
                                                onChange={(e) => setKeySize(parseInt(e.target.value))}
                                                className="w-4 h-4 text-primary bg-background border-muted/30 focus:ring-primary/50"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{size} bits</span>
                                                    <span className={`text-xs font-bold ${sizeInfo.color}`}>
                                                        {sizeInfo.level}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {sizeInfo.description} • {getEstimatedTime(size)}
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Format Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-3">Output Format</label>
                            <div className="space-y-3">
                                {formats.map(fmt => (
                                    <label key={fmt} className="flex items-center gap-3 cursor-pointer p-3 bg-muted/10 border border-border/20 rounded-lg hover:bg-muted/20 transition-all">
                                        <input
                                            type="radio"
                                            name="format"
                                            value={fmt}
                                            checked={format === fmt}
                                            onChange={(e) => setFormat(e.target.value)}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 focus:ring-primary/50"
                                        />
                                        <div>
                                            <div className="font-medium">{fmt}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {fmt === 'PEM' ? 'Standard PEM format (most common)' : 'PKCS#8 format (newer standard)'}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Security Info */}
                            <div className={`mt-4 p-3 rounded-lg border ${
                                security.level === 'Very Strong' ? 'bg-purple-500/10 border-purple-500/20' :
                                security.level === 'Strong' ? 'bg-blue-500/10 border-blue-500/20' :
                                security.level === 'Good' ? 'bg-green-500/10 border-green-500/20' :
                                'bg-orange-500/10 border-orange-500/20'
                            }`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <FiShield className={`w-4 h-4 ${security.color}`} />
                                    <span className={`text-sm font-medium ${security.color}`}>
                                        Security Level: {security.level}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {security.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-200">
                    <button
                        onClick={generateKeyPair}
                        disabled={isGenerating}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiZap className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                        {isGenerating ? `Generating ${keySize}-bit keys...` : 'Generate RSA Key Pair'}
                    </button>
                </div>

                {/* Generated Keys */}
                {keyPair && (
                    <div className="grid gap-8 lg:grid-cols-2 animate-fade-in-up animation-delay-300">
                        {/* Public Key */}
                        <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <FiUnlock className="w-5 h-5 text-green-500" />
                                    Public Key
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => downloadKey(keyPair.publicKey, `public_key_${keyPair.keySize}.pem`)}
                                        disabled={keyPair.publicKey.startsWith('Error')}
                                        className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                        title="Download public key"
                                    >
                                        <FiDownload className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(keyPair.publicKey, 'public')}
                                        disabled={keyPair.publicKey.startsWith('Error')}
                                        className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                        title="Copy public key"
                                    >
                                        {copiedPublic ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={keyPair.publicKey}
                                readOnly
                                className={`w-full h-80 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none font-mono text-xs ${
                                    keyPair.publicKey.startsWith('Error') ? 'text-red-500' : ''
                                }`}
                            />
                            <div className="mt-3 text-xs text-muted-foreground">
                                Safe to share • Use for encryption and signature verification
                            </div>
                        </div>

                        {/* Private Key */}
                        <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <FiLock className="w-5 h-5 text-red-500" />
                                    Private Key
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => downloadKey(keyPair.privateKey, `private_key_${keyPair.keySize}.pem`)}
                                        disabled={keyPair.privateKey.startsWith('Error')}
                                        className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                        title="Download private key"
                                    >
                                        <FiDownload className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(keyPair.privateKey, 'private')}
                                        disabled={keyPair.privateKey.startsWith('Error')}
                                        className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                        title="Copy private key"
                                    >
                                        {copiedPrivate ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={keyPair.privateKey}
                                readOnly
                                className={`w-full h-80 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none font-mono text-xs ${
                                    keyPair.privateKey.startsWith('Error') ? 'text-red-500' : ''
                                }`}
                            />
                            <div className="mt-3 text-xs text-red-500 font-medium">
                                ⚠️ Keep secret • Use for decryption and signing
                            </div>
                        </div>
                    </div>
                )}

                {/* Key Information */}
                <div className="mt-8 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-400">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiKey className="w-5 h-5 text-primary" />
                        RSA Key Information
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4 text-sm">
                            <div>
                                <strong className="text-primary">Key Sizes:</strong>
                                <ul className="mt-2 space-y-1 text-muted-foreground">
                                    <li>• <strong>1024-bit:</strong> Fast but weak (deprecated)</li>
                                    <li>• <strong>2048-bit:</strong> Standard for most applications</li>
                                    <li>• <strong>3072-bit:</strong> High security level</li>
                                    <li>• <strong>4096-bit:</strong> Maximum security (slower)</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-primary">Public Key:</strong>
                                <p className="mt-1 text-muted-foreground">
                                    Can be shared freely. Used to encrypt data and verify digital signatures.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div>
                                <strong className="text-primary">Private Key:</strong>
                                <p className="mt-1 text-muted-foreground">
                                    Must be kept secret. Used to decrypt data and create digital signatures.
                                </p>
                            </div>
                            <div>
                                <strong className="text-primary">Common Uses:</strong>
                                <ul className="mt-2 space-y-1 text-muted-foreground">
                                    <li>• SSL/TLS certificates</li>
                                    <li>• SSH authentication</li>
                                    <li>• Digital signatures</li>
                                    <li>• Email encryption (PGP)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                    <div className="mt-20 animate-fade-in-up animation-delay-500">
                        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center tracking-tight">
                            <span className="text-gradient-primary">Related Tools</span>
                        </h2>
                        <div
                            className={`grid gap-6 ${
                                isMobile ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
                            }`}
                        >
                            {relatedTools.map((tool, index) => (
                                <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                                    <ToolCard tool={tool} className="h-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}