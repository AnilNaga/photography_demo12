"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

interface Category {
    id: string;
    name: string;
}

interface Video {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string;
    categoryId: string;
}

interface VideosClientProps {
    videos: Video[];
    categories: Category[];
}

export default function VideosClient({ videos, categories }: VideosClientProps) {
    const [filter, setFilter] = useState("all");
    const [playingId, setPlayingId] = useState<string | null>(null);

    const filteredVideos = filter === "all"
        ? videos
        : videos.filter(v => v.categoryId === filter);

    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-white/10 pb-8">
                <div className="space-y-4">
                    <TextReveal>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            CINEMA
                        </h1>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <p className="text-white/60 max-w-md tracking-wider">
                            Visual storytelling in motion. 4K high-fidelity playback.
                        </p>
                    </TextReveal>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                    <MagneticButton>
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${filter === "all"
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/50 border-white/10 hover:border-white hover:text-white"
                                }`}
                        >
                            All Films
                        </button>
                    </MagneticButton>
                    {categories.map((cat) => (
                        <MagneticButton key={cat.id}>
                            <button
                                onClick={() => setFilter(cat.id)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${filter === cat.id
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-white/50 border-white/10 hover:border-white hover:text-white"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        </MagneticButton>
                    ))}
                </div>
            </div>

            {/* Video Grid */}
            <div className="space-y-32">
                <AnimatePresence mode="wait">
                    {filteredVideos.map((video, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 1, 0.2, 1] }}
                            key={video.id}
                            className="group"
                        >
                            {/* Player Container */}
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-white/10 shadow-2xl">
                                <video
                                    src={video.videoUrl}
                                    controls={playingId === video.id}
                                    className="w-full h-full object-cover"
                                    onPlay={() => setPlayingId(video.id)}
                                    muted={playingId !== video.id} // Auto-mute when not fully active could be cool, but manual play is safer
                                />

                                {/* Custom Overlay Play Button */}
                                {playingId !== video.id && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-none"
                                        onClick={() => {
                                            const v = document.querySelector(`video[src="${video.videoUrl}"]`) as HTMLVideoElement;
                                            v?.play();
                                            setPlayingId(video.id);
                                        }}
                                    >
                                        <div className="relative">
                                            {/* Pulse Effect */}
                                            <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping blur-xl" />
                                            <motion.div
                                                whileHover={{ scale: 1.2 }}
                                                className="relative w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center transition-transform duration-500"
                                            >
                                                <Play fill="white" className="text-white ml-2" size={40} />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info Section */}
                            <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-2 border-amber-500 pl-6">
                                <div>
                                    <TextReveal delay={0.2}>
                                        <h3 className="text-3xl font-bold uppercase tracking-wide text-white mb-2">{video.title}</h3>
                                    </TextReveal>
                                    {video.description && (
                                        <TextReveal delay={0.3}>
                                            <p className="text-white/50 text-lg font-light leading-relaxed max-w-2xl">{video.description}</p>
                                        </TextReveal>
                                    )}
                                </div>
                                <MagneticButton>
                                    <div className="text-amber-500 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-amber-500/30 rounded-full hover:bg-amber-500/10 transition-colors">
                                        4K Cinema
                                    </div>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredVideos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-white/30 space-y-4">
                    <p className="text-2xl font-light">No films available in this category.</p>
                </div>
            )}
        </div>
    );
}
