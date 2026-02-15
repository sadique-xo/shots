"use client";

import { EditorState, SHOT_PRESETS, BACKGROUND_PRESETS, BackgroundType, PatternType, DeviceFrame, BackgroundPreset } from "@/lib/presets";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface SidebarProps {
    state: EditorState;
    updateState: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
    onPresetSelect: (preset: BackgroundPreset) => void;
    onImageUpload: (file: File) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {children}
        </h3>
    );
}

function ColorInput({ value, onChange, label }: { value: string; onChange: (v: string) => void; label?: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-7 h-7 rounded-md border border-border cursor-pointer"
                    style={{ padding: 0 }}
                />
            </div>
            {label && <span className="text-xs text-muted-foreground">{label}</span>}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 text-xs bg-secondary rounded-md px-2 py-1 border border-border font-mono uppercase"
                maxLength={7}
            />
        </div>
    );
}

const BG_TYPES: { value: BackgroundType; label: string }[] = [
    { value: "solid", label: "Solid" },
    { value: "linear-gradient", label: "Linear" },
    { value: "radial-gradient", label: "Radial" },
    { value: "mesh-gradient", label: "Mesh" },
    { value: "pattern", label: "Pattern" },
    { value: "noise", label: "Noise" },
];

const PATTERN_TYPES: { value: PatternType; label: string }[] = [
    { value: "dots", label: "Dots" },
    { value: "grid", label: "Grid" },
    { value: "diagonal", label: "Diagonal" },
    { value: "circles", label: "Circles" },
    { value: "topography", label: "Topo" },
    { value: "waves", label: "Waves" },
];

const FRAME_TYPES: { value: DeviceFrame; label: string; icon: string }[] = [
    { value: "none", label: "None", icon: "◻" },
    { value: "browser", label: "Browser", icon: "🌐" },
    { value: "phone", label: "Phone", icon: "📱" },
    { value: "tablet", label: "Tablet", icon: "📋" },
    { value: "laptop", label: "Laptop", icon: "💻" },
];

export function Sidebar({ state, updateState, onPresetSelect, onImageUpload }: SidebarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-lg">shots</span>
                    <span className="text-muted-foreground text-sm">.sadique.co</span>
                </div>
                <ThemeToggle />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Shot Size */}
                <section>
                    <SectionLabel>Shot Size</SectionLabel>
                    <div className="grid grid-cols-2 gap-1.5">
                        {SHOT_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => updateState("shotPreset", preset)}
                                className={`text-xs px-2.5 py-1.5 rounded-md transition-all duration-150 font-medium ${state.shotPreset.name === preset.name
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">
                        {state.shotPreset.width}×{state.shotPreset.height}px
                    </p>
                </section>

                <Separator />

                {/* Background Presets */}
                <section>
                    <SectionLabel>Presets</SectionLabel>
                    <div className="grid grid-cols-6 gap-1.5">
                        {BACKGROUND_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => onPresetSelect(preset)}
                                className="group relative"
                                title={preset.name}
                            >
                                <div
                                    className="w-full aspect-square rounded-lg border border-border transition-all duration-150 hover:scale-110 hover:shadow-md"
                                    style={{
                                        background:
                                            preset.type === "mesh-gradient"
                                                ? `radial-gradient(circle at 30% 30%, ${preset.colors[0]}, transparent 50%), radial-gradient(circle at 70% 70%, ${preset.colors[1]}, transparent 50%), ${preset.colors[2] || preset.colors[0]}`
                                                : `linear-gradient(${preset.angle || 135}deg, ${preset.colors.join(", ")})`,
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Background Type */}
                <section>
                    <SectionLabel>Background</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                        {BG_TYPES.map((bg) => (
                            <button
                                key={bg.value}
                                onClick={() => updateState("backgroundType", bg.value)}
                                className={`text-xs px-2 py-1.5 rounded-md transition-all duration-150 font-medium ${state.backgroundType === bg.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {bg.label}
                            </button>
                        ))}
                    </div>

                    {/* Solid color */}
                    {state.backgroundType === "solid" && (
                        <ColorInput
                            value={state.solidColor}
                            onChange={(v) => updateState("solidColor", v)}
                            label="Color"
                        />
                    )}

                    {/* Gradient colors */}
                    {(state.backgroundType === "linear-gradient" || state.backgroundType === "radial-gradient" || state.backgroundType === "noise") && (
                        <div className="space-y-2">
                            {state.gradientColors.map((color, i) => (
                                <ColorInput
                                    key={i}
                                    value={color}
                                    onChange={(v) => {
                                        const newColors = [...state.gradientColors];
                                        newColors[i] = v;
                                        updateState("gradientColors", newColors);
                                    }}
                                    label={`Stop ${i + 1}`}
                                />
                            ))}
                            <div className="flex gap-1.5">
                                {state.gradientColors.length < 3 && (
                                    <button
                                        onClick={() => updateState("gradientColors", [...state.gradientColors, "#8b5cf6"])}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        + Add stop
                                    </button>
                                )}
                                {state.gradientColors.length > 2 && (
                                    <button
                                        onClick={() => updateState("gradientColors", state.gradientColors.slice(0, -1))}
                                        className="text-xs text-destructive hover:underline"
                                    >
                                        − Remove
                                    </button>
                                )}
                            </div>
                            {state.backgroundType === "linear-gradient" && (
                                <div>
                                    <Label className="text-xs text-muted-foreground">Angle: {state.gradientAngle}°</Label>
                                    <Slider
                                        value={[state.gradientAngle]}
                                        onValueChange={([v]) => updateState("gradientAngle", v)}
                                        min={0}
                                        max={360}
                                        step={1}
                                        className="mt-1"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mesh colors */}
                    {state.backgroundType === "mesh-gradient" && (
                        <div className="space-y-2">
                            {state.meshColors.map((color, i) => (
                                <ColorInput
                                    key={i}
                                    value={color}
                                    onChange={(v) => {
                                        const newColors = [...state.meshColors];
                                        newColors[i] = v;
                                        updateState("meshColors", newColors);
                                    }}
                                    label={`Blob ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pattern type */}
                    {state.backgroundType === "pattern" && (
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-1.5">
                                {PATTERN_TYPES.map((p) => (
                                    <button
                                        key={p.value}
                                        onClick={() => updateState("patternType", p.value)}
                                        className={`text-xs px-2 py-1.5 rounded-md transition-all duration-150 ${state.patternType === p.value
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                            <ColorInput
                                value={state.patternColor}
                                onChange={(v) => updateState("patternColor", v)}
                                label="Pattern"
                            />
                            <ColorInput
                                value={state.patternBgColor}
                                onChange={(v) => updateState("patternBgColor", v)}
                                label="Background"
                            />
                        </div>
                    )}

                    {/* Noise opacity */}
                    {state.backgroundType === "noise" && (
                        <div className="mt-2">
                            <Label className="text-xs text-muted-foreground">
                                Noise: {Math.round(state.noiseOpacity * 100)}%
                            </Label>
                            <Slider
                                value={[state.noiseOpacity]}
                                onValueChange={([v]) => updateState("noiseOpacity", v)}
                                min={0.05}
                                max={0.5}
                                step={0.01}
                                className="mt-1"
                            />
                        </div>
                    )}
                </section>

                <Separator />

                {/* Image Controls */}
                <section>
                    <SectionLabel>Image</SectionLabel>
                    <div className="space-y-3">
                        <div>
                            <Label className="text-xs text-muted-foreground">Scale: {state.imageScale}%</Label>
                            <Slider
                                value={[state.imageScale]}
                                onValueChange={([v]) => updateState("imageScale", v)}
                                min={30}
                                max={100}
                                step={1}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Corner Radius: {state.imageRadius}px</Label>
                            <Slider
                                value={[state.imageRadius]}
                                onValueChange={([v]) => updateState("imageRadius", v)}
                                min={0}
                                max={40}
                                step={1}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Shadow: {state.imageShadow}</Label>
                            <Slider
                                value={[state.imageShadow]}
                                onValueChange={([v]) => updateState("imageShadow", v)}
                                min={0}
                                max={60}
                                step={1}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Vertical Offset: {state.imageOffsetY}</Label>
                            <Slider
                                value={[state.imageOffsetY]}
                                onValueChange={([v]) => updateState("imageOffsetY", v)}
                                min={-30}
                                max={30}
                                step={1}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Padding: {state.imagePadding}%</Label>
                            <Slider
                                value={[state.imagePadding]}
                                onValueChange={([v]) => updateState("imagePadding", v)}
                                min={0}
                                max={20}
                                step={1}
                                className="mt-1"
                            />
                        </div>
                    </div>
                </section>

                <Separator />

                {/* 3D Perspective */}
                <section>
                    <SectionLabel>3D Perspective</SectionLabel>
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={state.imagePerspective}
                                onChange={(e) => updateState("imagePerspective", e.target.checked)}
                                className="rounded border-border accent-primary"
                            />
                            <span className="text-xs text-foreground">Enable 3D</span>
                        </label>
                        {state.imagePerspective && (
                            <>
                                <div>
                                    <Label className="text-xs text-muted-foreground">
                                        Rotate X: {state.imageRotateX}°
                                    </Label>
                                    <Slider
                                        value={[state.imageRotateX]}
                                        onValueChange={([v]) => updateState("imageRotateX", v)}
                                        min={-30}
                                        max={30}
                                        step={1}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">
                                        Rotate Y: {state.imageRotateY}°
                                    </Label>
                                    <Slider
                                        value={[state.imageRotateY]}
                                        onValueChange={([v]) => updateState("imageRotateY", v)}
                                        min={-30}
                                        max={30}
                                        step={1}
                                        className="mt-1"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <Separator />

                {/* Device Frame */}
                <section>
                    <SectionLabel>Device Frame</SectionLabel>
                    <div className="grid grid-cols-5 gap-1.5">
                        {FRAME_TYPES.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => updateState("deviceFrame", f.value)}
                                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-md transition-all duration-150 text-xs ${state.deviceFrame === f.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                <span className="text-base">{f.icon}</span>
                                <span className="text-[10px]">{f.label}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-[300px] border-r border-border bg-card/50 backdrop-blur-sm shrink-0 h-full">
                {sidebarContent}
            </aside>

            {/* Mobile toggle */}
            <button
                className="lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isMobileOpen ? (
                        <>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                    ) : (
                        <>
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </>
                    )}
                </svg>
            </button>

            {/* Mobile sidebar drawer */}
            {isMobileOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-card border-r border-border shadow-2xl animate-in slide-in-from-left duration-300">
                        {sidebarContent}
                    </aside>
                </>
            )}
        </>
    );
}
