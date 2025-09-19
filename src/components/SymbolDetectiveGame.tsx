import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SymbolDetectiveGame = () => {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate=useNavigate();
  // 🔊 Feedback variations
  const positiveFeedback = ["Excellent!", "Great job!", "Awesome!", "Well done!", "You’re amazing!"];
  const negativeFeedback = ["Try again!", "Oops, not quite!", "Keep trying!", "Almost there!"];

  // 🔊 Speak function
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const symbols = [
    { symbol: "+", options: ["Add", "Divide", "Subtract"], correctIndex: 0 },
    { symbol: "-", options: ["Multiply", "Subtract", "Add"], correctIndex: 1 },
    { symbol: "×", options: ["Divide", "Add", "Multiply"], correctIndex: 2 },
    { symbol: "÷", options: ["Divide", "Subtract", "Equal"], correctIndex: 0 },
    { symbol: "=", options: ["Greater than", "Equal", "Less than"], correctIndex: 1 },
    { symbol: ">", options: ["Less than", "Equal", "Greater than"], correctIndex: 2 },
    { symbol: "<", options: ["Less than", "Greater than", "Equal"], correctIndex: 0 },
    { symbol: "≠", options: ["Equal", "Not equal", "Greater than"], correctIndex: 1 }
  ];

  const floatingTreats = [
    { emoji: "🍭", top: "15%", left: "10%", delay: "0s" },
    { emoji: "🧁", top: "25%", right: "15%", delay: "1s" },
    { emoji: "🍪", top: "45%", left: "8%", delay: "2s" },
    { emoji: "🍰", top: "60%", right: "12%", delay: "0.5s" },
    { emoji: "🍫", top: "35%", right: "25%", delay: "1.5s" },
    { emoji: "🍩", top: "70%", left: "15%", delay: "2.5s" },
    { emoji: "🎂", top: "20%", left: "75%", delay: "3s" },
    { emoji: "🍬", top: "55%", left: "70%", delay: "0.3s" }
  ];

  const handleAnswerClick = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    // 🗣️ Speak the chosen option
    speak(symbols[currentQuestion].options[answerIndex]);

    if (answerIndex === symbols[currentQuestion].correctIndex) {
      setScore(score + 1);
      const randomMsg = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
      speak(randomMsg); // 🔊 Correct feedback
    } else {
      const randomMsg = negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)];
      speak(randomMsg); // 🔊 Wrong feedback
    }

    setTimeout(() => {
      if (currentQuestion < symbols.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameState('intro');
  };

  const startGame = () => setGameState('playing');

  const getAnswerButtonClass = (index: number) => {
    if (!showFeedback) {
      return "bg-purple-500 hover:bg-purple-600 transform hover:scale-105 transition-all duration-200";
    }
    if (index === symbols[currentQuestion].correctIndex) {
      return "bg-green-500 ring-4 ring-green-300 animate-pulse";
    } else if (index === selectedAnswer) {
      return "bg-red-500 ring-4 ring-red-300";
    } else {
      return "bg-gray-400";
    }
  };

  // Floating animation styles
  const floatingStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-10px) rotate(2deg); }
      50% { transform: translateY(-5px) rotate(-1deg); }
      75% { transform: translateY(-15px) rotate(1deg); }
    }
    .floating-treat {
      animation: float 4s ease-in-out infinite;
    }
  `;

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = floatingStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // ------------------ INTRO SCREEN ------------------
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden relative">
                 {/* 🔙 Back to Games button */}
    <button
      onClick={() => navigate("/CandyIslandMap")}
      className="absolute top-5 left-5 bg-white text-purple-700 px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold z-50"
    >
      ⬅️ Back to Games
    </button>
        {floatingTreats.map((treat, index) => (
          <div key={index} className="absolute text-4xl floating-treat" style={{ top: treat.top, left: treat.left, right: treat.right, animationDelay: treat.delay }}>{treat.emoji}</div>
        ))}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="text-5xl mb-4">🔍</div>
              <h1 className="text-4xl font-bold text-purple-600 mb-2">Symbol Detective</h1>
              <p className="text-lg text-blue-600 font-medium">Age Group: 10-15 years 🎯</p>
            </div>
            <div className="bg-purple-100 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">How to Play</h2>
              <div className="space-y-3 text-purple-700">
                <p>You will see a math symbol.</p>
                <p>Choose what the symbol means!</p>
                <p>Tap the correct answer.</p>
              </div>
            </div>
            <button onClick={startGame} className="bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg">
              Find Symbols! 🔍
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------ RESULTS SCREEN ------------------
  if (gameState === 'results') {
    const percentage = Math.round((score / symbols.length) * 100);
    const celebration = percentage >= 80 ? "🎉🌟" : percentage >= 60 ? "🎊👏" : "💪🌈";

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden relative">
        {floatingTreats.map((treat, index) => (
          <div key={index} className="absolute text-4xl animate-bounce" style={{ top: treat.top, left: treat.left, right: treat.right, animationDelay: treat.delay, animationDuration: "2s" }}>{treat.emoji}</div>
        ))}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">{celebration}</div>
              <h2 className="text-3xl font-bold text-purple-600 mb-2">Detective Work Complete!</h2>
              <div className="text-6xl font-bold text-purple-600 mb-2">{score}/{symbols.length}</div>
              <p className="text-xl text-blue-600">You solved {percentage}% of the symbols!</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4">
                <p className="text-lg text-gray-700">
                  {percentage >= 80 ? "Outstanding detective work! You're a symbol master! 🔍⭐" :
                   percentage >= 60 ? "Great job, detective! Keep investigating! 🕵️‍♂️👍" :
                   "Good start, detective! Practice makes perfect! 💪🔍"}
                </p>
              </div>
              <button onClick={resetGame} className="bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold py-3 px-4 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg ">
                Play Again! 🔄
              </button>
&nbsp;&nbsp;
                 <button
  onClick={() => navigate("/game/CandyClock", { state: { from: "SymbolDetectiveGame" } })
            }// Replace "/next-game" with your route
  className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold"
>
  ▶️ Next Game
</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------ GAME SCREEN ------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden relative">
      {floatingTreats.map((treat, index) => (
        <div key={index} className="absolute text-3xl floating-treat" style={{ top: treat.top, left: treat.left, right: treat.right, animationDelay: treat.delay }}>{treat.emoji}</div>
      ))}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-4">
         
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Symbol Detective</h1>
            <p className="text-white/80">Age Group: 10-15 years 🎯</p>
          </div>
          <div className="w-20"></div>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3 mb-6">
          <div className="bg-purple-500 rounded-full h-3 transition-all duration-500 ease-out" style={{ width: `${((currentQuestion + 1) / symbols.length) * 100}%` }}></div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-8">What does this symbol mean?</h2>
            <div className="bg-gray-50 border-4 border-purple-200 rounded-2xl p-12 mb-8 mx-auto max-w-sm">
              <div className="text-8xl font-bold text-purple-600">{symbols[currentQuestion].symbol}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {symbols[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showFeedback}
                className={`${getAnswerButtonClass(index)} text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="text-center mt-6">
              <div className={`text-2xl font-bold ${selectedAnswer === symbols[currentQuestion].correctIndex ? 'text-green-600' : 'text-red-500'}`}>
                {selectedAnswer === symbols[currentQuestion].correctIndex ? '✅ Correct! Great detective work!' : '❌ Not quite! Keep investigating!'}
              </div>
              {selectedAnswer !== symbols[currentQuestion].correctIndex && (
                <p className="text-gray-600 mt-2">The correct answer is: <strong>{symbols[currentQuestion].options[symbols[currentQuestion].correctIndex]}</strong></p>
              )}
            </div>
          )}
          <div className="text-center mt-6 text-gray-500">Symbol {currentQuestion + 1} of {symbols.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SymbolDetectiveGame;
