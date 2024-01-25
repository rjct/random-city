import { constants } from "../../engine/constants";

export enum LandscapeType {
  Park = 0,
  Water = 1,
}

const convertLandscapeFunc = (
  type: keyof typeof LandscapeType,
  num: number,
) => ({
  src: `assets/landscape/${type.toLowerCase()}/cityTiles_${num
    .toString()
    .padStart(3, "0")
    .slice(-3)}.png`,
  size: constants.DEFAULT_TILE_SIZE,
});

export const landscape: {
  [landscapeType in keyof typeof LandscapeType]: StructurePart[];
} = {
  Park: [43, 59, 66, 67].map((num) => convertLandscapeFunc("Park", num)),
  Water: [127].map((num) => convertLandscapeFunc("Water", num)),
};
