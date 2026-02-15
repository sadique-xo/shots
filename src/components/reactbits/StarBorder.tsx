"use client";

import { ReactNode } from "react";

interface StarBorderProps {
    children: ReactNode;
    className?: string;
    color?: string;
    speed?: string;
    onClick?: () => void;
}

export function StarBorder({
    children,
    className = "",
    color = "white",
    speed = "6s",
    onClick,
}: StarBorderProps) {
    return (
        <button
            onClick={onClick}
            className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-medium transition-all hover:scale-105 ${className}`}
            style={{
                background: "transparent",
            }}
        >
            {/* Animated border */}
            <span
                className="absolute inset-0 rounded-full animate-star-border"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${color} 10%, transparent 20%)`,
                    animationDuration: speed,
                }}
            />
            {/* Inner background */}
            <span className="absolute inset-[1.5px] rounded-full bg-background z-10" />
            {/* Content */}
            <span className="relative z-20">{children}</span>
        </button>
    );
}
