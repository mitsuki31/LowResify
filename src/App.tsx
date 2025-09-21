import { useEffect, useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ThemeToggle from "@/components/custom/ThemeToggle";
import { pixelateImage } from "./lib/lowres.core";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import LowResDropzone from "./components/custom/LowResDropzone";

const BG_CLR = {
  light: "bg-slate-50",
  dark: "bg-zinc-900",
  default: "bg-slate-50 dark:bg-zinc-900",
} as const;
const ACCENT_CLR = {
  light: "bg-blue-200/80",
  dark: "bg-zinc-800",
  default: "bg-blue-200/80 dark:bg-zinc-800",
} as const;
const TEXT_CLR = {
  light: "text-blue-900",
  dark: "text-yellow-200",
  default: "text-blue-900 dark:text-yellow-200",
} as const;
const BUTTON_CLR = {
  default: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white",
  dark: "dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:active:bg-yellow-600 dark:text-zinc-900",
} as const;
const DEFAULT_PIXEL_SIZE = 15; // Default pixelation size

function App(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState<number>(DEFAULT_PIXEL_SIZE);
  const [pixelatedCanvas, setPixelatedCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      const img = new Image();
      img.src = objectUrl;
      img.onload = () => {
        setPixelatedCanvas(pixelateImage(img, pixelSize));
        img.onload = null;  // Avoid potential memory leaks
      };

      // Clean up the object URL when the component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file, pixelSize]);

  const handleDownload = (): void => {
    if (!pixelatedCanvas) return;

    pixelatedCanvas.toBlob((blob: Blob | null): void => {
      if (!blob) return;
      const link: HTMLAnchorElement = document.createElement('a');
      const filename = file?.name ? file.name.replace(/\.[^/.]+$/, "") : undefined; // Remove extension if exists
      const date = new Date();  // For fallback name
      link.href = URL.createObjectURL(blob);
      link.download = `lowresify-p${pixelSize}-${filename
        || `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}.png`;
      link.click();

      URL.revokeObjectURL(link.href);  // Clean up
    });
  };

  return (
    <div className="">
      <div className={`min-h-screen flex flex-col items-center justify-center align-middle ${BG_CLR.default} ${TEXT_CLR.default}`}>
        <Card className={`flex w-full max-w-lg ${ACCENT_CLR.default} p-5 shadow-blue-400/50 shadow-xl dark:shadow-none dark:ring-yellow-400/70 dark:ring-[0.5px] font-mono`}>
          <ThemeToggle className="absolute -mt-2 bg-blue-100 hover:bg-blue-200 active:bg-blue-200" />
          <span className="text-sm opacity-60 -mt-2 text-blue-700 dark:text-yellow-400 text-right">
            <a className="hover:underline hover:underline-offset-3 active:underline active:underline-offset-3" href="https://github.com/mitsuki31/LowResify" target="_blank">LowResify</a>
          </span>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold text-center">LowRes Pixelation</h2>

            {/* Drag-and-drop file upload */}
            <LowResDropzone setter={setFile} />
            <div className="text-sm text-center text-gray-500 dark:text-gray-400 text-wrap wrap-break-word mx-4">
              {file ? (<>Selected file: <i>{file.name}</i></>) : "No file selected"}
            </div>

            <div className="space-y-2">
              <p className="text-sm">Pixel Size: {pixelSize}</p>
              <Slider
                defaultValue={[DEFAULT_PIXEL_SIZE]}
                min={1}
                max={50}
                step={1}
                onValueChange={(val: number[]): void => setPixelSize(val[0])}
                className={`text-blue-900 dark:text-yellow-200`}
              />
            </div>

            {preview && pixelatedCanvas && (
              <>
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={preview} alt="Before" />}
                  itemTwo={<ReactCompareSliderImage src={pixelatedCanvas.toDataURL()} alt="After" />}
                />
                <Button className={`w-full mt-2 ${BUTTON_CLR.default} ${BUTTON_CLR.dark}`} onClick={handleDownload}>Download</Button>
              </>
            )}
          </CardContent>
          <span className="text-sm opacity-60 -mt-3 -mb-2 text-blue-700 dark:text-yellow-400">&copy; {new Date().getFullYear()} <a href="https://github.com/mitsuki31">Ryuu Mitsuki</a></span>
        </Card>
      </div>
    </div>
  );
}

export default App;
