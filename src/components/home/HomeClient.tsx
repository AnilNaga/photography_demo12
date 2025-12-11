"use client";

import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useVelocity,
    useAnimationFrame,
    useMotionValue
} from "framer-motion";

// New Premium Imports
import { Preloader } from "@/components/ui/Preloader";
import { TiltCard } from "@/components/ui/TiltCard";
import { HorizontalScroll } from "@/components/home/HorizontalScroll";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";

// Utility to wrap value within a range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- COMPONENTS ---

function VelocityText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className="font-bold uppercase text-[9vw] md:text-[8vw] leading-[0.85] tracking-tighter flex flex-nowrap whitespace-nowrap" style={{ x }}>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
            </motion.div>
        </div>
    );
}

interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    category: {
        name: string;
    }
}

export default function HomeClient({ photos }: { photos: Photo[] }) {
    return (
        <main className="bg-black text-white selection:bg-amber-500 selection:text-black">
            <Preloader />
            <Navbar />

            {/* 1. LUXURY HERO */}
            <section className="h-screen w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden px-6 md:px-24 gap-12">
                {/* Typography Side */}
                <div className="flex-1 relative z-20 space-y-8 text-center md:text-left">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 1, duration: 1, ease: [0.2, 1, 0.2, 1] }}
                            className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-tighter mix-blend-difference"
                        >
                            LUMINA
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 1.1, duration: 1, ease: [0.2, 1, 0.2, 1] }}
                            className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-white/60"
                        >
                            Visionary Arts
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex gap-4 justify-center md:justify-start"
                    >
                        <MagneticButton>
                            <Link href="/gallery" className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-400 transition-colors flex items-center gap-2">
                                View Portfolio <ArrowRight size={14} />
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>

                {/* 3D Visual Side */}
                <div className="flex-1 relative z-20 flex justify-center">
                    <TiltCard />
                </div>

                {/* Background Gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* 2. VELOCITY MARQUEE DIVIDER */}
            <section className="py-24 border-y border-white/5 bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
                <VelocityText baseVelocity={-2}>CINEMATOGRAPHY — EDITORIAL — FASHION — </VelocityText>
            </section>

            {/* 3. HORIZONTAL SCROLL GALLERY */}
            <HorizontalScroll photos={photos} />

            {/* 4. FOOTER REMOVED (Global Footer Used) */}
        </main>
    );
}
