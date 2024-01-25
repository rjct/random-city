import { randomVariant } from "../helpers";
import { encodeStructureState } from "../structures/structureStateEncoder";
import { RoadClass, RoadType, road } from "../../dict/road/road";
import { StructureType } from "../structures/constants";

enum MazeMarks {
  Wall = 0,
  WalkablePath = -1,
}

export function generatePrimaryRoadsGrid(
  grid: Grid,
  gridSize: Size,
  blockSize: number,
  seed: number,
) {
  generateMaze(seed, grid, gridSize, blockSize);
  detectRoadTypes(grid, gridSize);
  detectRoadIntersections(grid, gridSize);

  return grid;
}

function generateMaze(seed: number, maze: Grid, size: Size, stepSize: number) {
  console.time("Generate maze");

  const { width, height } = size;

  const end = { x: 5, y: 10 };
  const start = { x: width - 1, y: height - 1 };

  const random = (m = 1): number => {
    seed = (seed * 16807) % 2147483647;
    return ((seed - 1) / 2147483646) * m;
  };

  recursiveBacktracking(start, end, stepSize);

  function recursiveBacktracking(
    start: CellCoordinates,
    end: CellCoordinates,
    stepSize: number,
  ) {
    const stack = [start];

    while (stack.length > 0) {
      const current = stack.pop()!;
      const { x, y } = current;

      maze[y * width + x] = MazeMarks.WalkablePath;

      const directions = [
        { dx: 0, dy: -stepSize },
        { dx: 0, dy: stepSize },
        { dx: -stepSize, dy: 0 },
        { dx: stepSize, dy: 0 },
      ].toSorted(() => random() - 0.5);

      for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;

        if (isValid(nx, ny) && maze[ny * width + nx] === MazeMarks.Wall) {
          for (let i = 0; i <= stepSize; i++) {
            for (let j = 0; j <= stepSize; j++) {
              maze[
                (y + (i * dir.dy) / stepSize) * width +
                  (x + (j * dir.dx) / stepSize)
              ] = MazeMarks.WalkablePath;
            }
          }
          stack.push({ x: nx, y: ny });

          // Check if the end point is reached, and break the loop if so
          if (nx === end.x && ny === end.y) {
            // stack.length = 0;
            // break;
          }
        }
      }
    }
  }

  function isValid(x: number, y: number): boolean {
    return x >= 0 && x < width && y >= 0 && y < height;
  }

  console.timeEnd("Generate maze");
}

export function detectRoadTypes(grid: Grid, size: Size): void {
  console.time("Detect vertical & horizontal roads");

  const { width, height } = size;

  let index = 0;
  for (const value of grid) {
    const y = Math.floor(index / width);
    const x = index % width;

    if (value) {
      const isVertical =
        (y > 0 && grid[(y - 1) * width + x] === -1) ||
        (y < height - 1 && grid[(y + 1) * width + x] === -1);
      const isHorizontal =
        (x > 0 && grid[y * width + x - 1] === -1) ||
        (x < width - 1 && grid[y * width + x + 1] === -1);

      if (isVertical || isHorizontal) {
        grid[index] = isVertical ? RoadType.Vertical : RoadType.Horizontal;
      }
    }

    index++;
  }

  console.timeEnd("Detect vertical & horizontal roads");
}

function detectRoadIntersections(grid: Grid, gridSize: Size) {
  console.time("Detect intersections");

  const { width } = gridSize;

  let index = 0;
  for (const _value of grid) {
    const y = Math.floor(index / width);
    const x = index % width;

    if (_isVHRoad(grid, gridSize, { x, y })) {
      const intersectionType = _detectIntersectionType(grid, gridSize, {
        x,
        y,
      });

      if (intersectionType) {
        grid[index] = intersectionType;
      }
    }

    index++;
  }
  console.timeEnd("Detect intersections");
}

function _isVHRoad(
  grid: Grid,
  gridSize: Size,
  coordinates: CellCoordinates,
): boolean {
  const { width, height } = gridSize;
  const { x, y } = coordinates;

  return (
    x >= 0 &&
    x < width &&
    y >= 0 &&
    y < height &&
    (grid[x + y * width] === RoadType.Horizontal ||
      grid[x + y * width] === RoadType.Vertical ||
      grid[x + y * width] === -1)
  );
}

function _detectIntersectionType(
  grid: Grid,
  gridSize: Size,
  coordinates: CellCoordinates,
): RoadType | null {
  const { x, y } = coordinates;

  const isRoadL = _isVHRoad(grid, gridSize, { x: x - 1, y });
  const isRoadT = _isVHRoad(grid, gridSize, { x, y: y - 1 });
  const isRoadR = _isVHRoad(grid, gridSize, { x: x + 1, y });
  const isRoadB = _isVHRoad(grid, gridSize, { x, y: y + 1 });

  switch (true) {
    case isRoadL && isRoadT && isRoadR && isRoadB:
      return RoadType.Crossroad;

    case !isRoadL && !isRoadT && isRoadR && isRoadB:
      return RoadType.TurnUpLeft;

    case isRoadL && !isRoadT && !isRoadR && isRoadB:
      return RoadType.TurnUpRight;

    case isRoadL && isRoadT && !isRoadR && !isRoadB:
      return RoadType.TurnDownRight;

    case !isRoadL && isRoadT && isRoadR && !isRoadB:
      return RoadType.TurnDownLeft;

    case !isRoadL && isRoadT && isRoadR && isRoadB:
      return RoadType.TCrossRight;

    case isRoadL && !isRoadT && isRoadR && isRoadB:
      return RoadType.TCrossUp;

    case isRoadL && isRoadT && !isRoadR && isRoadB:
      return RoadType.TCrossLeft;

    case isRoadL && isRoadT && isRoadR && !isRoadB:
      return RoadType.TCrossDown;

    case !isRoadL && isRoadT && !isRoadR && !isRoadB:
      return RoadType.DeadEndUp;

    case isRoadL && !isRoadT && !isRoadR && !isRoadB:
      return RoadType.DeadEndRight;

    default:
      return null;
  }
}

export function generateEncodedPrimaryRoad(
  type: keyof typeof RoadType,
  seed: number,
): number {
  const roadClass = RoadClass.PRIMARY;
  const roadType = RoadType[type];
  const roadStyle = randomVariant(seed, road.PRIMARY[type].length);

  return encodeStructureState(StructureType.ROAD, {
    roadClass,
    roadType,
    roadStyle,
  });
}
