import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const handleChangeDirection = (e) => {
    if (e.keyCode in DIRECTIONS) {
      gameRef.current.setDirection(searchParams.get('user'), e.keyCode);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const isGameInited = gameRef.current instanceof Game;
      if (!isGameInited) {
        gameRef.current = new Game(canvasRef.current.getContext('2d'));
        gameRef.current.addTarget();
        gameRef.current.addPlayer({
          username: searchParams.get('user'), position: { x: 0, y: 0 }, size: config.CELL_SIZE,
        });
      }
      window.addEventListener('keydown', handleChangeDirection);
    }
    return () => {
      window.removeEventListener('keydown', handleChangeDirection);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
