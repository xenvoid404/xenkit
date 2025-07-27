import type { Metadata } from 'next';
import { FiGithub, FiMail, FiTwitter, FiLinkedin, FiCode } from 'react-icons/fi';
import { 
    SiNextdotjs, 
    SiReact, 
    SiTypescript, 
    SiTailwindcss, 
    SiNodedotjs,
    SiVercel,
    SiGit
} from 'react-icons/si';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Xenvoid and the technologies behind Xenkit - a modern developer toolkit.',
    keywords: ['about', 'developer', 'Xenvoid', 'Xenkit', 'web development', 'technologies'],
    openGraph: {
        title: 'About | Xenkit',
        description: 'Learn more about Xenvoid and the technologies behind Xenkit - a modern developer toolkit.',
        type: 'website',
        images: ['/og-image.png']
    }
};

const techStack = [
    { name: 'Next.js', icon: SiNextdotjs, description: 'React framework for production' },
    { name: 'React', icon: SiReact, description: 'JavaScript library for building user interfaces' },
    { name: 'TypeScript', icon: SiTypescript, description: 'JavaScript with syntax for types' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, description: 'Utility-first CSS framework' },
    { name: 'Node.js', icon: SiNodedotjs, description: 'JavaScript runtime built on Chrome\'s V8' },
    { name: 'Vercel', icon: SiVercel, description: 'Platform for frontend frameworks and static sites' },
    { name: 'Git', icon: SiGit, description: 'Distributed version control system' },
    { name: 'VS Code', icon: FiCode, description: 'Source-code editor made by Microsoft' }
];

const socialLinks = [
    { name: 'GitHub', icon: FiGithub, url: 'https://github.com/xenvoid404', username: '@xenvoid404' },
    { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com/xenvoid404', username: '@xenvoid404' },
    { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com/in/xenvoid404', username: 'xenvoid404' },
    { name: 'Email', icon: FiMail, url: 'mailto:xenvoid404@gmail.com', username: 'xenvoid404@gmail.com' }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="mb-8">
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary p-1 animate-scale-in animation-delay-150">
                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold text-gradient-primary">
                                X
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up animation-delay-300">
                            Tentang <span className="text-gradient-primary">Xenvoid</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
                            Seorang developer yang bersemangat dalam membangun tools yang berguna untuk komunitas developer
                        </p>
                    </div>
                </div>

                {/* About Me Section */}
                <section className="mb-16 animate-fade-in-up animation-delay-700">
                    <div className="bg-background/60 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-primary rounded-full"></span>
                            Tentang Saya
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Halo! Saya <strong className="text-foreground">Xenvoid</strong>, seorang developer yang memiliki passion 
                                dalam menciptakan solusi digital yang elegant dan fungsional. Dengan pengalaman dalam web development, 
                                saya senang membangun tools yang dapat membantu produktivitas developer lain.
                            </p>
                            <p>
                                Saya percaya bahwa teknologi harus mudah diakses dan digunakan. Itulah mengapa saya membuat Xenkit - 
                                sebuah toolkit yang menyediakan berbagai utility yang sering dibutuhkan developer dalam satu tempat 
                                yang nyaman dan modern.
                            </p>
                            <p>
                                Ketika tidak sedang coding, saya senang mempelajari teknologi baru, berkontribusi ke open source, 
                                dan berbagi pengetahuan dengan komunitas developer.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Project Section */}
                <section className="mb-16 animate-fade-in-up animation-delay-900">
                    <div className="bg-background/60 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-secondary rounded-full"></span>
                            Tentang Xenkit
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                <strong className="text-foreground">Xenkit</strong> adalah toolkit modern yang dirancang khusus 
                                untuk developer. Proyek ini lahir dari kebutuhan pribadi saya akan tools yang cepat, mudah digunakan, 
                                dan tidak perlu instalasi.
                            </p>
                            <p>
                                Xenkit menyediakan berbagai utility seperti:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
                                <li className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    Password Generator
                                </li>
                                <li className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    Base64 Encoder/Decoder
                                </li>
                                <li className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    UUID Generator
                                </li>
                                <li className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    Hash Generator
                                </li>
                                <li className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    JWT Builder/Decoder
                                </li>
                                <li className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    RSA Key Generator
                                </li>
                            </ul>
                            <p>
                                Semua tools dirancang dengan perhatian pada user experience, performance, dan keamanan. 
                                Xenkit sepenuhnya berjalan di client-side, memastikan data Anda tetap privat dan aman.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="mb-16 animate-fade-in-up animation-delay-1000">
                    <div className="bg-background/60 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-primary rounded-full"></span>
                            Teknologi yang Digunakan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techStack.map((tech, index) => (
                                <div 
                                    key={tech.name}
                                    className="group bg-muted/30 hover:bg-muted/50 border border-border hover:border-primary/30 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
                                    style={{ animationDelay: `${1200 + (index * 100)}ms` }}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <tech.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                        <h3 className="font-semibold text-foreground">{tech.name}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl">
                            <p className="text-center text-muted-foreground">
                                Dibangun dengan teknologi modern untuk performa dan developer experience yang optimal
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="animate-fade-in-up animation-delay-1500">
                    <div className="bg-background/60 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-secondary rounded-full"></span>
                            Mari Terhubung
                        </h2>
                        <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
                            Saya selalu terbuka untuk diskusi tentang teknologi, kolaborasi proyek, atau sekadar sharing pengalaman. 
                            Jangan ragu untuk menghubungi saya!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 p-4 bg-muted/30 hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
                                    style={{ animationDelay: `${1700 + (index * 100)}ms` }}
                                >
                                    <social.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <div className="font-medium text-foreground">{social.name}</div>
                                        <div className="text-sm text-muted-foreground">{social.username}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}