import { createBuildingTileSrc } from "./_helpers";
import { BuildingColor } from "../../engine/buildings/constants";
import { constants } from "../../engine/constants";

const getRoofTile = (num: number) => ({
  src: createBuildingTileSrc(num, "roof"),
  size: constants.ROOF_TILE_SIZE,
});

export const buildingRoofFlat: BuildingDictEntity[] = [
  {
    DEG_0: getRoofTile(120),
    DEG_90: getRoofTile(120),
    DEG_180: getRoofTile(120),
    DEG_270: getRoofTile(120),
  },
  {
    DEG_0: getRoofTile(121),
    DEG_90: getRoofTile(121),
    DEG_180: getRoofTile(121),
    DEG_270: getRoofTile(121),
  },
  {
    DEG_0: getRoofTile(128),
    DEG_90: getRoofTile(128),
    DEG_180: getRoofTile(128),
    DEG_270: getRoofTile(128),
  },
  {
    DEG_0: getRoofTile(87),
    DEG_90: getRoofTile(94),
    DEG_180: getRoofTile(86),
    DEG_270: getRoofTile(79),
  },
  {
    DEG_0: getRoofTile(103),
    DEG_90: getRoofTile(110),
    DEG_180: getRoofTile(102),
    DEG_270: getRoofTile(95),
  },
  {
    DEG_0: getRoofTile(111),
    DEG_90: getRoofTile(119),
    DEG_180: getRoofTile(126),
    DEG_270: getRoofTile(118),
  },
  {
    DEG_0: getRoofTile(13),
    DEG_90: getRoofTile(5),
    DEG_180: getRoofTile(127),
    DEG_270: getRoofTile(6),
  },
];

export const buildingRoofGable: {
  [color in keyof typeof BuildingColor]: BuildingDictEntity[];
} = {
  COMMON: [
    {
      DEG_0: getRoofTile(59),
      DEG_90: getRoofTile(61),
      DEG_180: getRoofTile(58),
      DEG_270: getRoofTile(57),
    },
  ],
  RED: [
    {
      DEG_0: getRoofTile(75),
      DEG_90: getRoofTile(82),
      DEG_180: getRoofTile(74),
      DEG_270: getRoofTile(69),
    },
    {
      DEG_0: getRoofTile(91),
      DEG_90: getRoofTile(98),
      DEG_180: getRoofTile(90),
      DEG_270: getRoofTile(83),
    },
  ],
  BROWN: [
    {
      DEG_0: getRoofTile(89),
      DEG_90: getRoofTile(96),
      DEG_180: getRoofTile(88),
      DEG_270: getRoofTile(81),
    },
    {
      DEG_0: getRoofTile(105),
      DEG_90: getRoofTile(112),
      DEG_180: getRoofTile(104),
      DEG_270: getRoofTile(97),
    },
  ],
  OLIVE: [
    {
      DEG_0: getRoofTile(66),
      DEG_90: getRoofTile(70),
      DEG_180: getRoofTile(65),
      DEG_270: getRoofTile(62),
    },
    {
      DEG_0: getRoofTile(77),
      DEG_90: getRoofTile(84),
      DEG_180: getRoofTile(76),
      DEG_270: getRoofTile(71),
    },
  ],
};
