import { road } from "../../dict/road/road";
import { RoadClass, RoadType } from "../../dict/road/road";

export interface EncodeRoadArgs {
  roadClass: RoadClass;
  roadType: RoadType;
  roadStyle: number;
}

export function encodeRoad(args: EncodeRoadArgs): number {
  const { roadClass, roadType, roadStyle } = args;

  let encodedState = 0;

  // Encoding RoadClass (1 bit)
  encodedState |= roadClass << 15;

  // Encoding RoadType (4 bits)
  encodedState |= roadType << 11;

  // Encoding RoadStyle (11 bits)
  encodedState |= roadStyle;

  return encodedState;
}

export function decodeRoad(encodedState: number) {
  const roadClass = RoadClass[
    (encodedState >> 15) & 0b1
  ] as keyof typeof RoadClass;
  const roadType = RoadType[
    (encodedState >> 11) & 0b1111
  ] as keyof typeof RoadType;

  const roadStyle = encodedState & 0b11111111111;

  return [road[roadClass][roadType][roadStyle]];
}
