"use client";

import { DeviceFrame } from "@/lib/presets";
import { ReactNode } from "react";

interface FrameRendererProps {
    frame: DeviceFrame;
    children: ReactNode;
}

function BrowserFrame({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col rounded-lg overflow-hidden shadow-lg" style={{ background: '#1e1e1e' }}>
            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#2d2d2d' }}>
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                </div>
                {/* URL bar */}
                <div className="flex-1 ml-3">
                    <div
                        className="rounded-md px-3 py-1 text-xs flex items-center"
                        style={{ background: '#1a1a1a', color: '#888' }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 opacity-50">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        yoursite.com
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="relative overflow-hidden">
                {children}
            </div>
        </div>
    );
}

function PhoneFrame({ children }: { children: ReactNode }) {
    return (
        <div
            className="relative rounded-[40px] overflow-hidden p-3"
            style={{
                background: "#1a1a1a",
                boxShadow: "inset 0 0 0 2px #333, 0 0 0 1px #000",
            }}
        >
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                <div
                    className="rounded-full"
                    style={{
                        width: "90px",
                        height: "25px",
                        background: "#000",
                    }}
                />
            </div>
            {/* Screen */}
            <div className="relative rounded-[28px] overflow-hidden">
                {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center mt-2">
                <div
                    className="rounded-full"
                    style={{
                        width: "100px",
                        height: "4px",
                        background: "#666",
                    }}
                />
            </div>
        </div>
    );
}

function TabletFrame({ children }: { children: ReactNode }) {
    return (
        <div
            className="relative rounded-[20px] overflow-hidden p-4"
            style={{
                background: "#1a1a1a",
                boxShadow: "inset 0 0 0 2px #333, 0 0 0 1px #000",
            }}
        >
            {/* Camera dot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                <div
                    className="rounded-full"
                    style={{
                        width: "6px",
                        height: "6px",
                        background: "#333",
                    }}
                />
            </div>
            {/* Screen */}
            <div className="relative rounded-[8px] overflow-hidden">
                {children}
            </div>
        </div>
    );
}

function LaptopFrame({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center">
            {/* Screen */}
            <div
                className="relative rounded-t-[12px] overflow-hidden p-2"
                style={{
                    background: "#1a1a1a",
                    boxShadow: "inset 0 0 0 2px #333",
                }}
            >
                {/* Camera */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
                    <div className="rounded-full" style={{ width: "4px", height: "4px", background: "#333" }} />
                </div>
                <div className="relative rounded-[4px] overflow-hidden">
                    {children}
                </div>
            </div>
            {/* Keyboard wedge */}
            <div
                style={{
                    width: "110%",
                    height: "12px",
                    background: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)",
                    borderRadius: "0 0 8px 8px",
                    borderTop: "1px solid #444",
                }}
            />
            {/* Base line */}
            <div
                style={{
                    width: "40%",
                    height: "3px",
                    background: "#333",
                    borderRadius: "0 0 4px 4px",
                }}
            />
        </div>
    );
}

export function FrameRenderer({ frame, children }: FrameRendererProps) {
    switch (frame) {
        case "browser":
            return <BrowserFrame>{children}</BrowserFrame>;
        case "phone":
            return <PhoneFrame>{children}</PhoneFrame>;
        case "tablet":
            return <TabletFrame>{children}</TabletFrame>;
        case "laptop":
            return <LaptopFrame>{children}</LaptopFrame>;
        case "none":
        default:
            return <>{children}</>;
    }
}
