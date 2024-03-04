import { GameObject } from '../../common/interfaces/GameObject';

export class Grid implements GameObject {
  private width = 0;

  private height = 0;

  private step = 10;

  constructor(width: number, height: number, step: number) {
    this.width = width;
    this.height = height;
    this.step = step;
  }

  draw = (g: CanvasRenderingContext2D) => {
    /* eslint no-param-reassign: "error" */
    g.lineWidth = 1;
    g.strokeStyle = 'rgb(0, 0, 0)';
    g.globalAlpha = 0.25;
    for (let vert = 0; vert < this.width; vert += this.step) {
      g.beginPath();
      g.moveTo(vert, 0);
      g.lineTo(vert, this.height);
      g.stroke();
      g.closePath();
    }

    for (let col = 0; col < this.height; col += this.step) {
      g.beginPath();
      g.moveTo(0, col);
      g.lineTo(this.width, col);
      g.stroke();
      g.closePath();
    }
    g.globalAlpha = 1;
  };
}
