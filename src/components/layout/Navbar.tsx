"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MagneticButton from "../ui/MagneticButton";

const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/videos", label: "Films" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div
                    className={cn(
                        "pointer-events-auto flex items-center justify-between px-2 py-2 rounded-full transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl",
                        scrolled ? "w-[90vw] md:w-[600px] h-16" : "w-[95vw] md:w-[800px] h-20"
                    )}
                >
                    {/* Logo Area */}
                    <div className="pl-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                                <span className="font-bold text-xs">L</span>
                            </div>
                            <span className={cn("font-bold tracking-tighter text-white transition-all duration-500 overflow-hidden whitespace-nowrap", scrolled ? "w-0 opacity-0" : "w-auto opacity-100")}>
                                LUMINA
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA / Menu Toggle */}
                    <div className="pr-2 flex items-center gap-2">
                        <MagneticButton>
                            <Link
                                href="/contact"
                                className="px-5 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors rounded-full"
                            >
                                Book
                            </Link>
                        </MagneticButton>
                        <button
                            className="md:hidden text-white p-3 hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[40] flex flex-col items-center justify-center gap-8 pointer-events-auto"
                    >
                        {links.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-bold text-white hover:text-amber-400 transition-colors tracking-tighter"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
