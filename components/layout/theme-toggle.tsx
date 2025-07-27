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
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background hover:bg-background/70 hover:scale-110 active:scale-95 transition-all duration-300 group"
        >
            <div className="relative">
                {resolvedTheme === 'dark' ? (
                    <IoSunnyOutline className="h-5 w-5 transition-all duration-300 group-hover:rotate-90 animate-fade-in-up" />
                ) : (
                    <IoMoonOutline className="h-5 w-5 transition-all duration-300 group-hover:-rotate-12 animate-fade-in-up" />
                )}
            </div>
        </button>
    );
}
