import { useEffect, useRef, useState } from "react";
import { WallPainterState } from "./types";
import { ENVIRONMENTS } from "./constants";
import { Loader2 } from "lucide-react";

interface WallCanvasProps {
  state: WallPainterState;
}

export const WallCanvas = ({ state }: WallCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const environment = ENVIRONMENTS.find((e) => e.id === state.environment);
    if (!environment) return;

    setLoading(true);
    setError(null);

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Calculate wall region based on mask config
        const maskX = Math.floor(canvas.width * environment.wallMask.x);
        const maskY = Math.floor(canvas.height * environment.wallMask.y);
        const maskWidth = Math.floor(canvas.width * environment.wallMask.width);
        const maskHeight = Math.floor(canvas.height * environment.wallMask.height);

        // Get image data for the wall region
        const imageData = ctx.getImageData(maskX, maskY, maskWidth, maskHeight);
        const data = imageData.data;

        // Parse the selected color
        const color = hexToRgb(state.color);
        if (!color) return;

        // Apply color with blending
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate luminosity to preserve shadows and highlights
          const luminosity = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          
          // Apply color with luminosity preservation
          const opacity = state.opacity / 100;
          const brightnessAdjust = 1 + (state.brightness - 50) / 100;
          
          data[i] = Math.min(255, r * (1 - opacity) + color.r * luminosity * brightnessAdjust * opacity);
          data[i + 1] = Math.min(255, g * (1 - opacity) + color.g * luminosity * brightnessAdjust * opacity);
          data[i + 2] = Math.min(255, b * (1 - opacity) + color.b * luminosity * brightnessAdjust * opacity);
        }

        // Apply texture effect
        if (state.texture !== "smooth" && state.textureIntensity > 0) {
          applyTexture(data, state.texture, state.textureIntensity / 100);
        }

        // Put the modified image data back
        ctx.putImageData(imageData, maskX, maskY);
        
        setLoading(false);
      } catch (err) {
        console.error("Error processing image:", err);
        setError("Erro ao processar imagem");
        setLoading(false);
      }
    };

    img.onerror = () => {
      setError("Erro ao carregar imagem");
      setLoading(false);
    };

    img.src = environment.image;
  }, [state]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-muted rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <p className="text-destructive">{error}</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full object-contain shadow-strong rounded-lg"
        style={{ transition: "var(--transition-smooth)" }}
      />
    </div>
  );
};

// Helper functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function applyTexture(
  data: Uint8ClampedArray,
  texture: string,
  intensity: number
) {
  const width = Math.sqrt(data.length / 4);
  
  for (let i = 0; i < data.length; i += 4) {
    let noise = 0;
    const x = (i / 4) % width;
    const y = Math.floor(i / 4 / width);

    switch (texture) {
      case "textured":
        // Fine grain texture
        noise = (Math.random() - 0.5) * 10 * intensity;
        break;
      case "grafiato":
        // Medium grainy texture
        noise = (Math.sin(x * 0.1) * Math.cos(y * 0.1) + Math.random() - 0.5) * 20 * intensity;
        break;
      case "rustic":
        // Strong irregular texture
        noise = (Math.sin(x * 0.05) * Math.cos(y * 0.08) + (Math.random() - 0.5)) * 30 * intensity;
        break;
    }

    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
}
