"use client";

import { BackgroundType, PatternType } from "@/lib/presets";

interface BackgroundRendererProps {
    type: BackgroundType;
    solidColor: string;
    gradientColors: string[];
    gradientAngle: number;
    meshColors: string[];
    patternType: PatternType;
    patternColor: string;
    patternBgColor: string;
    noiseOpacity: number;
}

function getPatternSVG(type: PatternType, color: string): string {
    const c = encodeURIComponent(color);
    switch (type) {
        case "dots":
            return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1.5" fill="${c}" opacity="0.4"/></svg>`;
        case "grid":
            return `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.3"/></svg>`;
        case "diagonal":
            return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="20" x2="20" y2="0" stroke="${c}" stroke-width="0.5" opacity="0.3"/></svg>`;
        case "circles":
            return `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="20" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.2"/></svg>`;
        case "topography":
            return `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><path d="M0 40 Q20 20 40 40 Q60 60 80 40" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.2"/><path d="M0 60 Q20 40 40 60 Q60 80 80 60" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.15"/><path d="M0 20 Q20 0 40 20 Q60 40 80 20" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.15"/></svg>`;
        case "waves":
            return `<svg width="80" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20 Q10 10 20 20 Q30 30 40 20 Q50 10 60 20 Q70 30 80 20" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.25"/></svg>`;
        default:
            return "";
    }
}

export function BackgroundRenderer({
    type,
    solidColor,
    gradientColors,
    gradientAngle,
    meshColors,
    patternType,
    patternColor,
    patternBgColor,
    noiseOpacity,
}: BackgroundRendererProps) {
    const getBackgroundStyle = (): React.CSSProperties => {
        switch (type) {
            case "solid":
                return { backgroundColor: solidColor };

            case "linear-gradient": {
                const stops = gradientColors
                    .map((c, i) => `${c} ${(i / (gradientColors.length - 1)) * 100}%`)
                    .join(", ");
                return { background: `linear-gradient(${gradientAngle}deg, ${stops})` };
            }

            case "radial-gradient": {
                const stops = gradientColors
                    .map((c, i) => `${c} ${(i / (gradientColors.length - 1)) * 100}%`)
                    .join(", ");
                return { background: `radial-gradient(ellipse at center, ${stops})` };
            }

            case "mesh-gradient":
                return { backgroundColor: meshColors[0] || "#000" };

            case "pattern":
                return { backgroundColor: patternBgColor };

            case "noise":
                return {
                    background: `linear-gradient(${gradientAngle}deg, ${gradientColors[0] || "#6366f1"}, ${gradientColors[1] || "#8b5cf6"})`,
                };

            default:
                return { backgroundColor: "#6366f1" };
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden" style={getBackgroundStyle()}>
            {/* Mesh gradient blobs */}
            {type === "mesh-gradient" && (
                <>
                    {meshColors.map((color, i) => {
                        const positions = [
                            { top: "10%", left: "15%" },
                            { top: "60%", left: "70%" },
                            { top: "20%", left: "65%" },
                            { top: "65%", left: "20%" },
                        ];
                        const pos = positions[i % positions.length];
                        return (
                            <div
                                key={i}
                                className="absolute rounded-full blur-[80px] opacity-70"
                                style={{
                                    backgroundColor: color,
                                    width: "50%",
                                    height: "50%",
                                    top: pos.top,
                                    left: pos.left,
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        );
                    })}
                </>
            )}

            {/* SVG pattern overlay */}
            {type === "pattern" && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,${getPatternSVG(patternType, patternColor)}")`,
                        backgroundRepeat: "repeat",
                    }}
                />
            )}

            {/* Noise overlay */}
            {type === "noise" && (
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: noiseOpacity }}>
                    <filter id="noise">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.65"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            )}
        </div>
    );
}
