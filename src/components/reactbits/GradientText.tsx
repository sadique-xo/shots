"use client";

import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export function GradientText({
    children,
    className = "",
    colors = ["#a78bfa", "#c084fc", "#818cf8", "#a78bfa"],
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <span className={`relative inline-block ${className}`}>
            {showBorder && (
                <span
                    className="absolute inset-0 rounded-lg z-0 animate-gradient"
                    style={{
                        ...gradientStyle,
                        backgroundSize: "300% 100%",
                        filter: "blur(8px)",
                        opacity: 0.5,
                    }}
                />
            )}
            <span
                className="relative z-10 bg-clip-text text-transparent animate-gradient"
                style={{
                    ...gradientStyle,
                    backgroundSize: "300% 100%",
                }}
            >
                {children}
            </span>
        </span>
    );
}
