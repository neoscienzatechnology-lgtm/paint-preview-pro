import { Texture, Environment } from "./types";
import livingRoom from "@/assets/room-living.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import exterior from "@/assets/room-exterior.jpg";

export const TEXTURES: Texture[] = [
  {
    id: "smooth",
    name: "Lisa",
    description: "Acabamento liso e uniforme",
  },
  {
    id: "textured",
    name: "Texturizada",
    description: "Textura suave e delicada",
  },
  {
    id: "grafiato",
    name: "Grafiato",
    description: "Textura rústica com relevo",
  },
  {
    id: "rustic",
    name: "Rústica",
    description: "Textura marcante e irregular",
  },
];

export const ENVIRONMENTS: Environment[] = [
  {
    id: "living",
    name: "Sala de Estar",
    image: livingRoom,
    wallMask: {
      x: 0.1,
      y: 0.1,
      width: 0.8,
      height: 0.7,
    },
  },
  {
    id: "bedroom",
    name: "Quarto",
    image: bedroom,
    wallMask: {
      x: 0.1,
      y: 0.15,
      width: 0.8,
      height: 0.65,
    },
  },
  {
    id: "exterior",
    name: "Fachada",
    image: exterior,
    wallMask: {
      x: 0.15,
      y: 0.1,
      width: 0.7,
      height: 0.75,
    },
  },
];

export const DEFAULT_STATE = {
  color: "#e8e4d9",
  texture: "smooth" as const,
  textureIntensity: 50,
  brightness: 50,
  opacity: 100,
  environment: "living" as const,
};
