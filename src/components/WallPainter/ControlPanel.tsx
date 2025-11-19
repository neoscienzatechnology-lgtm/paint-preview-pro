import { WallPainterState, TextureType, EnvironmentType } from "./types";
import { TEXTURES, ENVIRONMENTS } from "./constants";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Paintbrush, Sparkles, Sun, Droplets, Image } from "lucide-react";

interface ControlPanelProps {
  state: WallPainterState;
  onChange: (updates: Partial<WallPainterState>) => void;
}

export const ControlPanel = ({ state, onChange }: ControlPanelProps) => {
  return (
    <div className="space-y-6">
      {/* Color Picker */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Paintbrush className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">Cor da Parede</Label>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={state.color}
              onChange={(e) => onChange({ color: e.target.value })}
              className="w-20 h-20 rounded-lg cursor-pointer border-2 border-border"
            />
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={state.color.toUpperCase()}
                onChange={(e) => onChange({ color: e.target.value })}
                className="w-full px-3 py-2 text-sm font-mono rounded-md border border-input bg-background"
              />
              <p className="text-xs text-muted-foreground">
                Escolha a cor ou digite o código HEX
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Texture Selection */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">Textura</Label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TEXTURES.map((texture) => (
              <Button
                key={texture.id}
                variant={state.texture === texture.id ? "default" : "outline"}
                className="h-auto py-4 flex flex-col items-start gap-1"
                onClick={() => onChange({ texture: texture.id as TextureType })}
              >
                <span className="font-semibold">{texture.name}</span>
                <span className="text-xs opacity-80">{texture.description}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Texture Intensity */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Intensidade da Textura</Label>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {state.textureIntensity}%
            </span>
          </div>
          <Slider
            value={[state.textureIntensity]}
            onValueChange={([value]) => onChange({ textureIntensity: value })}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </Card>

      {/* Brightness */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Brilho / Acabamento</Label>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {state.brightness < 40 ? "Fosco" : state.brightness < 70 ? "Acetinado" : "Brilhante"}
            </span>
          </div>
          <Slider
            value={[state.brightness]}
            onValueChange={([value]) => onChange({ brightness: value })}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </Card>

      {/* Opacity */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Opacidade</Label>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {state.opacity}%
            </span>
          </div>
          <Slider
            value={[state.opacity]}
            onValueChange={([value]) => onChange({ opacity: value })}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </Card>

      {/* Environment Selection */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">Ambiente</Label>
          </div>
          <div className="space-y-2">
            {ENVIRONMENTS.map((env) => (
              <Button
                key={env.id}
                variant={state.environment === env.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => onChange({ environment: env.id as EnvironmentType })}
              >
                {env.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
