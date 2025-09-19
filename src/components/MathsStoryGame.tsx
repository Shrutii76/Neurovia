import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MathStoryGame = () => {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate=useNavigate();

  const questions = [
    {
      question: "🧒 Ravi has ₹10. He buys a pen for ₹6. How much money is left?",
      options: ["₹4", "₹6", "₹2"],
      correctIndex: 0
    },
    {
      question: "🍭 Sara has 8 candies. She gives 3 to her friend. How many candies does she have now?",
      options: ["3", "5", "8"],
      correctIndex: 1
    },
    {
      question: "🧁 There are 12 cupcakes. If 4 children eat 1 cupcake each, how many are left?",
      options: ["6", "8", "4"],
      correctIndex: 1
    },
    {
      question: "🐱 Tom has 7 toy cars. His mom gives him 3 more. How many cars does Tom have now?",
      options: ["10", "4", "7"],
      correctIndex: 0
    },
    {
      question: "🍪 A jar has 15 cookies. Kids ate 6 cookies. How many cookies are still in the jar?",
      options: ["11", "9", "6"],
      correctIndex: 1
    }
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

  const handleAnswerClick = (answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const correct = answerIndex === questions[currentQuestion].correctIndex;
    if (correct) setScore(score + 1);

    // --- Speak Feedback ---
    speakText(
      correct
        ? " Correct!"
        : ` Wrong! The correct answer is ${questions[currentQuestion].options[questions[currentQuestion].correctIndex]}`
    );

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
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

  const getAnswerButtonClass = (index) => {
    if (!showFeedback) return "bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-200";
    if (index === questions[currentQuestion].correctIndex) return "bg-green-600 ring-4 ring-green-300 animate-pulse";
    if (index === selectedAnswer) return "bg-red-500 ring-4 ring-red-300";
    return "bg-gray-400";
  };

  // --- Voice Function ---
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}]/gu, '')); // remove emojis
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden relative">
        {floatingTreats.map((treat, index) => (
          <div
            key={index}
            className="absolute text-4xl animate-bounce"
            style={{ top: treat.top, left: treat.left, right: treat.right, animationDelay: treat.delay, animationDuration: "3s" }}
          >{treat.emoji}</div>
        ))}
                 {/* 🔙 Back to Games button */}
    <button
      onClick={() => navigate("/CandyIslandMap")}
      className="absolute top-5 left-5 bg-white text-purple-700 px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold z-50"
    >
      ⬅️ Back to Games
    </button>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-2">Math Story Time</h1>
            <p className="text-lg text-blue-600 font-medium">Age Group: 8-12 🎯</p>
            <div className="bg-green-100 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">How to Play</h2>
              <div className="space-y-3 text-green-700">
                <p>You will see a math story problem.</p>
                <p>Read it carefully and solve the problem!</p>
                <p>Then tap the correct answer.</p>
                <p>🔊 You can click the speaker icon to hear the question.</p>
                <p>✅/❌ You will hear feedback after selecting an answer!</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Solve Problems! 📝
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / questions.length) * 100);
    const celebration = percentage >= 80 ? "🎉🌟" : percentage >= 60 ? "🎊👏" : "💪🌈";
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden relative">
        {floatingTreats.map((treat, index) => (
          <div
            key={index}
            className="absolute text-4xl animate-spin"
            style={{ top: treat.top, left: treat.left, right: treat.right, animationDelay: treat.delay, animationDuration: "4s" }}
          >{treat.emoji}</div>
        ))}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">{celebration}</div>
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Great Job!</h2>
            <div className="text-6xl font-bold text-green-600 mb-2">{score}/{questions.length}</div>
            <p className="text-xl text-blue-600">You got {percentage}% correct!</p>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 my-4">
              <p className="text-lg text-gray-700">
                {percentage >= 80 ? "Amazing work! You're a math star! ⭐" :
                 percentage >= 60 ? "Good job! Keep practicing! 👍" :
                 "Don't give up! Practice makes perfect! 💪"}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-purple-500 hover:bg-purple-600 text-white text-xl  py-3 px-4 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg "
            >
              Play Again! 🔄
            </button>
&nbsp;&nbsp;

               <button
  onClick={() => navigate("/game/math-chat", { state: { from: "MathsStoryGame" } })
            }// Replace "/next-game" with your route
  className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold"
>
  ▶️ Next Game
</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 overflow-hidden relative">
      {floatingTreats.map((treat, index) => (
        <div
          key={index}
          className="absolute text-3xl animate-pulse"
          style={{ top: treat.top, left: treat.left, right: treat.right, animationDelay: treat.delay, animationDuration: "2s" }}
        >{treat.emoji}</div>
      ))}

      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={resetGame} className="text-white text-lg hover:text-yellow-200 transition-colors duration-200">← Back to Games</button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Math Story Time 📖</h1>
            <p className="text-white/80">Age Group: 8-12 🎯</p>
          </div>
          <div className="w-20"></div>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3 mb-6">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-600">Solve the problem</h2>
            <button
              onClick={() => speakText(questions[currentQuestion].question)}
              className="text-2xl p-2 bg-yellow-200 rounded-full hover:bg-yellow-300 transition-colors"
            >🔊</button>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <p className="text-xl text-gray-800 leading-relaxed">{questions[currentQuestion].question}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
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
              <div className={`text-2xl font-bold ${selectedAnswer === questions[currentQuestion].correctIndex ? 'text-green-600' : 'text-red-500'}`}>
                {selectedAnswer === questions[currentQuestion].correctIndex ? '✅ Correct!' : '❌ Try again next time!'}
              </div>
              {selectedAnswer !== questions[currentQuestion].correctIndex && (
                <p className="text-gray-600 mt-2">
                  The correct answer is: {questions[currentQuestion].options[questions[currentQuestion].correctIndex]}
                </p>
              )}
            </div>
          )}

          <div className="text-center mt-6 text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathStoryGame;
