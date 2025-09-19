import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SymbolDetectiveGame from './SymbolDetectiveGame';

interface ComparisonQuestion {
  leftItem: string;
  leftCount: number;
  rightItem: string;
  rightCount: number;
  leftEmoji: string;
  rightEmoji: string;
}

const CandyComparisonGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<ComparisonQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameState, setGameState] = useState<'instructions' | 'playing' | 'finished'>('instructions');

  const totalQuestions = 10;

  // 🔹 simple voice helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.2;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const candyItems = [
    { name: 'Apples', emoji: '🍎' },
    { name: 'Bananas', emoji: '🍌' },
    { name: 'Cookies', emoji: '🍪' },
    { name: 'Cupcakes', emoji: '🧁' },
    { name: 'Donuts', emoji: '🍩' },
    { name: 'Lollipops', emoji: '🍭' },
    { name: 'Candies', emoji: '🍬' },
    { name: 'Ice Cream', emoji: '🍦' }
  ];

  const navigate = useNavigate();

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

  const generateQuestion = () => {
    const leftItem = candyItems[Math.floor(Math.random() * candyItems.length)];
    let rightItem = candyItems[Math.floor(Math.random() * candyItems.length)];

    while (rightItem.name === leftItem.name) {
      rightItem = candyItems[Math.floor(Math.random() * candyItems.length)];
    }

    const leftCount = Math.floor(Math.random() * 6) + 4; // 4-9
    const rightCount = Math.floor(Math.random() * 6) + 4;

    setCurrentQuestion({
      leftItem: leftItem.name,
      leftCount,
      rightItem: rightItem.name,
      rightCount,
      leftEmoji: leftItem.emoji,
      rightEmoji: rightItem.emoji
    });
    setShowFeedback(false);
    setFeedback('');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      generateQuestion();
    }
  }, [gameState]);

  const handleAnswer = (answer: 'left' | 'right' | 'equal') => {
    if (!currentQuestion) return;

    let correct = false;

    if (currentQuestion.leftCount > currentQuestion.rightCount) {
      correct = answer === 'left';
    } else if (currentQuestion.rightCount > currentQuestion.leftCount) {
      correct = answer === 'right';
    } else {
      correct = answer === 'equal';
    }

    if (correct) {
      setScore((s) => s + 1);
      setFeedback('🎉 Correct!');
      speak("correct!"); // 🔹 speak when correct
    } else {
      setFeedback('❌ Try again!');
      speak("Try again!"); // 🔹 speak when wrong
    }

    setShowFeedback(true);

    setTimeout(() => {
      if (questionNumber < totalQuestions) {
        setQuestionNumber((q) => q + 1);
        generateQuestion();
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  const progressWidth = `${(questionNumber / totalQuestions) * 100}%`;

  const startGame = () => {
    speak("Let's start the game"); // 🔹 speak on start
    setScore(0);
    setQuestionNumber(1);
    setGameState('playing');
    generateQuestion();
  };

  const playAgain = () => {
    speak("Play again"); // 🔹 speak on play again
    setScore(0);
    setQuestionNumber(1);
    setGameState('instructions');
  };

  return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
     {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20 animate-pulse"></div>

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

      <div className="relative z-10 text-center pt-16 pb-8">
        <h1
          className="text-5xl font-bold text-white drop-shadow-lg"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          Candy Comparison Game
        </h1>
      </div>

      {gameState === 'instructions' && (
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-6 text-purple-700">
              How to Play
            </h2>
            <p className="text-lg text-left mb-4">
              🍭 You’ll see two sets of candies.<br />  
              🍬 Click on the box that you think has more items.  <br />
              🎯 Or click “They are Equal” if both sides have the same number.<br />
            </p>
            <p className="text-lg mb-6">
              You have {totalQuestions} questions. Try to score as high as possible!
            </p>
            <button
              onClick={() => {
                speak("Click"); // 🔹 speak on click
                startGame();
              }}
              className="text-2xl font-bold py-4 px-12 rounded-2xl text-white transition-all hover:scale-105 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                fontFamily: 'Comic Sans MS, cursive'
              }}
            >
              Start Game 🎮
            </button>
          </div>
        </div>
      )}

      {gameState === 'playing' && currentQuestion && (
        <>
          <div className="relative z-10 max-w-4xl mx-auto px-8 mb-8">
            <div className="w-full h-3 bg-white bg-opacity-30 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: progressWidth }}
              ></div>
            </div>
            <div className="text-center text-white mt-2">
              Question {questionNumber}/{totalQuestions}
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 mx-4">
              <h2
                className="text-4xl font-bold text-center mb-12"
                style={{
                  color: '#22D3EE',
                  fontFamily: 'Comic Sans MS, cursive'
                }}
              >
                Which is more?
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Left Option */}
                <div
                  onClick={() => {
                    speak("Click"); // 🔹 speak click
                    handleAnswer('left');
                  }}
                  className="cursor-pointer border-4 rounded-3xl p-8 text-center bg-blue-50 hover:scale-105 transition-transform"
                  style={{ borderColor: '#7DD3FC' }}
                >
                  <h3 className="text-3xl font-bold mb-6 flex items-center justify-center" style={{ color: '#0EA5E9' }}>
                    <span className="mr-3">{currentQuestion.leftEmoji}</span>
                    {currentQuestion.leftItem}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: currentQuestion.leftCount }, (_, i) => (
                      <span key={i} className="text-4xl">
                        {currentQuestion.leftEmoji}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Option */}
                <div
                  onClick={() => {
                    speak("Click"); // 🔹 speak click
                    handleAnswer('right');
                  }}
                  className="cursor-pointer border-4 rounded-3xl p-8 text-center bg-yellow-50 hover:scale-105 transition-transform"
                  style={{ borderColor: '#FDE047' }}
                >
                  <h3 className="text-3xl font-bold mb-6 flex items-center justify-center" style={{ color: '#EAB308' }}>
                    <span className="mr-3">{currentQuestion.rightEmoji}</span>
                    {currentQuestion.rightItem}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: currentQuestion.rightCount }, (_, i) => (
                      <span key={i} className="text-4xl">
                        {currentQuestion.rightEmoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {!showFeedback && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      speak("Click"); // 🔹 speak click
                      handleAnswer('equal');
                    }}
                    className="text-2xl font-bold py-4 px-12 rounded-2xl text-white transition-all hover:scale-105 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                      fontFamily: 'Comic Sans MS, cursive'
                    }}
                  >
                    They are Equal! 😊
                  </button>
                </div>
              )}

              {showFeedback && (
                <div className="text-center">
                  <div className="text-3xl font-bold p-6 rounded-2xl bg-gradient-to-r from-green-200 to-blue-200">
                    {feedback}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
            <h2 className="text-4xl font-bold mb-6 text-purple-700">🎉 Game Over!</h2>
            <p className="text-2xl mb-6">
              Your Score: <span className="font-bold">{score}</span> / {totalQuestions}
            </p>
            <button
              onClick={() => {
                speak("Click"); // 🔹 speak click
                playAgain();
              }}
              className="text-2xl font-bold py-4 px-12 rounded-2xl text-white transition-all hover:scale-105 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                fontFamily: 'Comic Sans MS, cursive'
              }}
            >
              Play Again 🔄
            </button>
{/* 
             <button
  onClick={() => navigate("/SymbolDetectiveGame")} // Replace "/next-game" with your route
  className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold"
>
  ▶️ Next Game
</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandyComparisonGame;
