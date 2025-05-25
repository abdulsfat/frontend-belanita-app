"use client";

import {useParallaxSlider} from "@/app/_hooks";
import {randomId} from "@/app/_utils";
import {Fragment} from "react";
import { motion } from "framer-motion";

export function ParallaxSlider({
                                   children,
                                   repeat = 2,
                                   baseVelocity,
                               }) {
    const x = useParallaxSlider(baseVelocity);

    return (
        <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
            <motion.div style={{ x }}>
                {Array.from({ length: repeat }, () => {
                    const id = randomId();
                    return <Fragment key={id}>{children}</Fragment>;
                })}
            </motion.div>
        </div>
    );
}
