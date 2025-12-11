"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* The Trail Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border-2 border-amber-500 rounded-full pointer-events-none z-[9999]"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            />
            {/* The Dot (Direct Follow) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999]"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: 12, // Offset to center in ring (32/2 - 4/2 = 14 approx, let's adjust visually)
                    y: 12
                }}
            />
        </>
    );
}
