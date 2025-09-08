import React from 'react';
import { CandyItem } from '@/types/game';

interface CandyObjectProps {
  item: CandyItem;
  position: { x: number; y: number };
  delay?: number;
}

export function CandyObject({ item, position, delay = 0 }: CandyObjectProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-candy-bounce"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">
          ✨
        </div>
      </div>
    </div>
  );
}