import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PatternDetectiveGame = () => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState("welcome");
  const [currentPattern, setCurrentPattern] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameStats, setGameStats] = useState({
    questionsAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    finalScore: 0,
  });

  const timerRef = useRef<any>(null);
  const MAX_QUESTIONS = 10;
  const navigate = useNavigate();

  const handleAnswer = (answer: any) => {
    if (isAnimating) return;
    setSelectedAnswer(answer);
    setIsAnimating(true);

    const newTotalQuestions = totalQuestions + 1;
    const isCorrect = answer === currentPattern.correct;

    setTotalQuestions(newTotalQuestions);
    setGameStats((prev) => ({
      ...prev,
      questionsAnswered: newTotalQuestions,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      wrongCount: prev.wrongCount + (isCorrect ? 0 : 1),
    }));

    if (isCorrect) {
      setGameState("correct");
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setGameState("wrong");
    }

    const nextAction = () => {
      if (newTotalQuestions >= MAX_QUESTIONS) {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameStats((prev) => ({
          ...prev,
          finalScore: isCorrect ? score + 10 : score,
        }));
        setGameState("results");
      } else {
        generateNewPattern();
        setGameState("playing");
        setSelectedAnswer(null);
        setIsAnimating(false);
      }
    };
    setTimeout(nextAction, isCorrect ? 1500 : 2000);
  };

  // 🔹 Pattern Types
  const patternTypes = [
    {
      name: "add2",
      description: "Adding 2",
      generate: () => {
        const start = Math.floor(Math.random() * 10) + 1;
        const sequence = [start, start + 2, start + 4, start + 6];
        const missing = start + 8;
        return {
          sequence,
          correct: missing,
          options: [missing, missing + 1, missing - 1].sort(
            () => Math.random() - 0.5
          ),
          type: "Adding 2",
        };
      },
    },
    {
      name: "circle-square",
      description: "Circle-Square",
      generate: () => {
        const sequence = ["⚪", "⬛", "⚪", "⬛"];
        return {
          sequence,
          correct: "⚪",
          options: ["⚪", "⭐", "🔺"].sort(() => Math.random() - 0.5),
          type: "Shapes",
        };
      },
    },
    {
      name: "fruit-pattern",
      description: "Fruit Pattern",
      generate: () => {
        const sequence = ["🍎", "🍌", "🍎", "🍌"];
        return {
          sequence,
          correct: "🍎",
          options: ["🍎", "🍇", "🍊"].sort(() => Math.random() - 0.5),
          type: "Fruits",
        };
      },
    },
  ];

  const dessertEmojis = ["🍪", "🍩", "🍭", "🧁", "🍦", "🍫", "🎂", "🍰"];

  const generateNewPattern = () => {
    const randomType =
      patternTypes[Math.floor(Math.random() * patternTypes.length)];
    setCurrentPattern(randomType.generate());
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setTimeLeft(45);
    setGameStats({
      questionsAnswered: 0,
      correctCount: 0,
      wrongCount: 0,
      finalScore: 0,
    });
    generateNewPattern();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStats((prevStats) => ({
            ...prevStats,
            finalScore: score,
          }));
          setGameState("results");
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("welcome");
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
      finalScore: 0,
    });
  };

  const playAgain = () => startGame();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
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

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/CandyIslandMap")}
        className="absolute top-5 left-5 bg-white text-purple-700 px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg font-bold z-50"
      >
        ⬅️ {t("common.backToGames")}
      </button>

      {/* Main Game */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            🎨 {t("pattern.title")}
          </h1>
          <p className="text-xl text-white/90 font-semibold">
            {t("pattern.ageGroup")}
          </p>
          {gameState === "playing" && (
            <p className="text-2xl text-yellow-300 font-bold mt-2">
              {t("pattern.score")}: {score}
            </p>
          )}
        </div>

        {/* Game Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          {/* Welcome Screen */}
          {gameState === "welcome" && (
            <div className="text-center space-y-6">
              <div className="bg-yellow-100 rounded-2xl p-6 border-4 border-yellow-300">
                <h2 className="text-3xl font-bold text-orange-600 mb-4">
                  {t("pattern.howToPlay")}
                </h2>
                <div className="space-y-3 text-lg text-gray-700">
                  <p>🔢 {t("pattern.step1")}</p>
                  <p>🧩 {t("pattern.step2")}</p>
                  <p>✋ {t("pattern.step3")}</p>
                </div>
              </div>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-2xl font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
              >
                {t("pattern.start")} <Play className="ml-2" size={28} />
              </button>
            </div>
          )}

          {/* Playing Screen */}
          {gameState === "playing" && currentPattern && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                {t("pattern.complete")}
              </h2>
              <div className="bg-yellow-50 border-4 border-yellow-300 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-800 tracking-wider">
                  {currentPattern.sequence.join(", ")}, ___
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {currentPattern.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnimating}
                    className="text-2xl font-bold py-6 px-4 rounded-2xl shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-105 transition-all duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Screen */}
          {gameState === "results" && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🏆</div>
              <h2 className="text-4xl font-bold text-purple-600">
                {t("pattern.results.title")}
              </h2>
              <p className="text-xl">{t("pattern.results.score", { score })}</p>
              <button
                onClick={playAgain}
                className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                🔄 {t("pattern.results.playAgain")}
              </button>
            </div>
          )}

          {/* Correct / Wrong Feedback */}
          {gameState === "correct" && (
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold text-green-600">
                {t("pattern.correct")}
              </h2>
            </div>
          )}
          {gameState === "wrong" && (
            <div className="text-center space-y-4">
              <div className="text-6xl">🤔</div>
              <h2 className="text-4xl font-bold text-orange-600">
                {t("pattern.wrong")}
              </h2>
            </div>
          )}
        </div>

        {gameState === "playing" && (
          <button
            onClick={resetGame}
            className="mt-6 flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300"
          >
            <RotateCcw size={20} />
            {t("common.reset")}
          </button>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default PatternDetectiveGame;
