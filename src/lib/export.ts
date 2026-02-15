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
            pixelRatio: 1,
            style: {
                transform: `scale(${width / element.offsetWidth})`,
                transformOrigin: "top left",
                width: `${element.offsetWidth}px`,
                height: `${element.offsetHeight}px`,
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
