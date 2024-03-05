import { GameObject } from '../../common/interfaces/GameObject';
import { Coordinate, DIRECTIONS } from './types';
import { Cell } from './Cell';
import { config } from './config';

export class Player implements GameObject {
  private username: string = 'unnamed_user';

  private maxLength: number = 2;

  private position: Coordinate;

  private body: Cell[];

  private direction: DIRECTIONS;

  constructor(username: string, position: Coordinate) {
    this.position = position;
    this.username = username;
    this.body = [
      new Cell({ x: this.position.x, y: this.position.y }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
    ];
    this.maxLength = this.body.length;
  }

  reset = () => {
    this.position = {
      x: 0, y: 0,
    };
    this.direction = undefined;
    this.body = [
      new Cell({ x: this.position.x, y: this.position.y }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
    ];
    this.maxLength = this.body.length;
  };

  getHeadPosition = (): Coordinate | null => {
    if (this.body.length === 0) return null;
    return this.body[0].position;
  };

  setDirection = (newDirection: DIRECTIONS) => {
    if (this.direction === DIRECTIONS.TOP && newDirection === DIRECTIONS.BOTTOM) {
      return;
    }
    if (this.direction === DIRECTIONS.RIGHT && newDirection === DIRECTIONS.LEFT) {
      return;
    }
    if (this.direction === DIRECTIONS.BOTTOM && newDirection === DIRECTIONS.TOP) {
      return;
    }
    if (this.direction === DIRECTIONS.LEFT && newDirection === DIRECTIONS.RIGHT) {
      return;
    }
    this.direction = newDirection;
  };

  recieveCell = (newCellPos) => {
    this.body.push(new Cell({
      x: newCellPos.x,
      y: newCellPos.y,
    }, config.CELL_SIZE, 'rgb(0, 255, 0)'));
    this.maxLength = this.body.length;
  };

  appendCell = (newCell) => {
    this.body.unshift(newCell);
    if (this.body.length >= this.maxLength) {
      this.body.pop();
    }
  };

  step = () => {
    if (this.body.length === 0) return;
    if (this.direction === DIRECTIONS.TOP) {
      if ((this.body[0].position.y - config.CELL_SIZE) < 0) {
        this.appendCell(
          new Cell({
            x: this.body[0].position.x,
            y: config.FIELD_HEIGHT - config.CELL_SIZE,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      } else {
        this.appendCell(
          new Cell({
            x: this.body[0].position.x,
            y: this.body[0].position.y - config.CELL_SIZE,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      }
    }
    if (this.direction === DIRECTIONS.RIGHT) {
      if ((this.body[0].position.x + config.CELL_SIZE) === config.FIELD_WIDTH) {
        this.appendCell(
          new Cell({
            x: 0,
            y: this.body[0].position.y,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      } else {
        this.appendCell(
          new Cell({
            x: this.body[0].position.x + config.CELL_SIZE,
            y: this.body[0].position.y,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      }
    }
    if (this.direction === DIRECTIONS.BOTTOM) {
      if ((this.body[0].position.y + config.CELL_SIZE) === config.FIELD_HEIGHT) {
        this.appendCell(
          new Cell({
            x: this.body[0].position.x,
            y: 0,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      } else {
        this.appendCell(
          new Cell({
            x: this.body[0].position.x,
            y: this.body[0].position.y + config.CELL_SIZE,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      }
    }
    if (this.direction === DIRECTIONS.LEFT) {
      if ((this.body[0].position.x - config.CELL_SIZE) < 0) {
        this.appendCell(
          new Cell({
            x: config.FIELD_WIDTH - config.CELL_SIZE,
            y: this.body[0].position.y,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      } else {
        this.appendCell(
          new Cell({
            x: this.body[0].position.x - config.CELL_SIZE,
            y: this.body[0].position.y,
          }, config.CELL_SIZE, 'rgb(0, 255, 0)'),
        );
      }
    }

    const headPositin = this.body[0].position;

    for (let i = 1; i < this.body.length; i += 1) {
      const cheinPosition = this.body[i].position;
      if (cheinPosition.x === headPositin.x && cheinPosition.y === headPositin.y) {
        this.reset();
      }
    }
  };

  draw = (g: CanvasRenderingContext2D) => {
    this.body.forEach((cell) => { cell.draw(g); });
  };
}
