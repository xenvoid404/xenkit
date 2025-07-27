import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useTheme } from '@/contexts/theme-provider';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-muted/20 hover:bg-muted/40 hover:scale-105 active:scale-95 transition-all duration-300 group border border-border/30 hover:border-border/50"
        >
            <div className="relative">
                {resolvedTheme === 'dark' ? (
                    <IoSunnyOutline className="h-5 w-5 text-yellow-500 transition-all duration-300 group-hover:rotate-90 animate-fade-in-up" />
                ) : (
                    <IoMoonOutline className="h-5 w-5 text-slate-600 dark:text-slate-400 transition-all duration-300 group-hover:-rotate-12 animate-fade-in-up" />
                )}
            </div>
        </button>
    );
}
