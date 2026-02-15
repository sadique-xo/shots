export interface ShotPreset {
    name: string;
    width: number;
    height: number;
    label: string;
}

export const SHOT_PRESETS: ShotPreset[] = [
    { name: "dribbble-1x", width: 800, height: 600, label: "Dribbble 1x" },
    { name: "dribbble-2x", width: 1600, height: 1200, label: "Dribbble 2x" },
    { name: "dribbble-4x", width: 2800, height: 2100, label: "Dribbble 4x Retina" },
    { name: "behance", width: 1600, height: 1200, label: "Behance" },
    { name: "twitter", width: 1600, height: 900, label: "Twitter / X" },
    { name: "instagram", width: 1080, height: 1080, label: "Instagram" },
];

export type BackgroundType =
    | "solid"
    | "linear-gradient"
    | "radial-gradient"
    | "mesh-gradient"
    | "pattern"
    | "noise";

export type PatternType =
    | "dots"
    | "grid"
    | "diagonal"
    | "circles"
    | "topography"
    | "waves";

export type DeviceFrame =
    | "none"
    | "browser"
    | "phone"
    | "tablet"
    | "laptop";

export interface BackgroundPreset {
    name: string;
    type: BackgroundType;
    colors: string[];
    angle?: number;
    patternType?: PatternType;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
    { name: "Midnight", type: "linear-gradient", colors: ["#0f0c29", "#302b63", "#24243e"], angle: 135 },
    { name: "Sunset", type: "linear-gradient", colors: ["#f12711", "#f5af19"], angle: 135 },
    { name: "Ocean", type: "linear-gradient", colors: ["#2193b0", "#6dd5ed"], angle: 135 },
    { name: "Neon", type: "linear-gradient", colors: ["#b721ff", "#21d4fd"], angle: 135 },
    { name: "Candy", type: "linear-gradient", colors: ["#fc5c7d", "#6a82fb"], angle: 135 },
    { name: "Slate", type: "linear-gradient", colors: ["#3f4c6b", "#606c88"], angle: 135 },
    { name: "Aurora", type: "mesh-gradient", colors: ["#00d2ff", "#3a7bd5", "#6dd5ed", "#00b09b"] },
    { name: "Lavender", type: "linear-gradient", colors: ["#a18cd1", "#fbc2eb"], angle: 135 },
    { name: "Fire", type: "linear-gradient", colors: ["#f83600", "#f9d423"], angle: 135 },
    { name: "Forest", type: "linear-gradient", colors: ["#134e5e", "#71b280"], angle: 135 },
    { name: "Rose", type: "linear-gradient", colors: ["#ee9ca7", "#ffdde1"], angle: 135 },
    { name: "Deep Space", type: "linear-gradient", colors: ["#000000", "#434343"], angle: 135 },
];

export interface EditorState {
    // Shot preset
    shotPreset: ShotPreset;

    // Background
    backgroundType: BackgroundType;
    solidColor: string;
    gradientColors: string[];
    gradientAngle: number;
    meshColors: string[];
    patternType: PatternType;
    patternColor: string;
    patternBgColor: string;
    noiseOpacity: number;

    // Image
    image: string | null;
    imageScale: number;
    imageRadius: number;
    imageShadow: number;
    imageOffsetY: number;
    imagePadding: number;
    imagePerspective: boolean;
    imageRotateX: number;
    imageRotateY: number;

    // Device frame
    deviceFrame: DeviceFrame;
}

export const DEFAULT_STATE: EditorState = {
    shotPreset: SHOT_PRESETS[1], // Dribbble 2x
    backgroundType: "linear-gradient",
    solidColor: "#6366f1",
    gradientColors: ["#b721ff", "#21d4fd"],
    gradientAngle: 135,
    meshColors: ["#00d2ff", "#3a7bd5", "#6dd5ed", "#00b09b"],
    patternType: "dots",
    patternColor: "#ffffff",
    patternBgColor: "#6366f1",
    noiseOpacity: 0.15,
    image: null,
    imageScale: 70,
    imageRadius: 12,
    imageShadow: 30,
    imageOffsetY: 0,
    imagePadding: 8,
    imagePerspective: false,
    imageRotateX: 0,
    imageRotateY: 0,
    deviceFrame: "none",
};
