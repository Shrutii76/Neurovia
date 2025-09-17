import React, { useState, useEffect, useRef } from 'react';
import { Play, Home, RotateCcw, Star, Clock } from 'lucide-react';

const PatternDetectiveGame = () => {
  const [gameState, setGameState] = useState('welcome'); // 'welcome', 'playing', 'correct', 'wrong', 'results'
  const [currentPattern, setCurrentPattern] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameStats, setGameStats] = useState({
    questionsAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    finalScore: 0
  });
  const timerRef = useRef(null);
  const MAX_QUESTIONS = 10;


  const handleAnswer = (answer) => {
  if (isAnimating) return;
  
  setSelectedAnswer(answer);
  setIsAnimating(true);

  // total answered after this question
  const newTotalQuestions = totalQuestions + 1;
  const isCorrect = answer === currentPattern.correct;

  // update stats
  setTotalQuestions(newTotalQuestions);
  setGameStats(prev => ({
    ...prev,
    questionsAnswered: newTotalQuestions,
    correctCount: prev.correctCount + (isCorrect ? 1 : 0),
    wrongCount: prev.wrongCount + (isCorrect ? 0 : 1)
  }));

  if (isCorrect) {
    setGameState('correct');
    setScore(prev => prev + 10);
    setCorrectAnswers(prev => prev + 1);
  } else {
    setGameState('wrong');
  }

  // If last question reached → show results after animation
  const nextAction = () => {
    if (newTotalQuestions >= MAX_QUESTIONS) {
      // stop timer
      if (timerRef.current) clearInterval(timerRef.current);
      // save final score
      setGameStats(prev => ({
        ...prev,
        finalScore: isCorrect ? score + 10 : score
      }));
      setGameState('results');
    } else {
      generateNewPattern();
      setGameState('playing');
      setSelectedAnswer(null);
      setIsAnimating(false);
    }
  };

  setTimeout(nextAction, isCorrect ? 1500 : 2000);
};

  // Expanded pattern types and generators
  const patternTypes = [
    {
      name: 'add2',
      description: 'Adding 2',
      generate: () => {
        const start = Math.floor(Math.random() * 10) + 1;
        const sequence = [start, start + 2, start + 4, start + 6];
        const missing = start + 8;
        const wrong1 = missing + 1;
        const wrong2 = missing + 3;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Adding 2'
        };
      }
    },
    {
      name: 'add3',
      description: 'Adding 3',
      generate: () => {
        const start = Math.floor(Math.random() * 8) + 1;
        const sequence = [start, start + 3, start + 6, start + 9];
        const missing = start + 12;
        const wrong1 = missing + 2;
        const wrong2 = missing - 1;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Adding 3'
        };
      }
    },
    {
      name: 'add5',
      description: 'Adding 5',
      generate: () => {
        const start = Math.floor(Math.random() * 5) + 1;
        const sequence = [start, start + 5, start + 10, start + 15];
        const missing = start + 20;
        const wrong1 = missing + 2;
        const wrong2 = missing - 3;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Adding 5'
        };
      }
    },
    {
      name: 'subtract2',
      description: 'Subtracting 2',
      generate: () => {
        const start = Math.floor(Math.random() * 10) + 20;
        const sequence = [start, start - 2, start - 4, start - 6];
        const missing = start - 8;
        const wrong1 = missing + 1;
        const wrong2 = missing - 3;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Subtracting 2'
        };
      }
    },
    {
      name: 'odd',
      description: 'Odd Numbers',
      generate: () => {
        const start = Math.floor(Math.random() * 4) * 2 + 1; // Random odd start
        const sequence = [start, start + 2, start + 4, start + 6];
        const missing = start + 8;
        const wrong1 = missing + 1;
        const wrong2 = missing - 1;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Odd Numbers'
        };
      }
    },
    {
      name: 'even',
      description: 'Even Numbers',
      generate: () => {
        const start = Math.floor(Math.random() * 5) * 2 + 2; // Random even start
        const sequence = [start, start + 2, start + 4, start + 6];
        const missing = start + 8;
        const wrong1 = missing + 1;
        const wrong2 = missing - 1;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Even Numbers'
        };
      }
    },
    {
      name: 'double',
      description: 'Doubling',
      generate: () => {
        const start = Math.floor(Math.random() * 3) + 2;
        const sequence = [start, start * 2, start * 4, start * 8];
        const missing = start * 16;
        const wrong1 = missing + start;
        const wrong2 = missing / 2;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Doubling'
        };
      }
    },
    {
      name: 'multiply3',
      description: 'Times 3',
      generate: () => {
        const start = Math.floor(Math.random() * 2) + 1;
        const sequence = [start, start * 3, start * 9, start * 27];
        const missing = start * 81;
        const wrong1 = missing + 10;
        const wrong2 = missing - 20;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Times 3'
        };
      }
    },
    {
      name: 'fibonacci',
      description: 'Fibonacci-like',
      generate: () => {
        const a = Math.floor(Math.random() * 3) + 1;
        const b = Math.floor(Math.random() * 3) + 2;
        const sequence = [a, b, a + b, a + 2*b];
        const missing = 2*a + 3*b;
        const wrong1 = missing + 2;
        const wrong2 = missing - 1;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Adding Previous'
        };
      }
    },
    {
      name: 'square',
      description: 'Square Numbers',
      generate: () => {
        const start = Math.floor(Math.random() * 3) + 2;
        const sequence = [start*start, (start+1)*(start+1), (start+2)*(start+2), (start+3)*(start+3)];
        const missing = (start+4)*(start+4);
        const wrong1 = missing + 5;
        const wrong2 = missing - 3;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Square Numbers'
        };
      }
    },
    {
      name: 'add10',
      description: 'Adding 10',
      generate: () => {
        const start = Math.floor(Math.random() * 20) + 5;
        const sequence = [start, start + 10, start + 20, start + 30];
        const missing = start + 40;
        const wrong1 = missing + 5;
        const wrong2 = missing - 5;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Adding 10'
        };
      }
    },
    {
      name: 'countdown5',
      description: 'Counting Down by 5',
      generate: () => {
        const start = Math.floor(Math.random() * 10) + 50;
        const sequence = [start, start - 5, start - 10, start - 15];
        const missing = start - 20;
        const wrong1 = missing + 3;
        const wrong2 = missing - 2;
        return {
          sequence,
          correct: missing,
          options: [wrong1, missing, wrong2].sort(() => Math.random() - 0.5),
          type: 'Counting Down by 5'
        };
      }
    }
  ];

  // Floating dessert items
  const dessertEmojis = ['🍪', '🍩', '🍭', '🧁', '🍦', '🍫', '🎂', '🍰'];

  const generateNewPattern = () => {
    const randomType = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    setCurrentPattern(randomType.generate());
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setTimeLeft(45);
    setGameStats({
      questionsAnswered: 0,
      correctCount: 0,
      wrongCount: 0,
      finalScore: 0
    });
    generateNewPattern();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Game over - show results
          setGameStats(prevStats => ({
            ...prevStats,
            finalScore: score
          }));
          setGameState('results');
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
  };

 

  const resetGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameState('welcome');
    setScore(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setTimeLeft(45);
    setCurrentPattern(null);
    setSelectedAnswer(null);
    setGameStats({
      questionsAnswered: 0,
      correctCount: 0,
      wrongCount: 0,
      finalScore: 0
    });
  };

  const playAgain = () => {
    startGame();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Floating animation component
  const FloatingDessert = ({ emoji, delay, duration, startX, startY }) => (
    <div
      className="absolute text-4xl opacity-20 animate-pulse pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {emoji}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20 animate-pulse"></div>
      
      {/* Floating Desserts */}
      {dessertEmojis.map((emoji, index) => (
        <FloatingDessert
          key={index}
          emoji={emoji}
          delay={index * 0.5}
          duration={3 + (index % 3)}
          startX={10 + (index * 10) % 80}
          startY={10 + (index * 15) % 70}
        />
      ))}

      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-white opacity-30 animate-pulse"
            size={12}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-8">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300"
          >
            <Home size={20} />
            Back to Games
          </button>
          
          {gameState === 'playing' && (
            <div className="flex items-center gap-4 text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock size={20} />
              <span className="font-bold text-lg">
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            🎨 Pattern Detective 🔍
          </h1>
          <p className="text-xl text-white/90 font-semibold">Age Group: 8-9 years</p>
          {gameState === 'playing' && (
            <p className="text-2xl text-yellow-300 font-bold mt-2">Score: {score}</p>
          )}
        </div>

        {/* Main Game Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          {gameState === 'welcome' && (
            <div className="text-center space-y-6">
              <div className="bg-yellow-100 rounded-2xl p-6 border-4 border-yellow-300">
                <h2 className="text-3xl font-bold text-orange-600 mb-4">How to Play</h2>
                <div className="space-y-3 text-lg text-gray-700">
                  <p>🔢 You will see a pattern of numbers or objects.</p>
                  <p>🧩 Figure out what comes next in the pattern!</p>
                  <p>✋ Then tap the correct answer.</p>
                </div>
              </div>
              
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-2xl font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
              >
                Find Patterns! 🔍
                <Play className="ml-2" size={28} />
              </button>
            </div>
          )}

          {gameState === 'playing' && currentPattern && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                Complete the pattern
              </h2>
              
              {/* Pattern Type Hint */}
              <div className="text-center mb-4">
                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold">
                  Pattern: {currentPattern.type}
                </span>
              </div>
              
              {/* Pattern Display */}
              <div className="bg-yellow-50 border-4 border-yellow-300 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-800 tracking-wider">
                  {currentPattern.sequence.join(', ')}, ___
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="text-center text-sm text-gray-600">
                Questions: {totalQuestions} | Correct: {correctAnswers}
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {currentPattern.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnimating}
                    className={`
                      text-2xl font-bold py-6 px-4 rounded-2xl shadow-lg transform transition-all duration-300
                      ${selectedAnswer === option && gameState === 'correct'
                        ? 'bg-green-500 text-white scale-110 shadow-2xl'
                        : selectedAnswer === option && gameState === 'wrong'
                        ? 'bg-red-500 text-white scale-95'
                        : option === currentPattern.correct && gameState === 'wrong'
                        ? 'bg-green-400 text-white'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 hover:scale-105'
                      }
                      ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'results' && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🏆</div>
              <h2 className="text-4xl font-bold text-purple-600">Game Complete!</h2>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Results:</h3>
                
                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl font-bold text-green-600">{gameStats.finalScore}</div>
                    <div className="text-gray-600">Final Score</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl font-bold text-blue-600">{gameStats.questionsAnswered}</div>
                    <div className="text-gray-600">Questions</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl font-bold text-green-600">{gameStats.correctCount}</div>
                    <div className="text-gray-600">Correct</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl font-bold text-red-500">{gameStats.wrongCount}</div>
                    <div className="text-gray-600">Wrong</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-purple-600">
                    {gameStats.questionsAnswered > 0 ? Math.round((gameStats.correctCount / gameStats.questionsAnswered) * 100) : 0}%
                  </div>
                  <div className="text-gray-600">Accuracy</div>
                </div>

                <div className="mt-6 text-lg text-gray-700">
                  {gameStats.correctCount === gameStats.questionsAnswered ? (
                    <div className="text-green-600 font-bold">🌟 Perfect Score! You're a Pattern Detective Master! 🌟</div>
                  ) : gameStats.correctCount / gameStats.questionsAnswered >= 0.8 ? (
                    <div className="text-green-600 font-bold">🎉 Excellent work! You're great at finding patterns! 🎉</div>
                  ) : gameStats.correctCount / gameStats.questionsAnswered >= 0.6 ? (
                    <div className="text-orange-600 font-bold">👏 Good job! Keep practicing to become a Pattern Master! 👏</div>
                  ) : (
                    <div className="text-blue-600 font-bold">🌱 Nice try! Practice makes perfect - you're learning! 🌱</div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={playAgain}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-xl font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Play Again! 🔄
                </button>
                
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white text-xl font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Main Menu 🏠
                </button>
              </div>
            </div>
          )}

          {gameState === 'correct' && (
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold text-green-600">Correct!</h2>
              <p className="text-xl text-gray-600">Great job, Pattern Detective!</p>
            </div>
          )}

          {gameState === 'wrong' && (
            <div className="text-center space-y-4">
              <div className="text-6xl">🤔</div>
              <h2 className="text-4xl font-bold text-orange-600">Try Again!</h2>
              <p className="text-xl text-gray-600">Look for the pattern and try once more!</p>
            </div>
          )}
        </div>

        {gameState === 'playing' && (
          <button
            onClick={resetGame}
            className="mt-6 flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300"
          >
            <RotateCcw size={20} />
            Reset Game
          </button>
        )}
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default PatternDetectiveGame;