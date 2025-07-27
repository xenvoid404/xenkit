'use client';

import { useState, useCallback, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ToolCard } from '@/components/ui/tool-card';
import { getRandomTools, type Tool } from '@/data/tools-data';
import { 
    FiCopy, 
    FiRefreshCw, 
    FiLock, 
    FiCheck, 
    FiEye, 
    FiEyeOff,
    FiShield,
    FiZap,
    FiSettings
} from 'react-icons/fi';
// Custom password generator function
function generateRandomPassword(options: { length: number; characters: string }): string {
    const { length, characters } = options;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

interface PasswordOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeSimilar: boolean;
    excludeAmbiguous: boolean;
}

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
        setRelatedTools(tools.filter(tool => tool.id !== 'password-generator'));
    }, [isMobile]);

    const generateNewPassword = useCallback(() => {
        try {
            let charset = '';
            
            if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (options.includeNumbers) charset += '0123456789';
            if (options.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            if (options.excludeSimilar) {
                charset = charset.replace(/[il1Lo0O]/g, '');
            }
            
            if (options.excludeAmbiguous) {
                charset = charset.replace(/[{}[\]()\/\\'"~,;.<>]/g, '');
            }

            if (!charset) {
                setPassword('Please select at least one character type');
                return;
            }

            const newPassword = generateRandomPassword({
                length: options.length,
                characters: charset
            });

            setPassword(newPassword);
        } catch {
            setPassword('Error generating password');
        }
    }, [options]);

    useEffect(() => {
        generateNewPassword();
    }, [generateNewPassword]);

    const copyToClipboard = async () => {
        if (!password || password.includes('Error') || password.includes('Please')) return;
        
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const getPasswordStrength = (pass: string): { level: string; color: string; percentage: number } => {
        if (!pass || pass.includes('Error') || pass.includes('Please')) {
            return { level: 'Invalid', color: 'text-red-500', percentage: 0 };
        }

        let score = 0;
        if (pass.length >= 8) score += 1;
        if (pass.length >= 12) score += 1;
        if (pass.length >= 16) score += 1;
        if (/[a-z]/.test(pass)) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (score < 3) return { level: 'Weak', color: 'text-red-500', percentage: 25 };
        if (score < 5) return { level: 'Fair', color: 'text-orange-500', percentage: 50 };
        if (score < 6) return { level: 'Good', color: 'text-yellow-500', percentage: 75 };
        return { level: 'Strong', color: 'text-green-500', percentage: 100 };
    };

    const strength = getPasswordStrength(password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-8 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Breadcrumb
                        items={[
                            { href: '/', title: 'Home' },
                            { href: '/tools', title: 'Tools' },
                            { href: '/tools/password-generator', title: 'Password Generator' }
                        ]}
                    />
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                            <FiLock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="text-gradient-primary">Password Generator</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                        Generate secure, random passwords with customizable options for enhanced security. 
                        All passwords are generated locally in your browser - nothing is stored or transmitted.
                    </p>
                </div>

                {/* Main Generator */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Password Display & Controls */}
                    <div className="lg:col-span-2">
                        <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-150">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                        <FiShield className="w-5 h-5 text-primary" />
                                    </div>
                                    Generated Password
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 border border-border/30 hover:border-border/50"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Display */}
                            <div className="relative mb-6">
                                <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg border border-border/30">
                                    <code className={`flex-1 text-lg font-mono break-all ${
                                        showPassword ? '' : 'filter blur-sm select-none'
                                    }`}>
                                        {password || 'Generating...'}
                                    </code>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={generateNewPassword}
                                            className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 border border-border/30 hover:border-border/50"
                                            aria-label="Generate new password"
                                        >
                                            <FiRefreshCw className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            disabled={!password || password.includes('Error') || password.includes('Please')}
                                            className="p-2.5 hover:bg-muted/30 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-border/30 hover:border-border/50"
                                            aria-label="Copy password"
                                        >
                                            {copied ? <FiCheck className="w-5 h-5 text-green-500" /> : <FiCopy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Password Strength */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-foreground">Password Strength</span>
                                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                                        strength.level === 'Strong' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' :
                                        strength.level === 'Good' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' :
                                        strength.level === 'Fair' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20' : 
                                        'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                                    }`}>
                                        {strength.level}
                                    </span>
                                </div>
                                <div className="w-full bg-muted/20 rounded-full h-3 border border-border/30">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${
                                            strength.level === 'Strong' ? 'bg-green-500' :
                                            strength.level === 'Good' ? 'bg-yellow-500' :
                                            strength.level === 'Fair' ? 'bg-orange-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${strength.percentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={generateNewPassword}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all font-medium"
                                >
                                    <FiZap className="w-4 h-4" />
                                    Generate New
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!password || password.includes('Error') || password.includes('Please')}
                                    className="flex items-center gap-2 px-6 py-3 bg-background/70 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-background/90 hover:border-border/70 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    {copied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Options Panel */}
                    <div className="bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in-up animation-delay-300">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <FiSettings className="w-5 h-5 text-primary" />
                            </div>
                            Options
                        </h2>

                        <div className="space-y-6">
                            {/* Length */}
                            <div>
                                <label className="block text-sm font-medium mb-3">
                                    Password Length: {options.length}
                                </label>
                                <input
                                    type="range"
                                    min="4"
                                    max="128"
                                    value={options.length}
                                    onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                                    className="w-full h-2 bg-muted/20 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>4</span>
                                    <span>128</span>
                                </div>
                            </div>

                            {/* Character Types */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Include Characters</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={options.includeUppercase}
                                            onChange={(e) => setOptions(prev => ({ ...prev, includeUppercase: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                        />
                                        <span className="text-sm">Uppercase (A-Z)</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={options.includeLowercase}
                                            onChange={(e) => setOptions(prev => ({ ...prev, includeLowercase: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                        />
                                        <span className="text-sm">Lowercase (a-z)</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={options.includeNumbers}
                                            onChange={(e) => setOptions(prev => ({ ...prev, includeNumbers: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                        />
                                        <span className="text-sm">Numbers (0-9)</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={options.includeSymbols}
                                            onChange={(e) => setOptions(prev => ({ ...prev, includeSymbols: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                        />
                                        <span className="text-sm">Symbols (!@#$...)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Advanced Options */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={options.excludeSimilar}
                                            onChange={(e) => setOptions(prev => ({ ...prev, excludeSimilar: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                        />
                                        <span className="text-sm">Exclude similar characters (i, l, 1, L, o, 0, O)</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={options.excludeAmbiguous}
                                            onChange={(e) => setOptions(prev => ({ ...prev, excludeAmbiguous: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-muted/30 rounded focus:ring-primary/50"
                                        />
                                        <span className="text-sm">Exclude ambiguous characters ({`{ } [ ] ( ) / \\ ' " ~ , ; . < >`})</span>
                                    </label>
                                </div>
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
                        <div className={`grid gap-6 ${
                            isMobile ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
                        }`}>
                            {relatedTools.map((tool, index) => (
                                <div
                                    key={tool.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 75}ms` }}
                                >
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