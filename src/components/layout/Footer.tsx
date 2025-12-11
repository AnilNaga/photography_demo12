"use client";

import Link from "next/link";
import { MoveUpRight, Instagram, Twitter, Linkedin, Facebook, ArrowUp } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-zinc-950 text-white border-t border-white/10 pt-24 pb-12 px-6 md:px-12 relative z-10 overflow-hidden">
            <div className="max-w-[1920px] mx-auto">
                {/* 1. Main Call to Action */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
                    <div className="max-w-2xl">
                        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Let's Talk
                        </h2>
                        <p className="text-xl md:text-2xl text-white/60 font-light max-w-lg">
                            Have a visionary project? I'm currently open for new commissions and collaborations.
                        </p>
                    </div>
                    <div className="items-end">
                        <MagneticButton>
                            <Link
                                href="/contact"
                                className="group flex items-center gap-4 px-8 py-12 bg-white text-black rounded-full hover:bg-amber-400 transition-all duration-500"
                            >
                                <span className="text-xl font-bold uppercase tracking-widest">Start Project</span>
                                <MoveUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>

                {/* 2. Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-24">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-tighter">LUMINA STUDIO</h3>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Crafting digital experiences and freezing moments in time. Based in New York, working globally.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Sitemap</h4>
                        {["Home", "Gallery", "Films", "Services", "About", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-lg text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Socials</h4>
                        {[
                            { name: "Instagram", icon: Instagram, href: "#" },
                            { name: "Twitter", icon: Twitter, href: "#" },
                            { name: "LinkedIn", icon: Linkedin, href: "#" },
                            { name: "Facebook", icon: Facebook, href: "#" },
                        ].map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                className="flex items-center gap-2 text-lg text-white/70 hover:text-amber-400 transition-colors duration-300"
                            >
                                <social.icon size={18} />
                                {social.name}
                            </Link>
                        ))}
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Legal</h4>
                        <Link href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-white/60 hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>

                {/* 3. Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
                    <p className="text-white/20 text-xs uppercase tracking-widest">
                        © 2024 Lumina Studio. All Rights Reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group"
                    >
                        Back to Top
                        <div className="p-2 rounded-full border border-white/20 group-hover:border-white transition-colors text-white">
                            <ArrowUp size={12} />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
}
