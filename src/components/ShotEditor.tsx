"use client";

import { useState, useRef, useCallback } from "react";
import { EditorState, DEFAULT_STATE, SHOT_PRESETS, BACKGROUND_PRESETS, BackgroundType, PatternType, DeviceFrame, ShotPreset } from "@/lib/presets";
import { exportShot } from "@/lib/export";
import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";

export function ShotEditor() {
    const [state, setState] = useState<EditorState>(DEFAULT_STATE);
    const [isExporting, setIsExporting] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    const updateState = useCallback(<K extends keyof EditorState>(key: K, value: EditorState[K]) => {
        setState((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleImageUpload = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            updateState("image", e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }, [updateState]);

    const handleRemoveImage = useCallback(() => {
        updateState("image", null);
    }, [updateState]);

    const handleExport = useCallback(async () => {
        if (!canvasRef.current || isExporting) return;
        setIsExporting(true);
        try {
            await exportShot(
                canvasRef.current,
                state.shotPreset.width,
                state.shotPreset.height,
                state.shotPreset.name
            );
        } catch (err) {
            console.error("Export error:", err);
        } finally {
            setIsExporting(false);
        }
    }, [state.shotPreset, isExporting]);

    const handlePresetSelect = useCallback((preset: typeof BACKGROUND_PRESETS[0]) => {
        setState((prev) => ({
            ...prev,
            backgroundType: preset.type,
            gradientColors: preset.colors.slice(0, 3),
            gradientAngle: preset.angle ?? 135,
            meshColors: preset.type === "mesh-gradient" ? preset.colors : prev.meshColors,
        }));
    }, []);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)]">
            {/* Sidebar */}
            <Sidebar
                state={state}
                updateState={updateState}
                onPresetSelect={handlePresetSelect}
                onImageUpload={handleImageUpload}
            />

            {/* Canvas area */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file);
                                }}
                            />
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                Upload
                            </span>
                        </label>
                        {state.image && (
                            <button
                                onClick={handleRemoveImage}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                Remove
                            </button>
                        )}
                    </div>

                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        )}
                        {isExporting ? "Exporting..." : `Export PNG`}
                    </button>
                </div>

                {/* Canvas */}
                <Canvas
                    ref={canvasRef}
                    state={state}
                    onImageUpload={handleImageUpload}
                />
            </div>
        </div>
    );
}
