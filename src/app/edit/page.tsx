"use client";

import Link from "next/link";
import { ShotEditor } from "@/components/ShotEditor";

export default function EditPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Editor header */}
            <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
                <div className="flex items-center justify-between px-4 lg:px-6 h-14">
                    <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                        <span className="text-primary font-bold text-lg tracking-tight">shots</span>
                        <span className="text-muted-foreground text-sm font-medium">.sadique.co</span>
                    </Link>
                    <div className="hidden md:flex flex-col items-center">
                        <p className="text-xs text-muted-foreground">
                            Upload, style, and export — all in your browser
                        </p>
                    </div>
                    <a
                        href="https://sadique.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                        by <span className="font-medium">Sadique</span>
                    </a>
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
