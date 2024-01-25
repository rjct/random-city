/* eslint-disable */

import Noise from "noise-ts";
import {
  generateEncodedPrimaryRoad,
  generatePrimaryRoadsGrid,
} from "./roads/RoadsGenerator";
import { generateEncodedBuilding } from "./buildings/BuildingGenerator";
import { RoadType } from "../dict/road/road";
import { getMiniMapPixelColor, getNoiseValue } from "./helpers";
import {
  generateEncodedPark,
  generateEncodedWater,
} from "./landscape/LandscapeGenerator";
import { StructureType } from "./structures/constants";

self.onmessage = (e: MessageEvent<NewCityArgs>) => {
  const last = performance.now();
  self.postMessage({
    status: "processing",
    percent: 0,
  });

  const { seed, gridSize, blockSize, perlinScale, perlinElevation } = e.data;
  const { width, height } = gridSize;

  console.group("Creating city");
  console.time("Total");
  const noise = new Noise(seed);
  const grid = new Int32Array(width * height);

  const roadsGrid = generatePrimaryRoadsGrid(grid, gridSize, blockSize, seed);
  const miniMapBuffer = new Uint8ClampedArray(width * height * 4);

  console.time("Encoding");
  let index = 0;
  for (const value of roadsGrid) {
    const y = Math.floor(index / width);
    const x = index % width;
    const miniMapBufferIndex = (y * width + x) * 4;

    const noiseValue = getNoiseValue(
      noise,
      { x, y },
      gridSize,
      perlinScale,
      perlinElevation,
    );

    let color = [0, 0, 0, 0];

    switch (true) {
      case value === 0 && noiseValue > 1:
        roadsGrid[index] = generateEncodedBuilding(noiseValue);
        color = getMiniMapPixelColor(StructureType.BUILDING, noiseValue);

        break;

      case value > 0:
        roadsGrid[index] = generateEncodedPrimaryRoad(
          RoadType[value] as keyof typeof RoadType,
          noiseValue,
        );
        color = getMiniMapPixelColor(StructureType.ROAD, noiseValue);
        break;

      case noiseValue > 0.5:
        roadsGrid[index] = generateEncodedPark(noiseValue);
        color = getMiniMapPixelColor(StructureType.PARK, noiseValue);
        break;

      default:
        roadsGrid[index] = generateEncodedWater(noiseValue);
        color = getMiniMapPixelColor(StructureType.WATER, noiseValue);
    }

    miniMapBuffer[miniMapBufferIndex] = color[0];
    miniMapBuffer[miniMapBufferIndex + 1] = color[1];
    miniMapBuffer[miniMapBufferIndex + 2] = color[2];
    miniMapBuffer[miniMapBufferIndex + 3] = color[3];

    index++;
  }
  console.timeEnd("Encoding");

  console.time("Generate mini map");
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const imageData = ctx!.createImageData(width, height);

  imageData.data.set(miniMapBuffer);
  ctx!.putImageData(imageData, 0, 0);

  canvas.convertToBlob().then((blob) => {
    const dataURL = new FileReaderSync().readAsDataURL(blob);

    console.timeEnd("Generate mini map");
    console.timeEnd("Total");
    console.groupEnd();

    self.postMessage({
      status: "complete",
      grid: roadsGrid,
      miniMapDataUrl: dataURL,
      percent: 100,
      time: performance.now() - last,
    });
  });
};

export {};
