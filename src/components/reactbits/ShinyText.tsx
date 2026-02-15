"use client";

import { ReactNode } from "react";

interface ShinyTextProps {
    children: ReactNode;
    className?: string;
    shimmerWidth?: number;
    speed?: number;
}

export function ShinyText({
    children,
    className = "",
    shimmerWidth = 100,
    speed = 3,
}: ShinyTextProps) {
    return (
        <span
            className={`inline-block bg-clip-text text-transparent animate-shiny-text ${className}`}
            style={{
                backgroundImage: `linear-gradient(
          120deg,
          rgba(255 255 255 / 0.4) 0%,
          rgba(255 255 255 / 0.8) ${shimmerWidth / 3}%,
          rgba(255 255 255 / 0.4) ${shimmerWidth}%,
          rgba(255 255 255 / 0.4) 100%
        )`,
                backgroundSize: "200% 100%",
                animationDuration: `${speed}s`,
            }}
        >
            {children}
        </span>
    );
}
