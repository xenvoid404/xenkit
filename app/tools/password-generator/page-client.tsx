'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiRefreshCw, FiLock, FiCheck, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { getRelatedTools } from '@/data/tools-data';
import { ToolCard } from '@/components/ui/tool-card';

interface PasswordOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeSimilar: boolean;
    excludeAmbiguous: boolean;
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = 'il1Lo0O';
const AMBIGUOUS_CHARS = '{}[]()/\\\'"`~,;.<>';

export function PasswordGeneratorClient() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [copied, setCopied] = useState(false);
    const [options, setOptions] = useState<PasswordOptions>({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        excludeSimilar: false,
        excludeAmbiguous: false
    });

    const generatePassword = useCallback(() => {
        let charset = '';
        
        if (options.includeLowercase) charset += LOWERCASE;
        if (options.includeUppercase) charset += UPPERCASE;
        if (options.includeNumbers) charset += NUMBERS;
        if (options.includeSymbols) charset += SYMBOLS;

        if (options.excludeSimilar) {
            charset = charset.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
        }

        if (options.excludeAmbiguous) {
            charset = charset.split('').filter(char => !AMBIGUOUS_CHARS.includes(char)).join('');
        }

        if (!charset) {
            setPassword('Please select at least one character type');
            return;
        }

        let result = '';
        const array = new Uint32Array(options.length);
        crypto.getRandomValues(array);

        for (let i = 0; i < options.length; i++) {
            result += charset[array[i] % charset.length];
        }

        setPassword(result);
    }, [options]);

    const copyToClipboard = async () => {
        if (!password || password === 'Please select at least one character type') return;
        
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy password:', err);
        }
    };

    const getPasswordStrength = () => {
        if (!password || password === 'Please select at least one character type') return 0;
        
        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;
        
        return Math.min(score, 4);
    };

    const getStrengthLabel = (strength: number) => {
        switch (strength) {
            case 0:
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return 'Weak';
        }
    };

    const getStrengthColor = (strength: number) => {
        switch (strength) {
            case 0:
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-blue-500';
            case 4: return 'bg-green-500';
            default: return 'bg-red-500';
        }
    };

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const relatedTools = getRelatedTools('password-generator');

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Tools', href: '/tools' },
        { title: 'Password Generator', href: '/tools/password-generator' }
    ];

    const strength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FiLock className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Password Generator</h1>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Generate strong, secure passwords with customizable options. Perfect for creating unique passwords for your accounts and applications.
                    </p>
                </motion.div>

                {/* Main Generator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-card border border-muted/20 rounded-xl p-6 mb-8"
                >
                    {/* Generated Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-foreground mb-3">Generated Password</label>
                        <div className="relative">
                            <div className="flex">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    readOnly
                                    className="flex-1 px-4 py-3 bg-background border border-muted/30 rounded-l-lg font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="px-3 bg-background border-t border-b border-muted/30 text-muted-foreground hover:text-foreground transition-colors"
                                    title={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-3 bg-primary text-background rounded-r-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        
                        {/* Password Strength */}
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Password Strength</span>
                                <span className="text-sm font-medium text-foreground">{getStrengthLabel(strength)}</span>
                            </div>
                            <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`}
                                    style={{ width: `${(strength / 4) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-6">
                        {/* Length */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                                Password Length: {options.length}
                            </label>
                            <input
                                type="range"
                                min="4"
                                max="128"
                                value={options.length}
                                onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                                className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>4</span>
                                <span>128</span>
                            </div>
                        </div>

                        {/* Character Types */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">Character Types</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.includeUppercase}
                                        onChange={(e) => setOptions(prev => ({ ...prev, includeUppercase: e.target.checked }))}
                                        className="rounded border-muted/30 text-primary focus:ring-primary/50"
                                    />
                                    <span className="text-sm text-foreground">Uppercase (A-Z)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.includeLowercase}
                                        onChange={(e) => setOptions(prev => ({ ...prev, includeLowercase: e.target.checked }))}
                                        className="rounded border-muted/30 text-primary focus:ring-primary/50"
                                    />
                                    <span className="text-sm text-foreground">Lowercase (a-z)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.includeNumbers}
                                        onChange={(e) => setOptions(prev => ({ ...prev, includeNumbers: e.target.checked }))}
                                        className="rounded border-muted/30 text-primary focus:ring-primary/50"
                                    />
                                    <span className="text-sm text-foreground">Numbers (0-9)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.includeSymbols}
                                        onChange={(e) => setOptions(prev => ({ ...prev, includeSymbols: e.target.checked }))}
                                        className="rounded border-muted/30 text-primary focus:ring-primary/50"
                                    />
                                    <span className="text-sm text-foreground">Symbols (!@#$%)</span>
                                </label>
                            </div>
                        </div>

                        {/* Advanced Options */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">Advanced Options</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.excludeSimilar}
                                        onChange={(e) => setOptions(prev => ({ ...prev, excludeSimilar: e.target.checked }))}
                                        className="rounded border-muted/30 text-primary focus:ring-primary/50"
                                    />
                                    <span className="text-sm text-foreground">Exclude similar characters (il1Lo0O)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.excludeAmbiguous}
                                        onChange={(e) => setOptions(prev => ({ ...prev, excludeAmbiguous: e.target.checked }))}
                                        className="rounded border-muted/30 text-primary focus:ring-primary/50"
                                    />
                                    <span className="text-sm text-foreground">Exclude ambiguous characters ({}[]())</span>
                                </label>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generatePassword}
                            className="w-full px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <FiRefreshCw className="h-4 w-4" />
                            Generate New Password
                        </button>
                    </div>
                </motion.div>

                {/* Security Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-card border border-muted/20 rounded-xl p-6 mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FiShield className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">Password Security Tips</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                Use unique passwords for each account
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                Use a combination of character types
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                Make passwords at least 12 characters long
                            </li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                Consider using a password manager
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                Enable two-factor authentication when available
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                Never share passwords or store them in plain text
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}