import { createBuildingTileSrc } from "./_helpers";
import { BuildingColor } from "../../engine/buildings/constants";
import { constants } from "../../engine/constants";

const getMainFloorTile = (num: number) => ({
  src: createBuildingTileSrc(num, "main"),
  size: constants.MAIN_FLOOR_TILE_SIZE,
});

const MAIN_FLOOR_FALLBACK_TILE = getMainFloorTile(85);

export const buildingMainFloor: {
  [color in keyof typeof BuildingColor]: BuildingDictEntity[];
} = {
  COMMON: [
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(116),
      DEG_180: getMainFloorTile(109),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(3),
      DEG_180: getMainFloorTile(125),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(124),
      DEG_180: getMainFloorTile(117),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(42),
      DEG_180: getMainFloorTile(37),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: getMainFloorTile(35),
      DEG_90: getMainFloorTile(100),
      DEG_180: getMainFloorTile(108),
      DEG_270: getMainFloorTile(27),
    },
    {
      DEG_0: getMainFloorTile(35),
      DEG_90: getMainFloorTile(28),
      DEG_180: getMainFloorTile(20),
      DEG_270: getMainFloorTile(27),
    },
    {
      DEG_0: getMainFloorTile(114),
      DEG_90: getMainFloorTile(107),
      DEG_180: getMainFloorTile(115),
      DEG_270: getMainFloorTile(122),
    },
    {
      DEG_0: getMainFloorTile(19),
      DEG_90: getMainFloorTile(12),
      DEG_180: getMainFloorTile(4),
      DEG_270: getMainFloorTile(11),
    },
  ],
  RED: [
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(1),
      DEG_180: getMainFloorTile(123),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(17),
      DEG_180: getMainFloorTile(10),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(9),
      DEG_180: getMainFloorTile(2),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(36),
      DEG_180: getMainFloorTile(30),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: getMainFloorTile(33),
      DEG_90: getMainFloorTile(26),
      DEG_180: getMainFloorTile(18),
      DEG_270: getMainFloorTile(25),
    },
    {
      DEG_0: getMainFloorTile(46),
      DEG_90: getMainFloorTile(41),
      DEG_180: getMainFloorTile(34),
      DEG_270: getMainFloorTile(40),
    },
    {
      DEG_0: getMainFloorTile(92),
      DEG_90: getMainFloorTile(99),
      DEG_180: getMainFloorTile(113),
      DEG_270: getMainFloorTile(106),
    },
  ],
  BROWN: [
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(93),
      DEG_180: getMainFloorTile(101),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(21),
      DEG_180: getMainFloorTile(14),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
  ],
  OLIVE: [
    {
      DEG_0: MAIN_FLOOR_FALLBACK_TILE,
      DEG_90: getMainFloorTile(29),
      DEG_180: getMainFloorTile(22),
      DEG_270: MAIN_FLOOR_FALLBACK_TILE,
    },
  ],
};
