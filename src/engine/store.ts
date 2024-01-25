import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { constants } from "./constants";
import { decodeCityData, encodeCityData, getUrlParamValue } from "./helpers";

let worker: Worker;

const defaults = decodeCityData(getUrlParamValue("")) || constants.DEFAULTS;

export const useStore = create<GameStore>()(
  immer((set) => ({
    ...defaults,
    scene: "mainMenu",
    ui: {
      isBusy: false,
      generationTime: 0,
    },
    deltaTime: 0,

    grid: new Int32Array(),
    miniMapDataUrl: "",

    viewport: {
      grid: { x1: 0, y1: 0, x2: 0, y2: 0 },
      screen: { x1: 0, y1: 0, x2: 0, y2: 0 },
      visibleCells: {},
    },
    scroll: {
      x: 0,
      y: 0,
    },

    //
    setScene: (scene: GameScene) => set(() => ({ scene })),
    setViewport: (viewport: GameViewport) => set(() => ({ viewport })),
    setScroll: (scroll) => set(() => ({ scroll })),
    gameLoop: (deltaTime) => set(() => ({ deltaTime })),
    newCity: (args: NewCityArgs) => {
      if (worker) worker.terminate();

      worker = new Worker(new URL("./encoder.worker.ts", import.meta.url), {
        type: "module",
      });

      worker.onmessage = (e: MessageEvent<WorkerResult>) => {
        switch (e.data.status) {
          case "processing":
            set(() => {
              return {
                ui: {
                  isBusy: true,
                },
              };
            });
            break;

          default:
            set(() => {
              const url = new URL(window.location.href);
              url.searchParams.set("", encodeCityData(args));
              window.history.replaceState({}, "", url);

              return {
                ui: {
                  isBusy: false,
                  generationTime: e.data.time,
                },
                seed: args.seed,
                perlinScale: args.perlinScale,
                perlinElevation: args.perlinElevation,
                blockSize: args.blockSize,
                gridSize: args.gridSize,
                grid: e.data.grid,
                miniMapDataUrl: e.data.miniMapDataUrl,
              };
            });
        }
      };

      worker.postMessage(args);
    },
  })),
);

export default useStore;
