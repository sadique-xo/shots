"use client";

import { useEffect, useRef, useState } from "react";

interface DecryptedTextProps {
    text: string;
    className?: string;
    speed?: number;
    maxIterations?: number;
    characters?: string;
    revealDirection?: "start" | "end" | "center";
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: "view" | "hover";
}

export function DecryptedText({
    text,
    className = "",
    speed = 50,
    maxIterations = 10,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    revealDirection = "start",
    parentClassName = "",
    encryptedClassName = "text-muted-foreground",
    animateOn = "view",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    const getRandomChar = () =>
        characters[Math.floor(Math.random() * characters.length)];

    const animate = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";

                        let revealIndex: number;
                        switch (revealDirection) {
                            case "end":
                                revealIndex = text.length - 1 - index;
                                break;
                            case "center":
                                revealIndex = Math.abs(Math.floor(text.length / 2) - index);
                                break;
                            default:
                                revealIndex = index;
                        }

                        if (revealIndex < iteration) return char;
                        return getRandomChar();
                    })
                    .join("")
            );

            iteration += 1 / maxIterations;

            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
                setIsAnimating(false);
                setHasAnimated(true);
            }
        }, speed);
    };

    useEffect(() => {
        if (animateOn !== "view") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        animate();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateOn, hasAnimated]);

    return (
        <span
            ref={containerRef}
            className={`inline-block ${parentClassName}`}
            onMouseEnter={animateOn === "hover" ? animate : undefined}
        >
            <span className={`font-mono ${isAnimating && !hasAnimated ? encryptedClassName : className}`}>
                {displayText}
            </span>
        </span>
    );
}
