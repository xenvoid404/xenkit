'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ToolCard } from '@/components/ui/tool-card';
import { getRandomTools, type Tool } from '@/data/tools-data';
import { FiCopy, FiHash, FiCheck, FiShield, FiRefreshCw } from 'react-icons/fi';
import CryptoJS from 'crypto-js';

interface HashResult {
    algorithm: string;
    hash: string;
    length: number;
}

export function HashGeneratorClient() {
    const [inputText, setInputText] = useState('');
    const [hashResults, setHashResults] = useState<HashResult[]>([]);
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(['MD5', 'SHA1', 'SHA256', 'SHA512']);
    const [copiedHashes, setCopiedHashes] = useState<{[key: string]: boolean}>({});
    const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const algorithms = useMemo(() => [
        { name: 'MD5', func: CryptoJS.MD5 },
        { name: 'SHA1', func: CryptoJS.SHA1 },
        { name: 'SHA224', func: CryptoJS.SHA224 },
        { name: 'SHA256', func: CryptoJS.SHA256 },
        { name: 'SHA384', func: CryptoJS.SHA384 },
        { name: 'SHA512', func: CryptoJS.SHA512 },
        { name: 'SHA3', func: CryptoJS.SHA3 },
        { name: 'RIPEMD160', func: CryptoJS.RIPEMD160 }
    ], []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const tools = getRandomTools(isMobile ? 3 : 6);
        setRelatedTools(tools.filter(tool => tool.id !== 'hash-generator'));
    }, [isMobile]);

    const generateHashes = useCallback(() => {
        if (!inputText.trim()) {
            setHashResults([]);
            return;
        }

        const results: HashResult[] = [];
        
        selectedAlgorithms.forEach(algorithmName => {
            const algorithm = algorithms.find(alg => alg.name === algorithmName);
            if (algorithm) {
                try {
                    const hash = algorithm.func(inputText).toString();
                    results.push({
                        algorithm: algorithmName,
                        hash: hash,
                        length: hash.length
                    });
                } catch (error) {
                    console.error(`Error generating ${algorithmName} hash:`, error);
                    results.push({
                        algorithm: algorithmName,
                        hash: 'Error generating hash',
                        length: 0
                    });
                }
            }
        });

        setHashResults(results);
    }, [inputText, selectedAlgorithms, algorithms]);

    useEffect(() => {
        generateHashes();
    }, [generateHashes]);

    const copyToClipboard = async (hash: string, algorithm: string) => {
        if (!hash || hash.startsWith('Error')) return;

        try {
            await navigator.clipboard.writeText(hash);
            setCopiedHashes(prev => ({ ...prev, [algorithm]: true }));
            setTimeout(() => {
                setCopiedHashes(prev => ({ ...prev, [algorithm]: false }));
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const toggleAlgorithm = (algorithmName: string) => {
        setSelectedAlgorithms(prev => {
            if (prev.includes(algorithmName)) {
                return prev.filter(alg => alg !== algorithmName);
            } else {
                return [...prev, algorithmName];
            }
        });
    };

    const selectAllAlgorithms = () => {
        setSelectedAlgorithms(algorithms.map(alg => alg.name));
    };

    const clearAllAlgorithms = () => {
        setSelectedAlgorithms([]);
    };

    const clearInput = () => {
        setInputText('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-8 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Breadcrumb
                        items={[
                            { href: '/', title: 'Home' },
                            { href: '/tools', title: 'Tools' },
                            { href: '/tools/hash-generator', title: 'Hash Generator' }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                            <FiHash className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="text-gradient-primary">Hash Generator</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        Generate cryptographic hash values from text using various algorithms including MD5, SHA-1, SHA-256, SHA-512, and more. 
                        Perfect for data integrity verification and security applications.
                    </p>
                </div>

                {/* Algorithm Selection */}
                <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-150">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <FiShield className="w-5 h-5 text-primary" />
                            </div>
                            Hash Algorithms
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={selectAllAlgorithms}
                                className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/20 transition-all"
                            >
                                Select All
                            </button>
                            <button
                                onClick={clearAllAlgorithms}
                                className="px-3 py-1 text-xs bg-muted/20 text-muted-foreground border border-border/30 rounded hover:bg-muted/30 transition-all"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                        {algorithms.map(algorithm => (
                            <label key={algorithm.name} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedAlgorithms.includes(algorithm.name)}
                                    onChange={() => toggleAlgorithm(algorithm.name)}
                                    className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                />
                                <span className="text-sm font-medium">{algorithm.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Input Section */}
                <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Input Text</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={clearInput}
                                className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 border border-border/30 hover:border-border/50"
                                title="Clear input"
                            >
                                <FiRefreshCw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to generate hash values..."
                        className="w-full h-32 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm"
                    />
                    <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                        <span>{inputText.length} characters</span>
                        <span>{new Blob([inputText]).size} bytes</span>
                    </div>
                </div>

                {/* Hash Results */}
                {hashResults.length > 0 && (
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
                        <h2 className="text-xl font-semibold mb-6">Generated Hashes</h2>
                        <div className="space-y-4">
                            {hashResults.map((result, index) => (
                                <div key={result.algorithm} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold text-primary">{result.algorithm}</span>
                                            <span className="text-xs text-muted-foreground">({result.length} chars)</span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(result.hash, result.algorithm)}
                                            disabled={result.hash.startsWith('Error')}
                                            className="p-2 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                            title="Copy hash"
                                        >
                                            {copiedHashes[result.algorithm] ? 
                                                <FiCheck className="w-4 h-4 text-green-500" /> : 
                                                <FiCopy className="w-4 h-4" />
                                            }
                                        </button>
                                    </div>
                                    <div className={`p-3 bg-muted/20 border border-border/30 rounded-lg font-mono text-sm break-all ${
                                        result.hash.startsWith('Error') ? 'text-red-500' : ''
                                    }`}>
                                        {result.hash}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hash Information */}
                <div className="mt-8 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-400">
                    <h3 className="text-lg font-semibold mb-4">Hash Algorithm Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="text-primary">MD5:</strong> 128-bit hash, fast but not cryptographically secure
                            </div>
                            <div>
                                <strong className="text-primary">SHA-1:</strong> 160-bit hash, deprecated for security applications
                            </div>
                            <div>
                                <strong className="text-primary">SHA-256:</strong> 256-bit hash, widely used and secure
                            </div>
                            <div>
                                <strong className="text-primary">SHA-512:</strong> 512-bit hash, very secure with larger output
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="text-primary">SHA-3:</strong> Latest SHA standard, highly secure
                            </div>
                            <div>
                                <strong className="text-primary">SHA-224/384:</strong> Truncated versions of SHA-256/512
                            </div>
                            <div>
                                <strong className="text-primary">RIPEMD160:</strong> 160-bit hash, used in Bitcoin addresses
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