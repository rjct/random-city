import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import { Seed } from "./controls/Seed";
import { PerlinScale } from "./controls/PerlinScale";
import { PerlinElevation } from "./controls/PerlinElevation";
import { GridSize } from "./controls/GridSize";
import { BlockSize } from "./controls/BlockSize";
import useStore from "../../engine/store";
import React from "react";
import { RandomButton } from "./RandomButton";

export function Settings() {
  const newCity = useStore((state) => state.newCity);

  const [seed, setSeed] = React.useState(useStore((state) => state.seed));
  const [gridSize, setGridSize] = React.useState(
    useStore((state) => state.gridSize),
  );
  const [perlinScale, setPerlinScale] = React.useState(
    useStore((state) => state.perlinScale),
  );
  const [perlinElevation, setPerlinElevation] = React.useState(
    useStore((state) => state.perlinElevation),
  );
  const [blockSize, setBlockSize] = React.useState<number>(
    useStore((state) => state.blockSize),
  );

  const handleChange = (args: NewCityArgs) => {
    setSeed(args.seed);
    setGridSize(args.gridSize);
    setPerlinScale(args.perlinScale);
    setPerlinElevation(args.perlinElevation);
    setBlockSize(args.blockSize);

    newCity(args);
  };

  React.useEffect(() => {
    newCity({
      seed,
      gridSize,
      perlinScale,
      perlinElevation,
      blockSize,
    });
  }, []);

  return (
    <>
      <Box className={"settings"}>
        <FormControl>
          <FormLabel>Seed</FormLabel>
          <Seed
            key={seed}
            value={seed}
            onChange={(seed) =>
              handleChange({
                seed,
                gridSize,
                perlinScale,
                perlinElevation,
                blockSize,
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>City size</FormLabel>
          <GridSize
            key={gridSize.width}
            value={gridSize}
            onChange={(gridSize) =>
              handleChange({
                seed,
                gridSize,
                perlinScale,
                perlinElevation,
                blockSize,
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Perlin scale</FormLabel>
          <PerlinScale
            value={perlinScale}
            onChange={(perlinScale) =>
              handleChange({
                seed,
                gridSize,
                perlinScale,
                perlinElevation,
                blockSize,
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Perlin elevation</FormLabel>

          <PerlinElevation
            value={perlinElevation}
            onChange={(perlinElevation) =>
              handleChange({
                seed,
                gridSize,
                perlinScale,
                perlinElevation,
                blockSize,
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Block size</FormLabel>
          <BlockSize
            value={blockSize}
            onChange={(blockSize) =>
              handleChange({
                seed,
                gridSize,
                perlinScale,
                perlinElevation,
                blockSize,
              })
            }
          />
        </FormControl>
      </Box>

      <Box sx={{ display: "flex" }}>
        <RandomButton onClick={(args) => handleChange(args)} />
      </Box>
    </>
  );
}
