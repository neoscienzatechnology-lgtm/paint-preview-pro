export interface WallPainterState {
  color: string;
  texture: TextureType;
  textureIntensity: number;
  brightness: number;
  opacity: number;
  environment: EnvironmentType;
}

export type TextureType = "smooth" | "textured" | "grafiato" | "rustic";
export type EnvironmentType = "living" | "bedroom" | "exterior";

export interface Texture {
  id: TextureType;
  name: string;
  description: string;
}

export interface Environment {
  id: EnvironmentType;
  name: string;
  image: string;
  wallMask: WallMaskConfig;
}

export interface WallMaskConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}
