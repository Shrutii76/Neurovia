import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface GameMenuProps {
  onSelectMode: (mode: 'clock' | 'pattern') => void;
  candyPoints: number;
}

export const GameMenu = ({ onSelectMode, candyPoints }: GameMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="candy-card max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 animate-bounce-in">
            🏝️ Candy Clock 🏝️
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome to Candy Island!
          </p>
          <div className="mt-4 p-4 bg-gradient-rainbow rounded-2xl">
            <p className="text-white font-bold text-xl">
              🍬 Candy Points: {candyPoints} 🍬
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Button
            onClick={() => onSelectMode('clock')}
            className="candy-button w-full text-xl py-6"
          >
            🧁 Clock Learning 🕐
          </Button>
          
          <Button
            onClick={() => onSelectMode('pattern')}
            className="candy-button w-full text-xl py-6 bg-gradient-to-r from-secondary to-accent"
          >
            🍬 Pattern Challenge 🧩
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>🎯 Learn time with cupcake clocks!</p>
          <p>🧩 Solve candy patterns!</p>
          <p>⭐ Earn stars and candy points!</p>
        </div>
      </Card>
    </div>
  );
};