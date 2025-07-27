'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ToolCard } from '@/components/ui/tool-card';
import { getRandomTools, type Tool } from '@/data/tools-data';
import { FiCopy, FiTag, FiCheck, FiRefreshCw, FiSettings, FiZap } from 'react-icons/fi';
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { nanoid, customAlphabet } from 'nanoid';

interface GeneratedId {
    type: string;
    value: string;
    description: string;
}

export function UuidGeneratorClient() {
    const [generatedIds, setGeneratedIds] = useState<GeneratedId[]>([]);
    const [copiedIds, setCopiedIds] = useState<{[key: string]: boolean}>({});
    const [bulkCount, setBulkCount] = useState(5);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['UUID v4', 'NanoID']);
    const [customNamespace, setCustomNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    const [customName, setCustomName] = useState('example.com');
    const [nanoidLength, setNanoidLength] = useState(21);
    const [customAlphabet_, setCustomAlphabet_] = useState('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
    const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const idTypes = useMemo(() => [
        { name: 'UUID v1', description: 'Time-based UUID with MAC address' },
        { name: 'UUID v4', description: 'Random UUID (most common)' },
        { name: 'UUID v5', description: 'Name-based UUID using SHA-1' },
        { name: 'NanoID', description: 'URL-safe unique string generator' },
        { name: 'Custom NanoID', description: 'NanoID with custom alphabet' },
        { name: 'Short ID', description: 'Short random identifier (8 chars)' },
        { name: 'Numeric ID', description: 'Random numeric identifier' },
        { name: 'Hex ID', description: 'Random hexadecimal identifier' }
    ], []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const tools = getRandomTools(isMobile ? 3 : 6);
        setRelatedTools(tools.filter(tool => tool.id !== 'uuid-generator'));
    }, [isMobile]);

    const generateId = useCallback((type: string): string => {
        try {
            switch (type) {
                case 'UUID v1':
                    return uuidv1();
                case 'UUID v4':
                    return uuidv4();
                case 'UUID v5':
                    return uuidv5(customName, customNamespace);
                case 'NanoID':
                    return nanoid(nanoidLength);
                case 'Custom NanoID':
                    const customNanoid = customAlphabet(customAlphabet_, nanoidLength);
                    return customNanoid();
                case 'Short ID':
                    return nanoid(8);
                case 'Numeric ID':
                    return Math.random().toString().slice(2, 12);
                case 'Hex ID':
                    return Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
                default:
                    return 'Unknown type';
            }
        } catch (error) {
            console.error(`Error generating ${type}:`, error);
            return 'Error generating ID';
        }
    }, [customName, customNamespace, nanoidLength, customAlphabet_]);

    const generateIds = useCallback(() => {
        const newIds: GeneratedId[] = [];
        
        for (let i = 0; i < bulkCount; i++) {
            selectedTypes.forEach(type => {
                const typeInfo = idTypes.find(t => t.name === type);
                if (typeInfo) {
                    newIds.push({
                        type: type,
                        value: generateId(type),
                        description: typeInfo.description
                    });
                }
            });
        }
        
        setGeneratedIds(newIds);
    }, [selectedTypes, bulkCount, generateId, idTypes]);

    useEffect(() => {
        if (selectedTypes.length > 0) {
            generateIds();
        }
    }, [generateIds, selectedTypes.length]);

    const copyToClipboard = async (value: string, type: string, index: number) => {
        if (!value || value.startsWith('Error')) return;

        try {
            await navigator.clipboard.writeText(value);
            const key = `${type}-${index}`;
            setCopiedIds(prev => ({ ...prev, [key]: true }));
            setTimeout(() => {
                setCopiedIds(prev => ({ ...prev, [key]: false }));
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const copyAllIds = async () => {
        const allIds = generatedIds.map(id => id.value).join('\n');
        try {
            await navigator.clipboard.writeText(allIds);
            setCopiedIds(prev => ({ ...prev, 'all': true }));
            setTimeout(() => {
                setCopiedIds(prev => ({ ...prev, 'all': false }));
            }, 2000);
        } catch (error) {
            console.error('Failed to copy all:', error);
        }
    };

    const toggleIdType = (typeName: string) => {
        setSelectedTypes(prev => {
            if (prev.includes(typeName)) {
                return prev.filter(type => type !== typeName);
            } else {
                return [...prev, typeName];
            }
        });
    };

    const selectAllTypes = () => {
        setSelectedTypes(idTypes.map(type => type.name));
    };

    const clearAllTypes = () => {
        setSelectedTypes([]);
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
                            { href: '/tools/uuid-generator', title: 'UUID Generator' }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                            <FiTag className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="text-gradient-primary">UUID Generator</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        Generate various types of unique identifiers including UUIDs (v1, v4, v5), NanoIDs, and custom formats. 
                        Perfect for application development, database keys, and unique references.
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

                    {/* ID Type Selection */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">ID Types</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={selectAllTypes}
                                    className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/20 transition-all"
                                >
                                    Select All
                                </button>
                                <button
                                    onClick={clearAllTypes}
                                    className="px-3 py-1 text-xs bg-muted/20 text-muted-foreground border border-border/30 rounded hover:bg-muted/30 transition-all"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {idTypes.map(type => (
                                <label key={type.name} className="flex items-start gap-3 cursor-pointer p-3 bg-muted/10 border border-border/20 rounded-lg hover:bg-muted/20 transition-all">
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type.name)}
                                        onChange={() => toggleIdType(type.name)}
                                        className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50 mt-0.5"
                                    />
                                    <div>
                                        <div className="text-sm font-medium">{type.name}</div>
                                        <div className="text-xs text-muted-foreground">{type.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Options */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium mb-2">Bulk Count</label>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={bulkCount}
                                onChange={(e) => setBulkCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">NanoID Length</label>
                            <input
                                type="number"
                                min="4"
                                max="50"
                                value={nanoidLength}
                                onChange={(e) => setNanoidLength(Math.max(4, Math.min(50, parseInt(e.target.value) || 21)))}
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">UUID v5 Name</label>
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder="example.com"
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">UUID v5 Namespace</label>
                            <input
                                type="text"
                                value={customNamespace}
                                onChange={(e) => setCustomNamespace(e.target.value)}
                                placeholder="6ba7b810-9dad-11d1-80b4-00c04fd430c8"
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                            />
                        </div>
                        <div className="md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium mb-2">Custom Alphabet</label>
                            <input
                                type="text"
                                value={customAlphabet_}
                                onChange={(e) => setCustomAlphabet_(e.target.value)}
                                placeholder="Custom characters for NanoID"
                                className="w-full p-3 bg-muted/20 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-200">
                    <button
                        onClick={generateIds}
                        disabled={selectedTypes.length === 0}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiZap className="w-5 h-5" />
                        Generate IDs
                    </button>
                </div>

                {/* Generated IDs */}
                {generatedIds.length > 0 && (
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Generated IDs ({generatedIds.length})</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={copyAllIds}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-all"
                                >
                                    {copiedIds['all'] ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                                    {copiedIds['all'] ? 'Copied!' : 'Copy All'}
                                </button>
                                <button
                                    onClick={generateIds}
                                    className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 border border-border/30 hover:border-border/50"
                                >
                                    <FiRefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {generatedIds.map((id, index) => (
                                <div key={`${id.type}-${index}`} className="animate-fade-in-up" style={{ animationDelay: `${index * 25}ms` }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold text-primary">{id.type}</span>
                                            <span className="text-xs text-muted-foreground">{id.description}</span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(id.value, id.type, index)}
                                            disabled={id.value.startsWith('Error')}
                                            className="p-2 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                        >
                                            {copiedIds[`${id.type}-${index}`] ? 
                                                <FiCheck className="w-4 h-4 text-green-500" /> : 
                                                <FiCopy className="w-4 h-4" />
                                            }
                                        </button>
                                    </div>
                                    <div className={`p-3 bg-muted/20 border border-border/30 rounded-lg font-mono text-sm break-all ${
                                        id.value.startsWith('Error') ? 'text-red-500' : ''
                                    }`}>
                                        {id.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ID Information */}
                <div className="mt-8 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-400">
                    <h3 className="text-lg font-semibold mb-4">ID Type Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="text-primary">UUID v1:</strong> Time-based with MAC address, predictable but unique
                            </div>
                            <div>
                                <strong className="text-primary">UUID v4:</strong> Random-based, most commonly used UUID format
                            </div>
                            <div>
                                <strong className="text-primary">UUID v5:</strong> Name-based using SHA-1, deterministic from input
                            </div>
                            <div>
                                <strong className="text-primary">NanoID:</strong> URL-safe, smaller than UUID, customizable
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="text-primary">Custom NanoID:</strong> NanoID with your own character set
                            </div>
                            <div>
                                <strong className="text-primary">Short ID:</strong> 8-character random identifier
                            </div>
                            <div>
                                <strong className="text-primary">Numeric ID:</strong> Numbers-only identifier
                            </div>
                            <div>
                                <strong className="text-primary">Hex ID:</strong> Hexadecimal-based identifier
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