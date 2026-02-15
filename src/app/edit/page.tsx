"use client";

import Link from "next/link";
import { ShotEditor } from "@/components/ShotEditor";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Aperture } from "lucide-react";

export default function EditPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Editor header */}
            <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
                <div className="flex items-center justify-between px-4 lg:px-6 h-14">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="text-primary font-bold text-lg tracking-tight">shots</span>
                        <Aperture className="w-5 h-5 text-primary" />
                    </Link>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block text-center">
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                            Upload, style, and export • all in your browser (by{" "}
                            <a
                                href="https://sadique.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium hover:text-primary transition-colors"
                            >
                                Sadique
                            </a>
                            )
                        </p>
                    </div>
                    <div className="ml-4 pl-4 border-l border-border/50">
                        <AnimatedThemeToggler />
                    </div>
                </div>
            </header>

            {/* Editor */}
            <div className="flex-1">
                <ShotEditor />
            </div>

            {/* Footer */}
            <footer className="border-t border-border px-4 py-3 bg-card/30">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        Built by{" "}
                        <a
                            href="https://sadique.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                        >
                            Sadique
                        </a>
                    </span>
                    <span>Free tool — part of the{" "}
                        <a
                            href="https://sadique.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Sadique
                        </a>
                        {" "}design ecosystem
                    </span>
                </div>
            </footer>
        </div>
    );
}
