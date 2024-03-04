import { GameObject } from '../../common/interfaces/GameObject';
import { Player } from './Player';
import { Grid } from './Grid';
import { Target } from './Target';

import { config } from './config';

import { PlayerObject, DIRECTIONS, Coordinate } from './types';

export class Game implements GameObject {
  private players = [];

  private grid: Grid;

  private targets: Target[] = [];

  private frames = 0;

  private timeScale = 8;

  constructor() {
    this.grid = new Grid(config.FIELD_WIDTH, config.FIELD_HEIGHT, config.CELL_SIZE);
  }

  public setDirection = (player: string, newDirection: DIRECTIONS) => {
    this.players.forEach((p) => {
      if (p.username === player) {
        p.setDirection(newDirection);
      }
    });
  };

  public addPlayer = (newPlayer: PlayerObject) => {
    this.players.push(new Player(newPlayer.username, newPlayer.position));
  };

  public addTarget = (position: Coordinate) => {
    this.targets.push(new Target({
      x: position.x * config.CELL_SIZE,
      y: position.y * config.CELL_SIZE,
    }));
  };

  gameLoop = () => {
    this.players.forEach((pl) => {
      const head = pl.getHeadPosition();
      const target = this.targets.find((t) => t.getPosition().x === head.x && t.getPosition().y === head.y);
      if (target) {
        const index = this.targets.indexOf(target);
        if (index !== -1) {
          this.targets.splice(index, 1);
          pl.recieveCell(target.getPosition());
        }
      }
      pl.step();
    });
  };

  public draw = (g: CanvasRenderingContext2D) => {
    requestAnimationFrame(() => {
      this.draw(g);
      this.frames += 1;
      if (this.frames < this.timeScale) {
        return;
      }
      this.gameLoop();
      this.frames = 0;
      g.clearRect(0, 0, config.FIELD_WIDTH, config.FIELD_HEIGHT);
      this.grid.draw(g);
      this.targets.forEach((t) => {
        t.draw(g);
      });
      this.players.forEach((p) => {
        p.draw(g);
      });
    });
  };
}
