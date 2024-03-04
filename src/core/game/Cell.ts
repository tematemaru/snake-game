import { GameObject } from '../../common/interfaces/GameObject';
import { Coordinate } from './types';

export class Cell implements GameObject {
  public position: Coordinate;

  private size: number;

  private color: string;

  constructor(position: Coordinate, size: number, color: string) {
    this.position = position;
    this.size = size;
    this.color = color;
  }

  draw = (g: CanvasRenderingContext2D) => {
    /* eslint no-param-reassign: "error" */
    g.fillStyle = this.color;
    g.fillRect(this.position.x, this.position.y, this.size, this.size);
    g.strokeStyle = 'rgba(0, 0, 0, .2)';
    g.strokeRect(this.position.x, this.position.y, this.size, this.size);
    g.fillStyle = '';
  };
}
