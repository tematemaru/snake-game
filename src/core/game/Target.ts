import { GameObject } from '../../common/interfaces/GameObject';
import { Cell } from './Cell';
import { config } from './config';

import { Coordinate } from './types';

export class Target implements GameObject {
  private position: Coordinate = { x: 0, y: 0 };

  private apple: Cell;

  constructor(position: Coordinate) {
    this.position = position;
    this.apple = new Cell(position, config.CELL_SIZE, 'red');
  }

  getPosition = (): Coordinate => this.position;

  draw = (g: CanvasRenderingContext2D) => {
    this.apple.draw(g);
  };
}
