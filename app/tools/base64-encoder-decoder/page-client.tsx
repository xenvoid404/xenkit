'use client';

import { useState, useCallback, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ToolCard } from '@/components/ui/tool-card';
import { getRandomTools, type Tool } from '@/data/tools-data';
import { FiCopy, FiCode, FiCheck, FiArrowRight, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { Base64 } from 'js-base64';

export function Base64EncoderDecoderClient() {
    const [inputText, setInputText] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [decodedText, setDecodedText] = useState('');
    const [copiedEncode, setCopiedEncode] = useState(false);
    const [copiedDecode, setCopiedDecode] = useState(false);
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
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
        setRelatedTools(tools.filter(tool => tool.id !== 'base64-encoder-decoder'));
    }, [isMobile]);

    const encodeToBase64 = useCallback((text: string) => {
        try {
            if (!text) {
                setEncodedText('');
                return;
            }
            const encoded = Base64.encode(text);
            setEncodedText(encoded);
        } catch (error) {
            console.error('Encoding error:', error);
            setEncodedText('Error: Invalid input for encoding');
        }
    }, []);

    const decodeFromBase64 = useCallback((text: string) => {
        try {
            if (!text) {
                setDecodedText('');
                return;
            }
            const decoded = Base64.decode(text);
            setDecodedText(decoded);
        } catch (error) {
            console.error('Decoding error:', error);
            setDecodedText('Error: Invalid Base64 string');
        }
    }, []);

    useEffect(() => {
        if (mode === 'encode') {
            encodeToBase64(inputText);
        } else {
            decodeFromBase64(inputText);
        }
    }, [inputText, mode, encodeToBase64, decodeFromBase64]);

    const copyToClipboard = async (text: string, type: 'encode' | 'decode') => {
        if (!text || text.startsWith('Error:')) return;

        try {
            await navigator.clipboard.writeText(text);
            if (type === 'encode') {
                setCopiedEncode(true);
                setTimeout(() => setCopiedEncode(false), 2000);
            } else {
                setCopiedDecode(true);
                setTimeout(() => setCopiedDecode(false), 2000);
            }
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const clearAll = () => {
        setInputText('');
        setEncodedText('');
        setDecodedText('');
    };

    const swapMode = () => {
        const newMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(newMode);
        
        // Swap input and output
        if (mode === 'encode' && encodedText && !encodedText.startsWith('Error:')) {
            setInputText(encodedText);
        } else if (mode === 'decode' && decodedText && !decodedText.startsWith('Error:')) {
            setInputText(decodedText);
        }
    };

    const currentOutput = mode === 'encode' ? encodedText : decodedText;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-8 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Breadcrumb
                        items={[
                            { href: '/', title: 'Home' },
                            { href: '/tools', title: 'Tools' },
                            { href: '/tools/base64-encoder-decoder', title: 'Base64 Encoder & Decoder' }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                            <FiCode className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="text-gradient-primary">Base64 Encoder & Decoder</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        Encode and decode text to/from Base64 format with real-time conversion. Perfect for data encoding, 
                        API testing, and web development tasks.
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-150">
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-2 inline-flex">
                        <button
                            onClick={() => setMode('encode')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                mode === 'encode'
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <FiArrowRight className="w-4 h-4 inline mr-2" />
                            Encode
                        </button>
                        <button
                            onClick={() => setMode('decode')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                mode === 'decode'
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <FiArrowLeft className="w-4 h-4 inline mr-2" />
                            Decode
                        </button>
                    </div>
                </div>

                {/* Main Converter */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Input */}
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={swapMode}
                                    className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 border border-border/30 hover:border-border/50"
                                    title="Swap mode"
                                >
                                    <FiRefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                            className="w-full h-64 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                        />
                        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                            <span>{inputText.length} characters</span>
                            <button
                                onClick={clearAll}
                                className="px-3 py-1 text-xs hover:bg-muted/30 rounded transition-all"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
                            </h2>
                            <button
                                onClick={() => copyToClipboard(currentOutput, mode)}
                                disabled={!currentOutput || currentOutput.startsWith('Error:')}
                                className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                title="Copy to clipboard"
                            >
                                {(mode === 'encode' ? copiedEncode : copiedDecode) ? 
                                    <FiCheck className="w-4 h-4 text-green-500" /> : 
                                    <FiCopy className="w-4 h-4" />
                                }
                            </button>
                        </div>
                        <textarea
                            value={currentOutput}
                            readOnly
                            placeholder={mode === 'encode' ? 'Base64 encoded text will appear here...' : 'Decoded text will appear here...'}
                            className={`w-full h-64 p-4 bg-muted/20 border border-border/30 rounded-lg resize-none font-mono text-sm ${
                                currentOutput.startsWith('Error:') ? 'text-red-500' : ''
                            }`}
                        />
                        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                            <span>{currentOutput.length} characters</span>
                            <button
                                onClick={() => copyToClipboard(currentOutput, mode)}
                                disabled={!currentOutput || currentOutput.startsWith('Error:')}
                                className="px-3 py-1 text-xs hover:bg-muted/30 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {(mode === 'encode' ? copiedEncode : copiedDecode) ? 'Copied!' : 'Copy'}
                            </button>
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