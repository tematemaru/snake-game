import { GameObject } from '../../common/interfaces/GameObject';
import { Player } from './Player';
import { Grid } from './Grid';
import { Target } from './Target';

import { config } from './config';

import { getRandomInt } from './utills';

import { PlayerObject, DIRECTIONS } from './types';

export class Game implements GameObject {
  private players = [];

  private grid: Grid;

  private targets: Target[] = [];

  private frames;

  private timeScale;

  private maxTargetCount;

  private score;

  private ctx;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
    this.frames = 0;
    this.timeScale = 15;
    this.score = 0;
    this.maxTargetCount = 1;
    this.grid = new Grid(config.FIELD_WIDTH, config.FIELD_HEIGHT, config.CELL_SIZE);
    this.draw(this.ctx);
  }

  public reset = () => {
    this.players = [];
    this.targets = [];
    this.frames = 0;
    this.timeScale = 15;
    this.score = 0;
    this.maxTargetCount = 1;
  };

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

  public addTarget = () => {
    for (let i = 0; i < this.maxTargetCount - this.targets.length; i += 1) {
      this.targets.push(new Target({
        x: getRandomInt(1, config.FIELD_WIDTH / config.CELL_SIZE - 1) * config.CELL_SIZE,
        y: getRandomInt(1, config.FIELD_HEIGHT / config.CELL_SIZE - 1) * config.CELL_SIZE,
      }));
    }
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
          this.score += 10;
          if (this.timeScale > 8) {
            this.timeScale -= 1;
          }
          if (this.targets.length < this.maxTargetCount) {
            this.addTarget();
          }
        }
      }
      pl.step();
    });
  };

  public draw = (g: CanvasRenderingContext2D) => {
    requestAnimationFrame(() => {
      this.draw(g);
      if (this.frames < this.timeScale) {
        this.frames += 1;
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
