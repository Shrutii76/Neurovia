import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameState, CandyItem } from '@/types/game';
import { CandyObject } from './CandyObject';
import { GameInstructions } from './GameInstructions';
import { GameResults } from './GameResults';
import { useToast } from '@/hooks/use-toast';
import {useNavigate} from 'react-router-dom';

// Import candy images
import candyImg from '@/assets/candy.png';
import cherryImg from '@/assets/cherry.png';
import chocolateImg from '@/assets/chocolate.png';
import donutImg from '@/assets/donut.png';
import icecreamImg from '@/assets/icecream.png';
import lollipopImg from '@/assets/lollipop.png';

const candyTypes: CandyItem[] = [
  { id: 'candy', name: 'Candy', image: candyImg, emoji: '🍬' },
  { id: 'cherry', name: 'Cherry', image: cherryImg, emoji: '🍒' },
  { id: 'chocolate', name: 'Chocolate', image: chocolateImg, emoji: '🍫' },
  { id: 'donut', name: 'Donut', image: donutImg, emoji: '🍩' },
  { id: 'icecream', name: 'Ice Cream', image: icecreamImg, emoji: '🍦' },
  { id: 'lollipop', name: 'Lollipop', image: lollipopImg, emoji: '🍭' },
];

 const floatingCandies = [
    { emoji: '🍪', top: '15%', left: '8%', size: 'text-5xl' },
    { emoji: '🧁', top: '65%', left: '12%', size: 'text-4xl' },
    { emoji: '🍭', top: '25%', left: '85%', size: 'text-6xl' },
    { emoji: '🍩', top: '50%', left: '88%', size: 'text-5xl' },
    { emoji: '🍫', top: '20%', left: '92%', size: 'text-4xl' },
    { emoji: '🥤', top: '75%', left: '90%', size: 'text-5xl' },
    { emoji: '🍰', top: '80%', left: '85%', size: 'text-4xl' },
    { emoji: '✏️', top: '70%', left: '5%', size: 'text-4xl' },
  ];

export function CandyCountGame() {
  const [gameState, setGameState] = useState<GameState>('instructions');
  const [displayItems, setDisplayItems] = useState<Array<{ id: string; type: CandyItem; position: { x: number; y: number } }>>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate =useNavigate();

  // 🔹 Simple helper to speak text aloud
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.2;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateRandomPosition = useCallback(() => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 70 + 15,
  }), []);

  const generateAnswerOptions = useCallback((correct: number) => {
    const options = [correct];
    while (options.length < 3) {
      const random = Math.floor(Math.random() * 8) + 1;
      if (!options.includes(random)) {
        options.push(random);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }, []);

  const startCountingPhase = useCallback(() => {
    const itemCount = Math.floor(Math.random() * 6) + 2;
    const selectedType = candyTypes[Math.floor(Math.random() * candyTypes.length)];

    const newItems = Array.from({ length: itemCount }, (_, i) => ({
      id: `${selectedType.id}-${i}`,
      type: selectedType,
      position: generateRandomPosition(),
    }));

    setDisplayItems(newItems);
    setCorrectAnswer(itemCount);
    setAnswerOptions(generateAnswerOptions(itemCount));
    setGameState('counting');
    setIsCorrect(null);

    setTimeout(() => {
      setGameState('question');
    }, 2500);
  }, [generateRandomPosition, generateAnswerOptions]);

  // 🔹 Added speak for correct/incorrect
  const handleAnswer = useCallback((selectedAnswer: number) => {
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      speak("Excellent!"); // 🔹 voice feedback
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: `You found ${correctAnswer} items!`,
      });
    } else {
      speak("Good try!"); // 🔹 voice feedback
      toast({
        title: "Try again! 💪",
        description: `The correct answer was ${correctAnswer}`,
        variant: "destructive",
      });
    }

    setGameState('result');

    setTimeout(() => {
      setRound(round + 1);
      if (round >= 5) {
        setGameState('final');
      } else {
        startCountingPhase();
      }
    }, 2000);
  }, [correctAnswer, score, round, toast, startCountingPhase]);

  const resetGame = useCallback(() => {
    setScore(0);
    setRound(1);
    setGameState('instructions');
    setIsCorrect(null);
  }, []);

  const startGame = useCallback(() => {
    startCountingPhase();
  }, [startCountingPhase]);

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
               {/* 🔙 Back to Games button */}
    <button
      onClick={() => navigate("/CandyIslandMap")}
      className="absolute top-5 left-5 bg-white text-purple-700 px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold z-50"
    >
      ⬅️ Back to Games
    </button>
      {floatingCandies.map((candy, index) => (
        <div
          key={index}
          className={`absolute ${candy.size} opacity-80 animate-bounce`}
          style={{
            left: candy.left,
            top: candy.top,
            animationDelay: `${index * 0.5}s`,
            animationDuration: '3s'
          }}
        >
          {candy.emoji}
        </div>
      ))}
      <div className="w-full max-w-4xl bg-white/70 rounded-3xl p-6 backdrop-blur-sm">
        {gameState === 'instructions' && (
          <GameInstructions onStart={() => {
            speak("Let's start the game"); // 🔹 voice
            startGame();
          }} />
        )}

        {gameState === 'counting' && (
          <div className="space-y-6">
            <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/30 shadow-magical p-6 text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">Count Quickly! ⚡</h2>
              <p className="text-lg text-muted-foreground mb-4">
                How many {displayItems[0]?.type.name.toLowerCase()}s do you see?
              </p>
              <div className="text-sm text-muted-foreground">Round {round} of 5</div>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-4 border-primary/30 shadow-magical min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-4">
                {displayItems.map((item, index) => (
                  <CandyObject
                    key={item.id}
                    item={item.type}
                    position={item.position}
                    delay={index * 0.1}
                  />
                ))}
              </div>

              <div className="absolute top-4 left-4 text-2xl animate-sparkle">✨</div>
              <div className="absolute top-4 right-4 text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
              <div className="absolute bottom-4 left-4 text-2xl animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
              <div className="absolute bottom-4 right-4 text-2xl animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
            </Card>
          </div>
        )}

        {gameState === 'question' && (
          <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/30 shadow-magical p-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">How many did you see? 🤔</h2>

            <div className="bg-white/80 rounded-3xl p-12 mb-8 border-4 border-primary/20">
              <div className="text-8xl text-accent">?</div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {answerOptions.map((option) => (
                <Button
                  key={option}
                  size="lg"
                  className="text-2xl font-bold h-16"
                  onClick={() => {
                    speak("Click"); // 🔹 click voice
                    handleAnswer(option);
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="text-sm text-muted-foreground mt-4">Round {round} of 5</div>
          </Card>
        )}

        {gameState === 'result' && (
          <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/30 shadow-magical p-8 text-center">
            <div className="text-6xl mb-4">
              {isCorrect ? '🎉' : '💪'}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {isCorrect ? 'Excellent!' : 'Good try!'}
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {isCorrect
                ? `You correctly counted ${correctAnswer} items!`
                : `The correct answer was ${correctAnswer}`
              }
            </p>
            <div className="text-lg font-semibold text-primary">
              Score: {score} / {round}
            </div>
          </Card>
        )}

        {gameState === 'final' && (
          <GameResults
            score={score}
            totalRounds={5}
            onPlayAgain={() => {
              speak("Play again");
              resetGame();
            }}
          />
        )}
      </div>
    </div>
  );
}
