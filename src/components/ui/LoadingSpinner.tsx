"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border border-white/10 rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Middle Rotating Ring */}
                <motion.div
                    className="absolute w-16 h-16 border-t-2 border-amber-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Pulse */}
                <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="mt-8 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="text-xs font-bold tracking-[0.3em] uppercase text-white/40">Loading</div>
                <div className="text-sm font-bold tracking-[0.2em] uppercase text-white">LUMINA STUDIO</div>
            </motion.div>
        </div>
    );
}
