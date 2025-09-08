import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameInstructionsProps {
  onStart: () => void;
}

export function GameInstructions({ onStart }: GameInstructionsProps) {
  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/30 shadow-magical p-8 text-center  mx-auto">
      <div className="text-6xl mb-6 animate-float">🍭</div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-candy bg-clip-text text-red-700 font-cursive mb-4">
        Quick Count Challenge
      </h1>
      
      <p className="text-lg text-muted-foreground mb-2">Age Group: 6-12 years 🎮</p>
      
      <div className="bg-primary/10 rounded-xl p-6 mb-8 border border-primary/20">
        <h2 className="text-2xl font-bold text-primary mb-4">How to Play</h2>
        <div className="space-y-3 text-left">
          <p className="flex items-start gap-3">
            <span className="text-xl">👀</span>
            <span>You will see some fun objects for a short time.</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-xl">⚡</span>
            <span>Count them quickly before they disappear!</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <span>Then tap the correct number.</span>
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-primary mb-4">Welcome to Candy Land! 🏰</h3>
        <p className="text-muted-foreground leading-relaxed">
          Step into a magical world filled with delicious treats! In this enchanted candy land, 
          colorful sweets dance and play hide-and-seek. Your mission is to count the magical 
          candies, cherries, chocolates, donuts, ice creams, and lollipops as they appear 
          and disappear like magic! ✨
        </p>
      </div>

      <Button 
        // variant="candy" 
        size="lg" 
        onClick={onStart}
        className="text-xl px-8 py-4 animate-pulse-glow"
      >
        Let's Play! 🎮
      </Button>
    </Card>
  );
}