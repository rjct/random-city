import {
  BuildingColor,
  BuildingRoofType,
  BuildingStyle,
  Direction,
} from "./constants";
import { buildingMainFloor } from "../../dict/building/mainFloor";
import { buildingMiddleFloor } from "../../dict/building/middleFloor";
import { buildingRoofFlat, buildingRoofGable } from "../../dict/building/roof";

export interface EncodeBuildingArgs {
  direction: Direction;
  color: BuildingColor;
  middleFloors: number;
  roofType: BuildingRoofType;
  mainFloorStyle: BuildingStyle;
  middleFloorStyle: BuildingStyle;
  roofStyle: BuildingStyle;
}

export function encodeBuilding(args: EncodeBuildingArgs): number {
  const {
    direction,
    color,
    middleFloors,
    roofType,
    roofStyle,
    mainFloorStyle,
    middleFloorStyle,
  } = args;

  let encodedState = 0;

  // Encode direction using 2 bits
  encodedState |= direction;

  // Encode color using 2 bits
  encodedState |= color << 2;

  // Encode middle floors (variable count) using 4 bits
  encodedState |= middleFloors << 4;

  // Encode roof type using 1 bit
  encodedState |= roofType << 8;

  // Encode styles using 2 bits each
  encodedState |= mainFloorStyle << 9;
  encodedState |= middleFloorStyle << 11;
  encodedState |= roofStyle << 13;

  return encodedState;
}

export function decodeBuilding(encodedState: number): BuildingStructure {
  const direction = Direction[encodedState & 0b11] as keyof typeof Direction;
  const color = BuildingColor[
    (encodedState >> 2) & 0b11
  ] as keyof typeof BuildingColor;
  const middleFloorsCount = (encodedState >> 4) & 0b1111;
  const roofType = (encodedState >> 8) & 0b1;
  const mainFloorStyle = (encodedState >> 9) & 0b11;
  const middleFloorStyle = (encodedState >> 11) & 0b11;
  const roofStyle = (encodedState >> 13) & 0b11;
  const mainFloor = buildingMainFloor[color][mainFloorStyle][direction];
  const middleFloors = Array.from({ length: middleFloorsCount }).map(() => {
    return buildingMiddleFloor[color][middleFloorStyle][direction];
  });
  const roof =
    roofType === BuildingRoofType.FLAT
      ? buildingRoofFlat[roofStyle][direction]
      : buildingRoofGable[color][roofStyle][direction];

  return [mainFloor, ...middleFloors, roof];
}
