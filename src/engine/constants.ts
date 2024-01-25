const ZOOM = 1;
const DEFAULT_TILE_SIZE = {
  width: 128 * ZOOM,
  height: 128 * ZOOM,
};

export const constants = {
  DEFAULTS: {
    seed: 16,
    gridSize: { width: 13, height: 13 },
    perlinScale: { x: 1, y: 1 },
    perlinElevation: 8,
    blockSize: 2,
  },
  FPS: 24,
  ZOOM: 0.5,
  VIEWPORT_CACHE: 2,
  DEFAULT_TILE_SIZE,
  PRIMARY_ROAD_TILE_SIZE: DEFAULT_TILE_SIZE,
  MAIN_FLOOR_TILE_SIZE: DEFAULT_TILE_SIZE,
  MIDDLE_FLOOR_TILE_SIZE: {
    width: 128 * ZOOM,
    height: 85 * ZOOM,
  },
  ROOF_TILE_SIZE: {
    width: 128 * ZOOM,
    height: 85 * ZOOM,
  },
};
