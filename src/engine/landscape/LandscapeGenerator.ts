import { encodeStructureState } from "../structures/structureStateEncoder";
import { StructureType } from "../structures/constants";
import { randomVariant } from "../helpers";
import { landscape } from "../../dict/landscape/landscape";

export function generateEncodedPark(seed: number) {
  const parkStyle = randomVariant(seed, landscape.Park.length);

  return encodeStructureState(StructureType.PARK, {
    parkStyle,
  });
}

export function generateEncodedWater(seed: number) {
  const parkStyle = randomVariant(seed, landscape.Water.length);

  return encodeStructureState(StructureType.WATER, {
    parkStyle,
  });
}
