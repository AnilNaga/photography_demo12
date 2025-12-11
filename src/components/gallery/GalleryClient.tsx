"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

interface Category {
    id: string;
    name: string;
}

interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    category: {
        name: string;
    }
}

interface GalleryClientProps {
    initialPhotos: Photo[];
    categories: Category[];
}

// Helper to chunk array into n columns
const chunkArray = (arr: Photo[], n: number) => {
    const chunks: Photo[][] = Array.from({ length: n }, () => []);
    arr.forEach((item, i) => chunks[i % n].push(item));
    return chunks;
};

import { useSearchParams } from "next/navigation";

export default function GalleryClient({ initialPhotos, categories }: GalleryClientProps) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";

    const [filter, setFilter] = useState(initialCategory);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    // Filter Logic
    const filteredPhotos = filter === "All"
        ? initialPhotos
        : initialPhotos.filter(p => p.category.name === filter);

    // Navigation Logic
    const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) : -1;

    const navigate = (direction: "next" | "prev") => {
        if (!selectedPhoto || currentIndex === -1) return;
        const newIndex = direction === "next"
            ? (currentIndex + 1) % filteredPhotos.length
            : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[newIndex]);
    };

    // Keyboard Support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedPhoto) return;
            if (e.key === "ArrowRight") navigate("next");
            if (e.key === "ArrowLeft") navigate("prev");
            if (e.key === "Escape") setSelectedPhoto(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedPhoto, currentIndex]);

    // Parallax Scroll Logic
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Faster middle column (if 3)
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Distribute photos into columns (Client-side mainly, responsive logic simplified for demo)
    // For simplicity, we assume 3 columns on desktop.
    // In a real responsive app, we'd need a hook to detect window size and re-chunk.
    // We will render standard grid on mobile and parallax on desktop.
    const columns = chunkArray(filteredPhotos, 3);

    return (
        <div ref={ref} className="pt-32 px-4 md:px-12 max-w-[1920px] mx-auto min-h-[150vh] pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 border-b border-white/10 pb-8 sticky top-0 z-40 bg-black/50 backdrop-blur-md py-6">
                <div>
                    <TextReveal>
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-2 mix-blend-difference">
                            PORTFOLIO
                        </h1>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <p className="text-white/50 text-sm md:text-lg uppercase tracking-[0.4em]">Curated Collection</p>
                    </TextReveal>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                    <MagneticButton>
                        <button
                            onClick={() => setFilter("All")}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${filter === "All"
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/60 border-white/10 hover:border-white hover:text-white"
                                }`}
                        >
                            All Works
                        </button>
                    </MagneticButton>
                    {categories.map(cat => (
                        <MagneticButton key={cat.id}>
                            <button
                                onClick={() => setFilter(cat.name)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${filter === cat.name
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-white/60 border-white/10 hover:border-white hover:text-white"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        </MagneticButton>
                    ))}
                </div>
            </div>

            {/* Parallax Grid (Desktop) */}
            <div className="hidden md:grid grid-cols-3 gap-8 items-start">
                <Column photos={columns[0]} y={y1} setSelectedPhoto={setSelectedPhoto} />
                <Column photos={columns[1]} y={y2} setSelectedPhoto={setSelectedPhoto} className="mt-24" /> {/* Offset start */}
                <Column photos={columns[2]} y={y3} setSelectedPhoto={setSelectedPhoto} />
            </div>

            {/* Mobile Grid (Simple) */}
            <div className="md:hidden flex flex-col gap-8">
                {filteredPhotos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} onClick={() => setSelectedPhoto(photo)} />
                ))}
            </div>


            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-default"
                    >
                        {/* Navigation - Left */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
                            className="absolute left-8 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block"
                        >
                            <ChevronLeft size={64} strokeWidth={1} />
                        </button>

                        {/* Navigation - Right */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate("next"); }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block"
                        >
                            <ChevronRight size={64} strokeWidth={1} />
                        </button>

                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 flex items-center gap-2 group"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                            <X size={48} strokeWidth={1} />
                        </button>

                        <motion.div
                            layoutId={`photo-${selectedPhoto.id}`}
                            className="relative w-full h-full flex flex-col items-center justify-center"
                        >
                            <div className="relative w-full h-[80vh]">
                                <Image
                                    src={selectedPhoto.imageUrl}
                                    alt={selectedPhoto.title}
                                    fill
                                    className="object-contain"
                                    priority
                                    quality={100}
                                />
                            </div>

                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h2 className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-white/80 to-white">{selectedPhoto.title}</h2>
                                    <p className="text-amber-500 text-sm font-bold uppercase tracking-[0.3em] mt-2">{selectedPhoto.category.name} — 2024</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Column({ photos, y, setSelectedPhoto, className = "" }: { photos: Photo[], y: any, setSelectedPhoto: any, className?: string }) {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-8 ${className}`}>
            {photos.map(photo => (
                <PhotoCard key={photo.id} photo={photo} onClick={() => setSelectedPhoto(photo)} />
            ))}
        </motion.div>
    );
}

function PhotoCard({ photo, onClick }: { photo: Photo, onClick: () => void }) {
    return (
        <motion.div
            layoutId={`photo-${photo.id}`}
            className="relative group cursor-none rounded-sm overflow-hidden" // Removed aspect-ratio
            onClick={onClick}
        >
            <div className="relative">
                <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" // h-auto uses intrinsic height
                />

                {/* Premium Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 bg-[length:200%_200%] animate-shine pointer-events-none transition-opacity duration-700" />

                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.title}</h3>
                    <div className="h-[1px] w-0 group-hover:w-full bg-amber-500 transition-all duration-700 delay-100 mt-2" />
                    <div className="flex justify-between items-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        <span className="text-xs font-medium uppercase tracking-widest text-white/70">{photo.category.name}</span>
                        <ArrowUpRight size={16} className="text-amber-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
