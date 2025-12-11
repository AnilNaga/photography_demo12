"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Counter logic
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500); // Delay before exit
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1; // Random jump
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black cursor-none"
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="relative overflow-hidden">
                        <motion.h1
                            className="text-[15vw] md:text-[20vw] font-bold text-white leading-none tracking-tighter"
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: -200 }}
                        >
                            {count}%
                        </motion.h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
