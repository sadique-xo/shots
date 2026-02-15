"use client";

import { forwardRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { EditorState } from "@/lib/presets";
import { BackgroundRenderer } from "@/components/backgrounds/BackgroundRenderer";
import { FrameRenderer } from "@/components/frames/FrameRenderer";

interface CanvasProps {
    state: EditorState;
    onImageUpload: (file: File) => void;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
    function Canvas({ state, onImageUpload }, ref) {
        const onDrop = useCallback(
            (acceptedFiles: File[]) => {
                if (acceptedFiles[0]) {
                    onImageUpload(acceptedFiles[0]);
                }
            },
            [onImageUpload]
        );

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: { "image/*": [] },
            multiple: false,
            noClick: !!state.image,
        });

        const aspectRatio = state.shotPreset.width / state.shotPreset.height;

        // Calculate image shadow
        const shadowBlur = state.imageShadow * 1.5;
        const shadowOffset = state.imageShadow * 0.3;
        const shadowStyle =
            state.imageShadow > 0
                ? `0 ${shadowOffset}px ${shadowBlur}px rgba(0, 0, 0, ${state.imageShadow / 100})`
                : "none";

        // 3D transform
        const transform3d = state.imagePerspective
            ? `perspective(1000px) rotateX(${state.imageRotateX}deg) rotateY(${state.imageRotateY}deg)`
            : "none";

        const paddingPercent = state.imagePadding / 100;

        return (
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-auto" style={{
                background: "repeating-conic-gradient(var(--muted) 0% 25%, transparent 0% 50%) 50% / 20px 20px",
            }}>
                <div
                    className="w-full"
                    style={{
                        maxWidth: "560px",
                        aspectRatio: `${aspectRatio}`,
                    }}
                >
                    {/* Canvas – this div gets captured for export */}
                    <div
                        ref={ref}
                        {...(state.image ? {} : getRootProps())}
                        className={`relative w-full h-full overflow-hidden transition-all duration-200 ${isDragActive ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                            }`}
                        style={{
                            aspectRatio: `${aspectRatio}`,
                        }}
                    >
                        {!state.image && <input {...getInputProps()} />}

                        {/* Background */}
                        <BackgroundRenderer
                            type={state.backgroundType}
                            solidColor={state.solidColor}
                            gradientColors={state.gradientColors}
                            gradientAngle={state.gradientAngle}
                            meshColors={state.meshColors}
                            patternType={state.patternType}
                            patternColor={state.patternColor}
                            patternBgColor={state.patternBgColor}
                            noiseOpacity={state.noiseOpacity}
                        />

                        {/* Content */}
                        <div
                            className="relative z-10 flex items-center justify-center w-full h-full"
                            style={{
                                padding: `${paddingPercent * 100}%`,
                            }}
                        >
                            {state.image ? (
                                <div
                                    className="flex items-center justify-center"
                                    style={{
                                        transform: `translateY(${state.imageOffsetY}px)`,
                                        width: `${state.imageScale}%`,
                                    }}
                                >
                                    <div style={{ transform: transform3d }}>
                                        <FrameRenderer frame={state.deviceFrame}>
                                            <img
                                                src={state.image}
                                                alt="Screenshot"
                                                className="w-full h-auto block"
                                                style={{
                                                    borderRadius: state.deviceFrame === "none" ? `${state.imageRadius}px` : undefined,
                                                    boxShadow: state.deviceFrame === "none" ? shadowStyle : undefined,
                                                }}
                                                draggable={false}
                                            />
                                        </FrameRenderer>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    {...getRootProps()}
                                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 w-3/4 h-3/4 ${isDragActive
                                            ? "border-primary bg-primary/10"
                                            : "border-white/20 hover:border-white/40"
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-white/40"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    <p className="text-white/50 text-sm font-medium">
                                        Drop your screenshot here
                                    </p>
                                    <p className="text-white/30 text-xs">or click to upload</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
