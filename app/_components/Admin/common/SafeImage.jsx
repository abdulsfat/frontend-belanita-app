"use client";
import { useState } from "react";
import Image from "next/image";

export default function SafeImage({ src, alt, fill, width, height, ...props }) {
    const [error, setError] = useState(false);

    const finalSrc = error ? "/fallbacks/missing.png" : src;

    return (
        <Image
            src={finalSrc}
            alt={alt}
            fill={fill}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            onError={() => setError(true)}
            sizes={fill ? "(max-width: 768px) 100vw, 33vw" : undefined}
            {...props}
        />
    );
}
