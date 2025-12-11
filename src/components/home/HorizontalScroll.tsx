"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    category: {
        name: string;
    }
}

export const HorizontalScroll = ({ photos }: { photos: Photo[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    // Fallback if no photos
    if (!photos || photos.length === 0) return null;

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
                    {/* Title Card */}
                    <div className="h-[50vh] w-[400px] flex flex-col justify-center shrink-0">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                            SELECTED<br />WORKS
                        </h2>
                        <div className="h-1 w-24 bg-amber-500" />
                        <p className="mt-6 text-white/50 max-w-xs">
                            A showcase of technical precision and artistic vision. Scroll to explore the gallery.
                        </p>
                    </div>

                    {/* Gallery Items */}
                    {photos.map((item) => (
                        <Link key={item.id} href={`/gallery?category=${item.category.name}`}>
                            <div className="group relative h-[60vh] w-[40vw] md:w-[30vw] shrink-0 overflow-hidden bg-white/5 cursor-none">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-xs uppercase tracking-widest text-amber-500 mb-2">{item.category.name}</p>
                                    <h3 className="text-4xl font-serif italic text-white line-clamp-1">{item.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
