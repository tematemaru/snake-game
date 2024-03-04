export type Coordinate = {
  x: number,
  y: number,
};

export type Size = {
  width: number,
  height: number,
};

export type PlayerObject = {
  username: string;
  position: Coordinate;
  size: number;
};
// eslint-disable-next-line no-shadow
export enum DIRECTIONS {
  TOP = 38,
  RIGHT = 39,
  BOTTOM = 40,
  LEFT = 37,
}
