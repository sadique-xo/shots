"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: "chars" | "words";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    onComplete?: () => void;
}

export function SplitText({
    text,
    className = "",
    delay = 0,
    duration = 0.05,
    ease = "power2.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    onComplete,
}: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll(".split-element");

        gsap.set(elements, from);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        gsap.to(elements, {
                            ...to,
                            duration: 0.6,
                            stagger: duration,
                            delay,
                            ease,
                            onComplete,
                        });
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [text, delay, duration, ease, from, to, threshold, rootMargin, onComplete]);

    const items = splitType === "chars" ? text.split("") : text.split(" ");

    return (
        <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
            {items.map((item, i) => (
                <span
                    key={i}
                    className="split-element inline-block"
                    style={{ whiteSpace: item === " " ? "pre" : "normal" }}
                >
                    {item === " " ? "\u00A0" : item}
                    {splitType === "words" && i < items.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </div>
    );
}
