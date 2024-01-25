import { constants } from "../engine/constants";

import React from "react";

import { getZIndex, gridToScreenSpace } from "../engine/helpers";
import { decodeStructureState } from "../engine/structures/structureStateEncoder";

export const CellComponent = React.memo(
  (props: { coordinates: CellCoordinates; value: number; gridSize: Size }) => {
    if (!props.value) return null;

    const structure = decodeStructureState(props.value);
    const entity = structure.details
      ? {
          position: {
            grid: props.coordinates,
            screen: gridToScreenSpace(props.coordinates, props.gridSize),
          },
          zIndex: getZIndex(props.coordinates),
          structure: structure.details,
        }
      : null;

    if (!entity) return null;

    return (
      <div
        className={"cell"}
        data-cell={`${entity.position.grid.x}:${entity.position.grid.y}`}
        style={{
          ...constants.DEFAULT_TILE_SIZE,
          transform: `translate3d(${entity.position.screen.x}px, ${entity.position.screen.y}px, 0)`,
          zIndex: entity.zIndex,
        }}
      >
        {entity.structure.map((layer, index) => {
          if (!layer) return null;

          const elevation = (index * layer.size.height) / 2.6;

          return (
            <div
              key={index}
              style={{
                ...layer.size,
                backgroundImage: `url(${layer.src})`,
                transform: `translateY(-${elevation}px)`,
              }}
            ></div>
          );
        })}
      </div>
    );
  },
);
