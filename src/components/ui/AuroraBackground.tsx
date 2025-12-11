"use client";

import { motion } from "framer-motion";

export const AuroraBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            {/* Animated Gradients */}
            <div className="absolute inset-0 opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-900/40 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                        x: [0, -100, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        y: [0, 100, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[60vw] bg-emerald-900/20 rounded-full blur-[120px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
