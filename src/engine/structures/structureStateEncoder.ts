import {
  decodeBuilding,
  encodeBuilding,
  EncodeBuildingArgs,
} from "../buildings/BuildingStateEncoder";
import {
  decodeRoad,
  encodeRoad,
  EncodeRoadArgs,
} from "../roads/RoadStateEncoder";
import { StructureType } from "./constants";
import { blank } from "../../dict/blank";
import {
  decodePark,
  decodeWater,
  EncodeLandscapeArgs,
  encodePark,
  encodeWater,
} from "../landscape/LandscapeStateEncoder";

export function encodeStructureState<
  T extends EncodeBuildingArgs | EncodeRoadArgs | EncodeLandscapeArgs,
>(type: StructureType, params?: T): number {
  let encodedState = 0;

  // Encode structure type using 3 bits
  encodedState |= type;

  switch (type) {
    case StructureType.BLANK:
      return encodedState;

    case StructureType.WATER:
      return (encodedState |= encodeWater(params as EncodeLandscapeArgs) << 3);

    case StructureType.PARK:
      return (encodedState |= encodePark(params as EncodeLandscapeArgs) << 3);

    case StructureType.BUILDING:
      return (encodedState |=
        encodeBuilding(params as EncodeBuildingArgs) << 3);

    case StructureType.ROAD:
      return (encodedState |= encodeRoad(params as EncodeRoadArgs) << 3);

    default:
      throw new Error("Invalid structure type");
  }
}

export function decodeStructureState(encodedState: number): {
  type: StructureType;
  details: StructurePart[];
} {
  const result = {
    type: encodedState & 0b111,
  };

  switch (result.type) {
    case StructureType.BLANK:
      return { ...result, details: [blank] };

    case StructureType.WATER:
      return { ...result, details: decodeWater(encodedState >> 3) };

    case StructureType.PARK:
      return { ...result, details: decodePark(encodedState >> 3) };

    case StructureType.BUILDING:
      return { ...result, details: decodeBuilding(encodedState >> 3) };

    case StructureType.ROAD:
      return { ...result, details: decodeRoad(encodedState >> 3) };

    default:
      throw new Error("Invalid structure type");
  }
}
