"use client";

import Link from "next/link";
import Waves from "@/components/reactbits/Waves";
import { GradientText } from "@/components/reactbits/GradientText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { StarBorder } from "@/components/reactbits/StarBorder";
import { SplitText } from "@/components/reactbits/SplitText";

export function LandingPage() {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#09090b]">
            {/* Waves background — covers entire hero */}
            <div className="absolute inset-0 z-0">
                <Waves
                    lineColor="rgba(167, 139, 250, 0.15)"
                    backgroundColor="transparent"
                    waveSpeedX={0.015}
                    waveSpeedY={0.005}
                    waveAmpX={40}
                    waveAmpY={20}
                    xGap={12}
                    yGap={36}
                    friction={0.9}
                    tension={0.005}
                    maxCursorMove={120}
                />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(26,5,51,0.8) 0%, transparent 60%)"
                }} />
                <div className="absolute inset-0" style={{
                    background: "linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.4) 50%, rgba(9,9,11,0.9) 100%)"
                }} />
            </div>

            {/* Nav */}
            <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
                <div className="flex items-center gap-1.5">
                    <GradientText
                        colors={["#a78bfa", "#c084fc", "#818cf8", "#a78bfa"]}
                        animationSpeed={6}
                        className="text-xl font-bold tracking-tight"
                    >
                        shots
                    </GradientText>
                    <span className="text-muted-foreground/60 text-sm font-medium">.sadique.co</span>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="https://sadique.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
                    >
                        by <span className="text-primary font-medium">Sadique</span>
                    </a>
                    <Link
                        href="/edit"
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Open Editor →
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
                {/* Badge */}
                <div className="mb-8 animate-slide-up" style={{ opacity: 0 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card/20 backdrop-blur-sm text-xs text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        100% free · No signup · Works in your browser
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl">
                    <SplitText
                        text="Make your screenshots"
                        className="justify-center"
                        delay={0.1}
                        duration={0.03}
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                    <br />
                    <span className="mt-2 block">
                        <GradientText
                            colors={["#a78bfa", "#c084fc", "#f0abfc", "#818cf8", "#a78bfa"]}
                            animationSpeed={5}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                        >
                            look incredible
                        </GradientText>
                    </span>
                </h1>

                {/* Subtitle */}
                <div className="mt-6 animate-slide-up animation-delay-400" style={{ opacity: 0 }}>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        <ShinyText speed={4} shimmerWidth={120}>
                            Drop in your screenshot, pick a background style, add device frames, and export pixel-perfect mockups for Dribbble, Behance, or social media.
                        </ShinyText>
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-slide-up animation-delay-600" style={{ opacity: 0 }}>
                    <Link href="/edit">
                        <StarBorder
                            color="#a78bfa"
                            speed="4s"
                            className="text-base font-semibold text-foreground"
                        >
                            <span className="flex items-center gap-2">
                                Start Creating
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </StarBorder>
                    </Link>
                    <span className="text-xs text-muted-foreground/60">
                        No downloads · No watermarks · Unlimited exports
                    </span>
                </div>
            </main>

            {/* How It Works section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">
                        <DecryptedText
                            text="Three steps. Zero friction."
                            className="text-2xl sm:text-3xl font-bold text-foreground"
                            speed={30}
                            maxIterations={8}
                        />
                    </h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
                        Go from raw screenshot to portfolio-ready shot in under a minute.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "01",
                                icon: "📸",
                                title: "Upload",
                                desc: "Drag and drop your screenshot or paste from clipboard. Supports PNG, JPG, and WebP.",
                            },
                            {
                                step: "02",
                                icon: "🎨",
                                title: "Style",
                                desc: "Choose from gradients, solids, mesh, noise, or pattern backgrounds. Add device frames and 3D perspective.",
                            },
                            {
                                step: "03",
                                icon: "⬇️",
                                title: "Export",
                                desc: "Download pixel-perfect PNGs sized for Dribbble, Behance, Twitter, Instagram, or custom dimensions.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-6 rounded-2xl border border-border/30 bg-card/10 backdrop-blur-sm hover:bg-card/25 transition-all duration-300 hover:border-primary/30"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{item.icon}</span>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-mono">Step {item.step}</span>
                                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features strip */}
            <section className="relative z-10 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: "🎨", label: "6 Background Types", desc: "Gradients, mesh, patterns, noise" },
                            { icon: "📱", label: "Device Frames", desc: "Browser, phone, tablet, laptop" },
                            { icon: "📐", label: "Multiple Sizes", desc: "Dribbble, Behance, Twitter, IG" },
                            { icon: "✨", label: "3D Perspective", desc: "RotateX, RotateY transforms" },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/20 bg-card/10 backdrop-blur-sm hover:bg-card/20 transition-all duration-300"
                            >
                                <span className="text-2xl">{feature.icon}</span>
                                <span className="text-xs font-semibold text-foreground text-center">{feature.label}</span>
                                <span className="text-[10px] text-muted-foreground text-center">{feature.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative z-10 pb-16 px-6 text-center">
                <Link
                    href="/edit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                    Open Editor
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </Link>
                <p className="mt-3 text-xs text-muted-foreground/50">
                    Start building beautiful shots right now — it&apos;s free forever.
                </p>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-6 border-t border-border/20">
                <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground/40">
                        Built by{" "}
                        <a href="https://sadique.co" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors">
                            Sadique
                        </a>
                        {" "}· Part of the Sadique design ecosystem
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground/40">
                        <a href="https://sadique.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary/70 transition-colors">
                            Portfolio
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
