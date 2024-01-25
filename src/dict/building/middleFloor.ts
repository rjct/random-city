import { createBuildingTileSrc } from "./_helpers";
import { BuildingColor } from "../../engine/buildings/constants";
import { constants } from "../../engine/constants";

const getMiddleFloorTile = (num: number) => ({
  src: createBuildingTileSrc(num, "middle"),
  size: constants.MIDDLE_FLOOR_TILE_SIZE,
});

export const buildingMiddleFloor: {
  [color in keyof typeof BuildingColor]: BuildingDictEntity[];
} = {
  COMMON: [
    {
      DEG_0: getMiddleFloorTile(31),
      DEG_90: getMiddleFloorTile(31),
      DEG_180: getMiddleFloorTile(31),
      DEG_270: getMiddleFloorTile(31),
    },
    {
      DEG_0: getMiddleFloorTile(24),
      DEG_90: getMiddleFloorTile(24),
      DEG_180: getMiddleFloorTile(24),
      DEG_270: getMiddleFloorTile(24),
    },
    {
      DEG_0: getMiddleFloorTile(55),
      DEG_90: getMiddleFloorTile(55),
      DEG_180: getMiddleFloorTile(56),
      DEG_270: getMiddleFloorTile(56),
    },
    {
      DEG_0: getMiddleFloorTile(50),
      DEG_90: getMiddleFloorTile(53),
      DEG_180: getMiddleFloorTile(50),
      DEG_270: getMiddleFloorTile(53),
    },
  ],
  RED: [
    {
      DEG_0: getMiddleFloorTile(23),
      DEG_90: getMiddleFloorTile(23),
      DEG_180: getMiddleFloorTile(23),
      DEG_270: getMiddleFloorTile(23),
    },
    {
      DEG_0: getMiddleFloorTile(16),
      DEG_90: getMiddleFloorTile(16),
      DEG_180: getMiddleFloorTile(16),
      DEG_270: getMiddleFloorTile(16),
    },
    {
      DEG_0: getMiddleFloorTile(52),
      DEG_90: getMiddleFloorTile(54),
      DEG_180: getMiddleFloorTile(52),
      DEG_270: getMiddleFloorTile(54),
    },
    {
      DEG_0: getMiddleFloorTile(45),
      DEG_90: getMiddleFloorTile(49),
      DEG_180: getMiddleFloorTile(45),
      DEG_270: getMiddleFloorTile(49),
    },
  ],
  BROWN: [
    {
      DEG_0: getMiddleFloorTile(7),
      DEG_90: getMiddleFloorTile(7),
      DEG_180: getMiddleFloorTile(7),
      DEG_270: getMiddleFloorTile(7),
    },
    {
      DEG_0: getMiddleFloorTile(0),
      DEG_90: getMiddleFloorTile(0),
      DEG_180: getMiddleFloorTile(0),
      DEG_270: getMiddleFloorTile(0),
    },
    {
      DEG_0: getMiddleFloorTile(32),
      DEG_90: getMiddleFloorTile(38),
      DEG_180: getMiddleFloorTile(32),
      DEG_270: getMiddleFloorTile(38),
    },
    {
      DEG_0: getMiddleFloorTile(43),
      DEG_90: getMiddleFloorTile(47),
      DEG_180: getMiddleFloorTile(43),
      DEG_270: getMiddleFloorTile(47),
    },
  ],
  OLIVE: [
    {
      DEG_0: getMiddleFloorTile(15),
      DEG_90: getMiddleFloorTile(15),
      DEG_180: getMiddleFloorTile(15),
      DEG_270: getMiddleFloorTile(15),
    },
    {
      DEG_0: getMiddleFloorTile(8),
      DEG_90: getMiddleFloorTile(8),
      DEG_180: getMiddleFloorTile(8),
      DEG_270: getMiddleFloorTile(8),
    },
    {
      DEG_0: getMiddleFloorTile(48),
      DEG_90: getMiddleFloorTile(51),
      DEG_180: getMiddleFloorTile(48),
      DEG_270: getMiddleFloorTile(51),
    },
    {
      DEG_0: getMiddleFloorTile(39),
      DEG_90: getMiddleFloorTile(44),
      DEG_180: getMiddleFloorTile(39),
      DEG_270: getMiddleFloorTile(44),
    },
  ],
};
