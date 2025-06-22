"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FadeInSection({
                                          children,
                                          delay = 0.2,
                                          direction = "up"
                                      }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    useEffect(() => {
        if (inView) controls.start("visible");
    }, [inView, controls]);

    const getVariants = () => {
        const offset = 50;
        const directions = {
            up: { y: offset, x: 0 },
            down: { y: -offset, x: 0 },
            left: { x: offset, y: 0 },
            right: { x: -offset, y: 0 },
        };

        return {
            hidden: {
                opacity: 0,
                ...directions[direction],
            },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.6, delay },
            },
        };
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={getVariants()}
        >
            {children}
        </motion.div>
    );
}
