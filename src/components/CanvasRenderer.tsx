import React, { useEffect, useRef } from 'react';
import { Game } from '../core/game/Game';
import { config } from '../core/game/config';
import { DIRECTIONS } from '../core/game/types';

interface ICanvasRendererProps {
  width: number;
  height: number;
}

export const CanvasRenderer = ({
  width,
  height,
}: ICanvasRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);

  const handleChangeDirection = (e) => {
    if (e.keyCode in DIRECTIONS) {
      gameRef.current.setDirection('player_1', e.keyCode);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      gameRef.current = new Game();
      gameRef.current.draw(canvasRef.current.getContext('2d'));
      gameRef.current.addTarget({ x: 5, y: 10 });
      gameRef.current.addTarget({ x: 15, y: 8 });
      gameRef.current.addTarget({ x: 11, y: 6 });
      gameRef.current.addTarget({ x: 15, y: 11 });
      gameRef.current.addTarget({ x: 19, y: 8 });
      gameRef.current.addPlayer({
        username: 'player_1', position: { x: 0, y: 0 }, size: config.CELL_SIZE,
      });
      window.addEventListener('keydown', handleChangeDirection);
    }
    return () => {
      window.removeEventListener('keydown', handleChangeDirection);
    };
  }, []);

  return (
    <canvas
      className="outline-dashed"
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};
