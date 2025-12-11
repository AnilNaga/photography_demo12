"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export const TextReveal = ({ children, width = "fit-content", delay = 0, className = "" }: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { y: "100%", opacity: 0, rotateX: 20 },
                    visible: { y: 0, opacity: 1, rotateX: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
                style={{ transformOrigin: "top left" }}
            >
                {children}
            </motion.div>
        </div>
    );
};
