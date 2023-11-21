import React from 'react';
import { useGameContext } from '../hooks/useGameContext.ts';

export const Score: React.FC = () => {
  const { score } = useGameContext();

  return (
    <span className="text-6xl">
      {`Score: ${score}`}
    </span>
  );
};
