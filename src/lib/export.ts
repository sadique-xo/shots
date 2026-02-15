import { toPng } from "html-to-image";

export async function exportShot(
    element: HTMLElement,
    width: number,
    height: number,
    presetName: string
): Promise<void> {
    try {
        const dataUrl = await toPng(element, {
            width,
            height,
            pixelRatio: 2, // Better quality
            style: {
                transform: `scale(${width / element.offsetWidth})`,
                transformOrigin: "top left",
                width: `${element.offsetWidth}px`,
                height: `${element.offsetHeight}px`,
                margin: "0",
                padding: "0",
                border: "none",
                boxShadow: "none", // Ensure container shadow doesn't leak
            },
        });

        const link = document.createElement("a");
        const timestamp = Date.now();
        link.download = `shot-${presetName}-${timestamp}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error("Export failed:", err);
        throw err;
    }
}
