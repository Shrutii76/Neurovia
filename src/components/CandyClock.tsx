import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

interface ClockHandPosition {
  hour: number;
  minute: number;
}

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

export const CandyClock = () => {
  // --- GAME STATE ---
  const [phase, setPhase] = useState<'instructions' | 'playing' | 'results'>('instructions');
  const navigate = useNavigate();
  // --- CLOCK + GAME STATES ---
  const [handPosition, setHandPosition] = useState<ClockHandPosition>({ hour: 12, minute: 0 });
  const [targetTime, setTargetTime] = useState<ClockHandPosition>({ hour: 3, minute: 0 });
  const [isDragging, setIsDragging] = useState<'hour' | 'minute' | null>(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const totalRounds = 5;
  const clockRef = useRef<HTMLDivElement>(null);

  // 🔊 Voice feedback
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  // --- NEW ROUND ---
  useEffect(() => {
    if (phase === 'playing' && round <= totalRounds) {
      setTargetTime({
        hour: Math.floor(Math.random() * 12) + 1,
        minute: Math.floor(Math.random() * 12) * 5,
      });
      setHandPosition({ hour: 12, minute: 0 });
    }
  }, [round, phase]);

  const handleMouseDown = (hand: 'hour' | 'minute') => {
    setIsDragging(hand);
    speak(hand === 'hour' ? "Cupcake hand grabbed" : "Lollipop hand grabbed");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let degrees = (angle * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;

    if (isDragging === 'hour') {
      const hour = Math.round(degrees / 30) % 12 || 12;
      setHandPosition(prev => ({ ...prev, hour }));
    } else {
      const minute = (Math.round(degrees / 30) * 5) % 60;
      setHandPosition(prev => ({ ...prev, minute }));
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      speak("Dropped");
    }
    setIsDragging(null);
  };

  const nextRound = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    if (round < totalRounds) {
      setRound(r => r + 1);
    } else {
      // End game → show results
      setPhase('results');
    }
  };

  const checkAnswer = () => {
    const correct = handPosition.hour === targetTime.hour && handPosition.minute === targetTime.minute;
    if (correct) {
      toast.success('🎉 Perfect! You set the clock correctly!');
      speak("Perfect!");
    } else {
      toast.error('❌ Wrong time!');
      speak("Oops wrong time");
    }
    nextRound(correct);
  };

  const hourRotation = ((handPosition.hour % 12) * 30) + (handPosition.minute * 0.5);
  const minuteRotation = handPosition.minute * 6;

  const formatTime = (time: ClockHandPosition) => {
    const hourStr = time.hour.toString();
    const minuteStr = time.minute.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}`;
  };

  const progress = ((round - 1) / totalRounds) * 100;

  // --- UI ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative">
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

      <Card className="candy-card max-w-lg mx-auto p-6 relative z-10">
        {/* INSTRUCTIONS SCREEN */}
        {phase === 'instructions' && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">🧁 Candy Clock Game 🍭</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Welcome! In this game you’ll get {totalRounds} random times to set on the candy clock.
              Drag the cupcake hand for hours and the lollipop hand for minutes.
              Try to match the target time!
            </p>
            <ul className="text-left inline-block text-muted-foreground">
              <li>✅ {totalRounds} rounds</li>
              <li>✅ Earn 1 point for each correct time</li>
              <li>✅ See your results at the end</li>
            </ul><br />
            <Button onClick={() => { setPhase('playing'); setRound(1); setScore(0); speak("Let's start the Candy Clock game"); }}>
              Start Game 🎮
            </Button>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {phase === 'playing' && round <= totalRounds && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-primary mb-2">🧁 Candy Clock 🍭</h2>
              <p className="text-lg text-muted-foreground">
                Round {round} of {totalRounds} | Score: {score}
              </p>
              <p className="text-lg font-bold text-primary">Set time to: {formatTime(targetTime)}</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div
              ref={clockRef}
              className="relative w-80 h-80 mx-auto mb-6 bg-gradient-to-br from-white to-muted rounded-full border-8 border-primary/20 shadow-candy"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {[...Array(12)].map((_, i) => {
                const number = i + 1;
                const angle = (number * 30 - 90) * (Math.PI / 180);
                const x = Math.cos(angle) * 120 + 160;
                const y = Math.sin(angle) * 120 + 160;
                return (
                  <div key={number}
                    className="absolute text-2xl font-bold text-primary transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}>
                    {number}
                  </div>
                );
              })}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
              {/* Hour hand */}
              <div
                className="absolute top-1/2 left-1/2 origin-bottom cursor-grab active:cursor-grabbing z-20"
                style={{
                  width: '4px', height: '80px', marginTop: '-80px', marginLeft: '-2px',
                  transform: `rotate(${hourRotation}deg)`,
                }}
                onMouseDown={() => handleMouseDown('hour')}>
                <div className="w-8 h-8 -ml-4 -mt-2 bg-primary rounded-full flex items-center justify-center animate-float">
                  <span className="text-lg">🧁</span>
                </div>
                <div className="w-1 h-full bg-primary mx-auto" />
              </div>
              {/* Minute hand */}
              <div
                className="absolute top-1/2 left-1/2 origin-bottom cursor-grab active:cursor-grabbing z-20"
                style={{
                  width: '2px', height: '100px', marginTop: '-100px', marginLeft: '-1px',
                  transform: `rotate(${minuteRotation}deg)`,
                }}
                onMouseDown={() => handleMouseDown('minute')}>
                <div className="w-6 h-6 -ml-3 -mt-1 bg-secondary rounded-full flex items-center justify-center animate-float">
                  <span className="text-sm">🍭</span>
                </div>
                <div className="w-0.5 h-full bg-secondary mx-auto" />
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="text-xl font-semibold text-foreground">
                Current time: <span className="text-primary">{formatTime(handPosition)}</span>
              </div>
              <Button onClick={checkAnswer} className="candy-button text-xl px-8 py-4">
                Check Time! 🎯
              </Button>
              <p className="text-sm text-muted-foreground">
                Drag the cupcake (hour) and lollipop (minute) hands to set the time!
              </p>
            </div>
          </>
        )}

        {/* RESULTS SCREEN */}
        {phase === 'results' && (
          <div className="text-center space-y-6 relative">
            <h2 className="text-3xl font-bold text-primary mb-4">🎉 Game Over! 🎉</h2>
            <p className="text-xl text-muted-foreground">
              You scored <span className="text-primary font-bold">{score}</span> out of {totalRounds}!
            </p>

            {/* Stars */}
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => {
                const filledStars = Math.round((score / totalRounds) * 5);
                return (
                  <span key={i} className="text-3xl">
                    {i < filledStars ? '⭐' : '⚪'}
                  </span>
                );
              })}
            </div>

            {/* Performance Emoji */}
            <p className="text-5xl mb-2">
              {score === totalRounds
                ? '🤩'
                : score >= totalRounds * 0.7
                ? '😃'
                : score >= totalRounds * 0.4
                ? '🙂'
                : '😅'}
            </p>

            {/* Reaction Text */}
            <div className="space-y-2 text-lg">
              {score === totalRounds && <p>🌟 Perfect! You’re a Time Master!</p>}
              {score >= totalRounds / 2 && score < totalRounds && <p>🎯 Great job! Keep practicing your clock skills!</p>}
              {score < totalRounds / 2 && <p>🍭 You can do better! Try again to improve.</p>}
            </div>

            {/* Bar Chart */}
            <div className="mb-6 w-3/4 mx-auto">
              <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
                <div
                  className="bg-green-400 h-full"
                  style={{
                    width: `${(score / totalRounds) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-sm">
                ✅ Correct: {score} | ❌ Incorrect: {totalRounds - score}
              </p>
            </div>

          

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
              <Button onClick={() => { setPhase('instructions'); speak("Play again"); }} className="px-6 py-6">
                Play Again 🔁
              </Button>

              <button
                onClick={() =>
                  navigate("/game/MathsStory", { state: { from: "CandyClock" } })
                }
                className="px-6 py-2 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg "
              >
                ▶️ Next Game
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
