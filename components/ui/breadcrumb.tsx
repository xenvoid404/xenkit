import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

type Breadcrumb = {
    href: string;
    title: string;
};

interface BreadcrumbsProps {
    items: Breadcrumb[];
}

export function Breadcrumb({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-2 text-sm animate-fade-in-up" aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <div key={index} className="flex items-center gap-2">
                        {!isLast ? (
                            <>
                                <Link 
                                    href={item.href} 
                                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105 px-2 py-1 rounded-md hover:bg-primary/5"
                                >
                                    {item.title}
                                </Link>
                                <FiChevronRight className="w-4 h-4 text-muted-foreground/50" />
                            </>
                        ) : (
                            <span className="text-foreground font-semibold px-2 py-1">{item.title}</span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
