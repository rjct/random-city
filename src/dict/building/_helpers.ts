export const createBuildingTileSrc = (
  num: number,
  type: "main" | "middle" | "roof",
) =>
  `assets/buildings/${type}/buildingTiles_${num
    .toString()
    .padStart(3, "0")
    .slice(-3)}.png`;
