import { landscape } from "../../dict/landscape/landscape";

export interface EncodeLandscapeArgs {
  parkStyle: number;
}

export function encodePark(args: EncodeLandscapeArgs): number {
  const { parkStyle } = args;

  let encodedState = 0;

  // Encoding ParkStyle (11 bits)
  encodedState |= parkStyle;

  return encodedState;
}

export function decodePark(encodedState: number) {
  const parkStyle = encodedState & 0b11111111111;

  return [landscape.Park[parkStyle]];
}

export function encodeWater(args: EncodeLandscapeArgs): number {
  const { parkStyle } = args;

  let encodedState = 0;

  // Encoding ParkStyle (11 bits)
  encodedState |= parkStyle;

  return encodedState;
}

export function decodeWater(encodedState: number) {
  const parkStyle = encodedState & 0b11111111111;

  return [landscape.Water[parkStyle]];
}
