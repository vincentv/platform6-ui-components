import { enumToArray } from "../utils/enum";

export enum Mode {
  danger = 0,
  warning = 1,
  default = 2,
  info = 3,
  success = 4,
  primary = 5,
}

export enum Size {
  small = 0,
  normal = 1,
  medium = 2,
  large = 3,
}

export enum Position {
  top = 0,
  right = 1,
  bottom = 2,
  left = 3,
}

export const modes = enumToArray(Mode);
export const sizes = enumToArray(Size);
export const positions = enumToArray(Position);
