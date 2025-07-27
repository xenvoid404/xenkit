'use client';

import { useState, useCallback, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ToolCard } from '@/components/ui/tool-card';
import { getRandomTools, type Tool } from '@/data/tools-data';
import { FiCopy, FiKey, FiCheck, FiLock, FiUnlock, FiSettings, FiAlertCircle } from 'react-icons/fi';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    [key: string]: unknown;
}

interface JwtHeader {
    alg?: string;
    typ?: string;
    [key: string]: unknown;
}

export function JwtBuilderDecoderClient() {
    const [mode, setMode] = useState<'build' | 'decode'>('build');
    const [algorithm, setAlgorithm] = useState('HS256');
    const [secret, setSecret] = useState('your-256-bit-secret');
    const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
    const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
    const [jwtToken, setJwtToken] = useState('');
    const [decodedHeader, setDecodedHeader] = useState('');
    const [decodedPayload, setDecodedPayload] = useState('');
    const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | 'none'>('none');
    const [copied, setCopied] = useState(false);
    const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const tools = getRandomTools(isMobile ? 3 : 6);
        setRelatedTools(tools.filter(tool => tool.id !== 'jwt-builder-decoder'));
    }, [isMobile]);

    const buildJWT = useCallback(() => {
        try {
            let headerObj: JwtHeader;
            let payloadObj: JwtPayload;

            try {
                headerObj = JSON.parse(header);
                payloadObj = JSON.parse(payload);
            } catch {
                setJwtToken('Error: Invalid JSON in header or payload');
                return;
            }

            // Ensure algorithm matches the header
            headerObj.alg = algorithm;
            headerObj.typ = headerObj.typ || 'JWT';

            const token = jwt.sign(payloadObj, secret, { 
                algorithm: algorithm as jwt.Algorithm
            });
            
            setJwtToken(token);
        } catch (error) {
            console.error('JWT Build Error:', error);
            setJwtToken(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, [header, payload, secret, algorithm]);

    const decodeJWT = useCallback((token: string) => {
        try {
            if (!token.trim()) {
                setDecodedHeader('');
                setDecodedPayload('');
                setVerificationResult('none');
                return;
            }

            // Decode without verification first
            const decoded = jwt.decode(token, { complete: true });
            
            if (!decoded) {
                setDecodedHeader('Error: Invalid JWT format');
                setDecodedPayload('Error: Invalid JWT format');
                setVerificationResult('invalid');
                return;
            }

            setDecodedHeader(JSON.stringify(decoded.header, null, 2));
            setDecodedPayload(JSON.stringify(decoded.payload, null, 2));

            // Try to verify with the provided secret
            try {
                jwt.verify(token, secret);
                setVerificationResult('valid');
            } catch {
                setVerificationResult('invalid');
            }
        } catch (error) {
            console.error('JWT Decode Error:', error);
            setDecodedHeader(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setDecodedPayload(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setVerificationResult('invalid');
        }
    }, [secret]);

    useEffect(() => {
        if (mode === 'build') {
            buildJWT();
        } else {
            decodeJWT(jwtToken);
        }
    }, [mode, buildJWT, decodeJWT, jwtToken]);

    const copyToClipboard = async (text: string) => {
        if (!text || text.startsWith('Error:')) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const algorithms = ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'];

    const generateSamplePayload = () => {
        const now = Math.floor(Date.now() / 1000);
        const samplePayload = {
            sub: "1234567890",
            name: "John Doe",
            admin: true,
            iat: now,
            exp: now + 3600 // 1 hour from now
        };
        setPayload(JSON.stringify(samplePayload, null, 2));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-8 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Breadcrumb
                        items={[
                            { href: '/', title: 'Home' },
                            { href: '/tools', title: 'Tools' },
                            { href: '/tools/jwt-builder-decoder', title: 'JWT Builder & Decoder' }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                            <FiKey className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="text-gradient-primary">JWT Builder & Decoder</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        Create, decode, and verify JSON Web Tokens (JWT) with various algorithms. Perfect for API development, 
                        authentication testing, and debugging JWT-based systems.
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-150">
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-2 inline-flex">
                        <button
                            onClick={() => setMode('build')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                mode === 'build'
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <FiLock className="w-4 h-4 inline mr-2" />
                            Build JWT
                        </button>
                        <button
                            onClick={() => setMode('decode')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                mode === 'decode'
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <FiUnlock className="w-4 h-4 inline mr-2" />
                            Decode JWT
                        </button>
                    </div>
                </div>

                {/* Configuration Panel */}
                <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-200">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <FiSettings className="w-5 h-5 text-primary" />
                        </div>
                        Configuration
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-2">Algorithm</label>
                            <select
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            >
                                {algorithms.map(alg => (
                                    <option key={alg} value={alg}>{alg}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Secret Key</label>
                            <input
                                type="text"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Enter your secret key"
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                {mode === 'build' ? (
                    /* Build Mode */
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Header & Payload */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
                                <h3 className="text-lg font-semibold mb-4">Header</h3>
                                <textarea
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    className="w-full h-32 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                                />
                            </div>

                            {/* Payload */}
                            <div className="bg-background/70 backdrop-blur-sm border border-border/30 rounded-xl p-6 animate-fade-in-up animation-delay-400">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Payload</h3>
                                    <button
                                        onClick={generateSamplePayload}
                                        className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/20 transition-all"
                                    >
                                        Sample
                                    </button>
                                </div>
                                <textarea
                                    value={payload}
                                    onChange={(e) => setPayload(e.target.value)}
                                    className="w-full h-40 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                                />
                            </div>
                        </div>

                        {/* Generated JWT */}
                        <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Generated JWT</h3>
                                <button
                                    onClick={() => copyToClipboard(jwtToken)}
                                    disabled={!jwtToken || jwtToken.startsWith('Error:')}
                                    className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                >
                                    {copied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                                </button>
                            </div>
                            <textarea
                                value={jwtToken}
                                readOnly
                                className={`w-full h-80 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none font-mono text-sm break-all ${
                                    jwtToken.startsWith('Error:') ? 'text-red-500' : ''
                                }`}
                            />
                        </div>
                    </div>
                ) : (
                    /* Decode Mode */
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* JWT Input */}
                        <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
                            <h3 className="text-lg font-semibold mb-4">JWT Token</h3>
                            <textarea
                                value={jwtToken}
                                onChange={(e) => setJwtToken(e.target.value)}
                                placeholder="Paste your JWT token here..."
                                className="w-full h-64 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                            />
                            
                            {/* Verification Status */}
                            {verificationResult !== 'none' && (
                                <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                                    verificationResult === 'valid' 
                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                                }`}>
                                    <FiAlertCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {verificationResult === 'valid' ? 'Signature Verified' : 'Invalid Signature'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Decoded Content */}
                        <div className="space-y-6">
                            {/* Decoded Header */}
                            <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-400">
                                <h3 className="text-lg font-semibold mb-4">Decoded Header</h3>
                                <textarea
                                    value={decodedHeader}
                                    readOnly
                                    className={`w-full h-32 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none font-mono text-sm ${
                                        decodedHeader.startsWith('Error:') ? 'text-red-500' : ''
                                    }`}
                                />
                            </div>

                            {/* Decoded Payload */}
                            <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-500">
                                <h3 className="text-lg font-semibold mb-4">Decoded Payload</h3>
                                <textarea
                                    value={decodedPayload}
                                    readOnly
                                    className={`w-full h-40 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none font-mono text-sm ${
                                        decodedPayload.startsWith('Error:') ? 'text-red-500' : ''
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                    <div className="mt-20 animate-fade-in-up animation-delay-600">
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