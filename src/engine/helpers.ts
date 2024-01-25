import { constants } from "./constants";
import Noise from "noise-ts";
import { StructureType } from "./structures/constants";

export function getNoiseValue(
  noise: Noise,
  coordinates: CellCoordinates,
  gridSize: Size,
  perlinScale: PerlinScale,
  perlinElevation: number,
) {
  const perlinX = coordinates.x / gridSize.width / perlinScale.x;
  const perlinY = coordinates.y / gridSize.height / perlinScale.y;

  return Math.abs(noise.perlin2(perlinX, perlinY)) * perlinElevation;
}

export function getGridValue(
  grid: Grid,
  coordinates: CellCoordinates,
  gridSize: Size,
): number {
  const { x, y } = coordinates;

  return grid[y * gridSize.width + x];
}

export function getZIndex(coordinates: CellCoordinates) {
  return coordinates.x + coordinates.y + 1;
}

export function gridToScreenSpace(gridPos: CellCoordinates, mapSize: Size) {
  const { x, y } = gridPos;
  const { width, height } = constants.DEFAULT_TILE_SIZE;

  return {
    x: (x - y) * (width / 2) + (mapSize.width / 2 - 0.5) * width,
    y: ((x + y) * (height / 2)) / 2,
  };
}

export function getVisibleIsometricGridCells(
  boundingBox: { x1: number; y1: number; x2: number; y2: number },
  mapSize: Size,
  offscreenTileCacheSize = constants.VIEWPORT_CACHE,
) {
  const tileWidth = constants.DEFAULT_TILE_SIZE.width;
  const tileHeight = constants.DEFAULT_TILE_SIZE.height / 2;
  const halfWidth = tileWidth / 2;
  const halfHeight = tileHeight / 2;
  const cacheH = offscreenTileCacheSize * tileWidth;
  const cacheV = offscreenTileCacheSize * tileHeight;

  const visibleCells: { [key: string]: CellCoordinates } = {};

  let x1 = mapSize.width;
  let y1 = mapSize.height;
  let x2 = 0;
  let y2 = 0;

  for (let x = 0; x < mapSize.width; x++) {
    for (let y = 0; y < mapSize.height; y++) {
      const cellCenterX =
        (x - y) * halfWidth + (mapSize.width / 2 - 0.5) * tileWidth;
      const cellCenterY = (x + y) * halfHeight;

      if (
        cellCenterX >= boundingBox.x1 - cacheH &&
        cellCenterY >= boundingBox.y1 - cacheV - tileHeight &&
        cellCenterX <= boundingBox.x2 + cacheH - tileWidth &&
        cellCenterY <= boundingBox.y2 + cacheV - tileHeight
      ) {
        x1 = Math.min(x1, x);
        y1 = Math.min(y1, y);
        x2 = Math.max(x2, x);
        y2 = Math.max(y2, y);

        visibleCells[`${x}:${y}`] = { x, y };
      }
    }
  }

  return { grid: { x1, y1, x2, y2 }, visibleCells: visibleCells };
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomVariant(seed: number, maxVariants: number): number {
  return Math.floor(Math.abs(Math.sin(seed) * 10000)) % maxVariants;
}

export function encodeCityData(data: CityData): string {
  return btoa(JSON.stringify(data));
}

export function decodeCityData(encodedString: string): CityData | null {
  try {
    return JSON.parse(atob(encodedString)) as CityData;
  } catch (error) {
    return null;
  }
}

export function getUrlParamValue(param: string) {
  const url = new URL(window.location.href);
  const urlParamValue = url.searchParams.get(param);

  return urlParamValue || "";
}

export function getMiniMapPixelColor(type: StructureType, elevation: number) {
  const dict = {
    [StructureType.BLANK]: [0, 0, 0, 0],
    [StructureType.BUILDING]: [188, 141, 94, elevation * 60 + 40],
    [StructureType.ROAD]: [104, 104, 104, 255],
    [StructureType.WATER]: [155, 211, 224, 255],
    [StructureType.PARK]: [216, 211, 191, 255],
  };

  return dict[type];
}
