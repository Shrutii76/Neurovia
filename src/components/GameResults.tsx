import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameResultsProps {
  score: number;
  totalRounds: number;
  onPlayAgain: () => void;
}

export function GameResults({ score, totalRounds, onPlayAgain }: GameResultsProps) {
  const percentage = Math.round((score / totalRounds) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 80) {
      return {
        emoji: '🏆',
        title: 'Amazing!',
        message: 'You are a Candy Counting Champion!',
        color: 'text-success'
      };
    } else if (percentage >= 60) {
      return {
        emoji: '⭐',
        title: 'Great Job!',
        message: 'You did really well in Candy Land!',
        color: 'text-primary'
      };
    } else {
      return {
        emoji: '🌟',
        title: 'Good Try!',
        message: 'Keep practicing and you\'ll be amazing!',
        color: 'text-accent'
      };
    }
  };

  const result = getResultMessage();

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/30 shadow-magical p-8 text-center max-w-2xl mx-auto">
      <div className="text-8xl mb-6 animate-bounce">
        {result.emoji}
      </div>
      
      <h1 className="text-4xl font-bold mb-4 bg-gradient-candy bg-clip-text text-transparent">
        Game Complete!
      </h1>
      
      <h2 className={`text-3xl font-bold mb-4 ${result.color}`}>
        {result.title}
      </h2>
      
      <p className="text-xl text-muted-foreground mb-8">
        {result.message}
      </p>

      <div className="bg-primary/10 rounded-xl p-6 mb-8 border border-primary/20">
        <div className="text-6xl font-bold text-primary mb-2">
          {score} / {totalRounds}
        </div>
        <div className="text-lg text-muted-foreground">
          You got {percentage}% correct!
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
        //   variant="candy" 
          size="lg" 
          onClick={onPlayAgain}
          className="text-lg px-8 py-3"
        >
          Play Again! 🎮
        </Button>
        
        <Button 
        //   variant="magic" 
          size="lg" 
          className="text-lg px-8 py-3"
          onClick={() => window.location.reload()}
        >
          Back to Instructions 📚
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Thanks for playing in our magical Candy Land! ✨
        </p>
      </div>
    </Card>
  );
}