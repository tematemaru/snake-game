'use client';

import React from 'react';
import { config } from '../core/game/config';
import { useGameContext } from '../hooks/useGameContext';
import { Score } from './Score';
import { Button } from './Button';
import { MobileButtons } from './MobileButtons';
import { CanvasRenderer } from './CanvasRenderer';

const GameManager: React.FC = () => {
  const {
    onBackClick,
  } = useGameContext();

  return (
    <>
      <Score />
      <CanvasRenderer width={config.FIELD_WIDTH} height={config.FIELD_HEIGHT} />
      <MobileButtons />
      <div>
        <Button className="px-[2.2rem]" onClick={onBackClick}>
          Back to menu
        </Button>
      </div>
    </>
  );
};

export { GameManager };
