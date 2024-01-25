declare module "lindenmayer";

type CellCoordinates = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type PerlinScale = {
  x: number;
  y: number;
};

type Area = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type GameScene = "mainMenu" | "game" | "pause" | "win" | "lose";
type GameViewport = {
  grid: Area;
  screen: Area;
  visibleCells: { [key: string]: CellCoordinates };
};

type GameViewportScroll = {
  x: number;
  y: number;
};

type Grid = Int32Array;

interface GameState extends CityData {
  deltaTime: number;
  ui: {
    isBusy: boolean;
    generationTime: number;
  };
  grid: Grid;
  miniMapDataUrl: string;
  scene: GameScene;
  viewport: GameViewport;
  scroll: GameViewportScroll;
}

interface CityData {
  seed: number;
  gridSize: Size;
  perlinScale: PerlinScale;
  perlinElevation: number;
  blockSize: number;
}

type NewCityArgs = {
  seed: number;
  gridSize: Size;
  perlinScale: PerlinScale;
  perlinElevation: number;
  blockSize: number;
};

type WorkerResult = {
  percent: number;
  time: number;
  status: "processing" | "complete";
  grid?: Grid;
  miniMapDataUrl?: string;
};

interface GameActions {
  setScene: (scene: GameScene) => void;
  setViewport: (viewport: GameViewport) => void;
  setScroll: (scroll: GameViewportScroll) => void;
  gameLoop: (deltaTime: number) => void;
  newCity: (args: NewCityArgs) => void;
}

type GameStore = GameState & GameActions;

type EntityDirection = "DEG_0" | "DEG_90" | "DEG_180" | "DEG_270";

type StructurePart = {
  src: string;
  size: Size;
};

type BuildingDictEntity = {
  [key in EntityDirection]: StructurePart;
};

type BuildingStructure = StructurePart[];
