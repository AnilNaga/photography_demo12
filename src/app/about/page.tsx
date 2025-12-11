import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import { Camera, Award, Globe, Heart } from "lucide-react";
import prisma from "@/lib/prisma";
import { TextReveal } from "@/components/ui/TextReveal";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const profile = await prisma.profile.findFirst();

    // Fallbacks
    const coverImage = profile?.coverImageUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop";
    const profileImage = profile?.imageUrl || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop";
    const headline = profile?.headline || "Behind the Lens";
    const bio = profile?.bio || "I am a passionate photographer with over 10 years of experience...";

    return (
        <main className="min-h-screen bg-black text-white pb-20 selection:bg-amber-500 selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

                {/* Parallax-ish static image for server component */}
                <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-30 text-center max-w-4xl px-6">
                    <TextReveal>
                        <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter text-white mix-blend-difference">{headline}</h1>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-serif italic">
                            "Capturing the raw beauty of the world, one frame at a time."
                        </p>
                    </TextReveal>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8 order-2 md:order-1">
                        <div>
                            <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">The Photographer</p>
                            <h2 className="text-5xl font-bold text-white mb-8">Hello, I'm Lumina.</h2>
                        </div>
                        <p className="text-white/60 leading-loose text-lg whitespace-pre-wrap font-light">
                            {bio}
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                            {[
                                { icon: Camera, label: "500+", sub: "Shoots Completed" },
                                { icon: Award, label: "15", sub: "Awards Won" },
                                { icon: Globe, label: "20+", sub: "Countries Visited" },
                                { icon: Heart, label: "100%", sub: "Happy Clients" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-full bg-white/5 text-white/50 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-2xl tracking-tighter">{stat.label}</div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative order-1 md:order-2">
                        <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10">
                            <div className="absolute inset-0 bg-amber-500 mixed-blend-overlay opacity-0 hover:opacity-20 transition-opacity z-10" />
                            <Image
                                src={profileImage}
                                alt="Profile Portrait"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 hover:scale-105"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 border border-white/10 -z-10 hidden md:block" />
                    </div>
                </div>
            </section>
        </main>
    );
}
