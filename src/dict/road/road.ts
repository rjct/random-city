import { constants } from "../../engine/constants";

export enum RoadClass {
  PRIMARY = 0,
  SECONDARY = 1,
}

export enum RoadType {
  Horizontal = 1,
  Vertical = 2,
  Crossroad = 3,
  TCrossUp = 4,
  TCrossDown = 5,
  TCrossLeft = 6,
  TCrossRight = 7,
  TurnUpLeft = 8,
  TurnUpRight = 9,
  TurnDownLeft = 10,
  TurnDownRight = 11,
  DeadEndUp = 12,
  DeadEndDown = 13,
  DeadEndLeft = 14,
  DeadEndRight = 15,
}

const createRoadTileSrc = (num: number, type: "primary" | "secondary") =>
  `assets/roads/${type}/cityTiles_${num
    .toString()
    .padStart(3, "0")
    .slice(-3)}.png`;

const convertPrimaryRoadFunc = (num: number) => ({
  src: createRoadTileSrc(num, "primary"),
  size: constants.PRIMARY_ROAD_TILE_SIZE,
});

const convertSecondaryRoadFunc = (num: number) => ({
  src: createRoadTileSrc(num, "secondary"),
  size: constants.DEFAULT_TILE_SIZE,
});

export const road: {
  [roadClass in keyof typeof RoadClass]: {
    [roadType in keyof typeof RoadType]: StructurePart[];
  };
} = {
  PRIMARY: {
    Horizontal: [73, 6, 2, 106, 64, 36, 57, 58, 92, 77, 70, 71, 73, 91].map(
      convertPrimaryRoadFunc,
    ),
    Vertical: [81, 0, 3, 112, 56, 44, 50, 65, 85, 84, 78, 99].map(
      convertPrimaryRoadFunc,
    ),
    Crossroad: [89, 82].map(convertPrimaryRoadFunc),
    TCrossUp: [96].map(convertPrimaryRoadFunc),
    TCrossDown: [103].map(convertPrimaryRoadFunc),
    TCrossLeft: [88].map(convertPrimaryRoadFunc),
    TCrossRight: [95].map(convertPrimaryRoadFunc),
    TurnUpLeft: [122].map(convertPrimaryRoadFunc),
    TurnUpRight: [125].map(convertPrimaryRoadFunc),
    TurnDownLeft: [124].map(convertPrimaryRoadFunc),
    TurnDownRight: [126].map(convertPrimaryRoadFunc),
    DeadEndUp: [116].map(convertPrimaryRoadFunc),
    DeadEndDown: [110].map(convertPrimaryRoadFunc),
    DeadEndLeft: [104].map(convertPrimaryRoadFunc),
    DeadEndRight: [111].map(convertPrimaryRoadFunc),
  },
  SECONDARY: {
    Horizontal: [10].map(convertSecondaryRoadFunc),
    Vertical: [5].map(convertSecondaryRoadFunc),
    Crossroad: [],
    TCrossUp: [],
    TCrossDown: [],
    TCrossLeft: [],
    TCrossRight: [],
    TurnUpLeft: [],
    TurnUpRight: [],
    TurnDownLeft: [],
    TurnDownRight: [],
    DeadEndUp: [],
    DeadEndDown: [],
    DeadEndLeft: [],
    DeadEndRight: [],
  },
};
