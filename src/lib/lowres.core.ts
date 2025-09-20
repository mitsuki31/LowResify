export function pixelateImage(
  img: HTMLImageElement,
  pixelSize = 10
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context not available");

  canvas.width = img.width;
  canvas.height = img.height;

  // Turn off smoothing (important for pixelation)
  ctx.imageSmoothingEnabled = false;

  // Scale down
  const w = Math.max(1, Math.floor(img.width / pixelSize));
  const h = Math.max(1, Math.floor(img.height / pixelSize));

  ctx.drawImage(img, 0, 0, w, h);

  // Scale back up
  ctx.drawImage(
    canvas,
    0,
    0,
    w,
    h,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas;
}
