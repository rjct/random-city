import { buildingMainFloor } from "../../dict/building/mainFloor";
import { buildingMiddleFloor } from "../../dict/building/middleFloor";
import { buildingRoofFlat, buildingRoofGable } from "../../dict/building/roof";
import { randomVariant } from "../helpers";
import { BuildingColor, BuildingRoofType, Direction } from "./constants";
import { encodeStructureState } from "../structures/structureStateEncoder";
import { StructureType } from "../structures/constants";

export function generateEncodedBuilding(seed: number): number {
  const colorIdx = randomVariant(
    seed * 3,
    Object.keys(BuildingColor).length / 2,
  );
  const color = BuildingColor[colorIdx] as keyof typeof BuildingColor;
  const mainFloorStyle = randomVariant(seed, buildingMainFloor[color].length);
  const middleFloorStyle = randomVariant(
    seed * 2,
    buildingMiddleFloor[color].length,
  );
  const flatRoofIdx = randomVariant(seed * 3, buildingRoofFlat.length);
  const gableRoofIdx = randomVariant(seed, buildingRoofGable[color].length);
  const middleFloors = seed - 2;
  const isFlatRoof = middleFloors >= 1;
  const roofType = isFlatRoof ? BuildingRoofType.FLAT : BuildingRoofType.GABLE;
  const directionIdx = randomVariant(seed, Object.keys(Direction).length / 2);

  return encodeStructureState(StructureType.BUILDING, {
    direction: directionIdx,
    color: colorIdx,
    middleFloors,
    roofType,
    mainFloorStyle,
    middleFloorStyle,
    roofStyle: isFlatRoof ? flatRoofIdx : gableRoofIdx,
  });
}
