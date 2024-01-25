import { CellComponent } from "./Cell";
import useStore from "../engine/store";
import React from "react";
import { constants } from "../engine/constants";
import { getGridValue } from "../engine/helpers";

export function Board() {
  const { width, height } = useStore((state) => state.gridSize);
  const viewport = useStore((state) => state.viewport.visibleCells);

  const grid = useStore((state) => state.grid);
  const gridSize = useStore((state) => state.gridSize);

  const cells = React.useMemo(() => {
    return Object.entries(viewport).map(([key, coordinates]) => (
      <CellComponent
        key={key}
        coordinates={coordinates}
        value={getGridValue(grid, coordinates, gridSize)}
        gridSize={gridSize}
      />
    ));
  }, [viewport, grid]);

  return (
    <div
      className={"board"}
      style={{
        width: width * constants.DEFAULT_TILE_SIZE.width,
        height:
          (height * constants.DEFAULT_TILE_SIZE.height) / 2 +
          constants.DEFAULT_TILE_SIZE.height / 2,
      }}
    >
      {cells}
    </div>
  );
}
