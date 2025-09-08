import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';

interface CandyPiece {
  id: string;
  type: 'gumdrop' | 'cookie' | 'donut' | 'lollipop' | 'cupcake';
  color: string;
  emoji: string;
}

const candyTypes: CandyPiece[] = [
  { id: 'gumdrop-red', type: 'gumdrop', color: 'bg-red-400', emoji: '🟥' },
  { id: 'gumdrop-blue', type: 'gumdrop', color: 'bg-blue-400', emoji: '🟦' },
  { id: 'gumdrop-green', type: 'gumdrop', color: 'bg-green-400', emoji: '🟩' },
  { id: 'cookie', type: 'cookie', color: 'bg-amber-400', emoji: '🍪' },
  { id: 'donut', type: 'donut', color: 'bg-pink-400', emoji: '🍩' },
  { id: 'lollipop', type: 'lollipop', color: 'bg-purple-400', emoji: '🍭' },
  { id: 'cupcake', type: 'cupcake', color: 'bg-yellow-400', emoji: '🧁' },
];

export const PatternChallenge = () => {
  const [currentPattern, setCurrentPattern] = useState<CandyPiece[]>([]);
  const [missingIndex, setMissingIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<CandyPiece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const generatePattern = () => {
    const patternLength = Math.min(4 + Math.floor(level / 2), 8);
    const pattern: CandyPiece[] = [];
    
    // Simple AB pattern for level 1, more complex patterns for higher levels
    if (level === 1) {
      const candyA = candyTypes[Math.floor(Math.random() * 3)]; // Gumdrops only
      const candyB = candyTypes[Math.floor(Math.random() * 3)];
      
      for (let i = 0; i < patternLength; i++) {
        pattern.push(i % 2 === 0 ? candyA : candyB);
      }
    } else {
      // More complex patterns
      const baseCandies = candyTypes.slice(0, Math.min(level + 2, candyTypes.length));
      for (let i = 0; i < patternLength; i++) {
        pattern.push(baseCandies[i % baseCandies.length]);
      }
    }
    
    const missing = Math.floor(Math.random() * patternLength);
    setCurrentPattern(pattern);
    setMissingIndex(missing);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    generatePattern();
  }, [level]);

  const handleAnswer = (candy: CandyPiece) => {
    setSelectedAnswer(candy);
    
    if (candy.id === currentPattern[missingIndex].id) {
      setScore(score + 10);
      toast.success("🌟 Amazing! Perfect pattern match!", {
        description: `You earned 10 candy points! Total: ${score + 10}`,
      });
      
      // Level up every 50 points
      if ((score + 10) % 50 === 0) {
        setLevel(level + 1);
        toast.success("🎉 Level Up!", {
          description: `Welcome to Level ${level + 1}! Patterns are getting trickier!`,
        });
      }
      
      setTimeout(() => {
        generatePattern();
      }, 1500);
    } else {
      toast.error("Oops! Try again! 🍭", {
        description: "Look carefully at the pattern and try to find what's missing!",
      });
      setSelectedAnswer(null);
    }
  };

  return (
    <Card className="candy-card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2">🍬 Pattern Challenge 🍬</h2>
        <div className="flex justify-center gap-4 text-lg">
          <span className="font-semibold">Level: <span className="text-primary">{level}</span></span>
          <span className="font-semibold">Score: <span className="text-secondary">{score}</span></span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-center text-lg text-foreground mb-4 font-medium">
          What candy comes next in this pattern?
        </p>
        
        <div className="flex justify-center items-center gap-3 mb-6 p-4 bg-gradient-to-r from-muted/50 to-accent/50 rounded-2xl">
          {currentPattern.map((candy, index) => (
            <div key={index} className="relative">
              {index === missingIndex ? (
                <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full flex items-center justify-center bg-white/50 animate-pulse">
                  <span className="text-2xl">❓</span>
                </div>
              ) : (
                <div 
                  className={`candy-piece ${candy.color} flex items-center justify-center text-2xl ${
                    selectedAnswer?.id === candy.id ? 'ring-4 ring-primary' : ''
                  }`}
                >
                  {candy.emoji}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {candyTypes.slice(0, Math.min(level + 3, candyTypes.length)).map((candy) => (
          <Button
            key={candy.id}
            onClick={() => handleAnswer(candy)}
            className={`candy-piece ${candy.color} text-2xl h-16 w-16 mx-auto ${
              selectedAnswer?.id === candy.id ? 'ring-4 ring-primary scale-110' : ''
            }`}
            disabled={!!selectedAnswer}
          >
            {candy.emoji}
          </Button>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={generatePattern}
          variant="outline"
          className="candy-button bg-gradient-to-r from-accent to-muted"
        >
          New Pattern 🎲
        </Button>
        
        <p className="text-sm text-muted-foreground mt-3">
          Click on the candy that completes the pattern!
        </p>
      </div>
    </Card>
  );
};