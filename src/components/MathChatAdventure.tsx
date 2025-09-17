import React, { useState, useEffect, useRef } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

interface Question {
  text: string;
  answer: number;
  calculation: string;
}

interface FloatingTreatProps {
  treat: string;
  style: React.CSSProperties;
}

const MathChatAdventure: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(-1);
  const [startTime] = useState<number>(Date.now());
  const [timer, setTimer] = useState<string>('00:00');
  const [inputValue, setInputValue] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const treats: string[] = ['🍪', '🍫', '🍭', '🧁', '🍰', '🍩', '🍬', '🎂', '🥧'];

  const questions: Question[] = [
    { text: "A laddoo costs ₹5 and a jalebi costs ₹7. How much will 2 laddoos and 1 jalebi cost?", answer: 17, calculation: "2 × ₹5 + 1 × ₹7 = ₹10 + ₹7 = ₹17" },
    { text: "I have 3 boxes of chocolates. Each box has 8 chocolates. How many chocolates do I have in total?", answer: 24, calculation: "3 × 8 = 24" },
    { text: "A cupcake costs ₹12. If you buy 4 cupcakes, how much will you pay?", answer: 48, calculation: "4 × ₹12 = ₹48" },
    { text: "I sold 15 ice creams in the morning and 23 in the evening. How many ice creams did I sell today?", answer: 38, calculation: "15 + 23 = 38" },
    { text: "A packet of cookies costs ₹9. How much will 6 packets cost?", answer: 54, calculation: "6 × ₹9 = ₹54" },
    { text: "I had 50 candies. I sold 32 candies. How many candies are left with me?", answer: 18, calculation: "50 - 32 = 18" },
    { text: "A birthday cake costs ₹25 and candles cost ₹3. What's the total cost for 1 cake and 5 candles?", answer: 40, calculation: "₹25 + (5 × ₹3) = ₹25 + ₹15 = ₹40" },
    { text: "I have 4 jars. Each jar has 15 toffees. How many toffees do I have altogether?", answer: 60, calculation: "4 × 15 = 60" },
    { text: "A chocolate bar costs ₹20. If you buy 3 chocolate bars and a soft drink for ₹15, what is the total cost?", answer: 75, calculation: "3 × ₹20 + ₹15 = ₹60 + ₹15 = ₹75" },
    { text: "I bought 18 mangoes. I gave 7 mangoes to my friend. How many mangoes are left?", answer: 11, calculation: "18 - 7 = 11" }
  ];

  // Timer effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setTimer(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [startTime]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Whenever questionCount changes, ask that question
  useEffect(() => {
    if (gameStarted && questionCount >= 0 && questionCount < questions.length) {
      askQuestion(questionCount);
    }
  }, [questionCount, gameStarted]);

  const addMessage = (text: string, isUser: boolean = false) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const askQuestion = (index: number) => {
    if (index >= questions.length) return;
    const question = questions[index];
    setCurrentQuestion(question);
    setTimeout(() => {
      addMessage(question.text);
    }, 500);
  };

  const startGame = () => {
    setShowInstructions(false);
    setMessages([{ text: "Hi! I'm Priya. Welcome to my sweet shop! 🍬", isUser: false }]);
    setTimeout(() => {
      addMessage("Let me ask you some questions about my shop! 🛍️");
      setTimeout(() => {
        setGameStarted(true);
        setGameFinished(false);
        setQuestionCount(0);
        setScore(0);
      }, 1500);
    }, 1000);
  };

  const submitAnswer = () => {
    if (!currentQuestion) return;
    const userAnswer = parseInt(inputValue.trim());
    if (isNaN(userAnswer)) {
      return;
    }
    addMessage(userAnswer.toString(), true);
    setInputValue('');

    if (userAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);

      setTimeout(() => {
        addMessage(`🎉 Excellent! That's correct! ${currentQuestion.calculation}`);
        setTimeout(() => {
          if (questionCount + 1 < questions.length) {
            addMessage("Let me ask you another question! 🤔");
            setQuestionCount(prev => prev + 1);
          } else {
            setGameFinished(true);
          }
        }, 1500);
      }, 500);
    } else {
      setTimeout(() => {
        addMessage(`Not quite right! The correct answer is ${currentQuestion.answer}. ${currentQuestion.calculation}. Don't worry, let's try another one! 💪`);
        setTimeout(() => {
          if (questionCount + 1 < questions.length) {
            setQuestionCount(prev => prev + 1);
          } else {
            setGameFinished(true);
          }
        }, 1500);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  };

  const FloatingTreat: React.FC<FloatingTreatProps> = ({ treat, style }) => (
    <div
      className="absolute text-2xl pointer-events-none animate-bounce"
      style={{
        ...style,
        animationDuration: `${4 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 6}s`
      }}
    >
      {treat}
    </div>
  );

  // ✅ Progress bar calculation
  const progress =
    questionCount >= questions.length
      ? 100
      : (Math.max(questionCount, 0) / questions.length) * 100;

  // ✅ Result Screen after finishing
  if (gameFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-center px-5 relative overflow-hidden">
        {/* Floating treats */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 6}s`
              }}
            >
              {treats[Math.floor(Math.random() * treats.length)]}
            </div>
          ))}
        </div>

        <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-6">
          🎉 Game Finished!
        </h1>
        <p className="text-xl text-white mb-6">
          Your final score: <strong>{score}/{questions.length}</strong>
        </p>

        <p className="text-lg text-white mb-6">
          {score === questions.length
            ? "Perfect score! You’re a math star! 🌟"
            : score >= questions.length / 2
            ? "Great job! Keep practicing to get even better! 💪"
            : "Nice try! You can always replay to improve! 😊"}
        </p>

        <button
          onClick={() => {
            setScore(0);
            setQuestionCount(-1);
            setGameStarted(false);
            setGameFinished(false);
            setShowInstructions(true);
            setMessages([]);
          }}
          className="px-8 py-4 bg-white text-purple-700 rounded-2xl shadow-lg hover:scale-105 transition-transform text-xl font-bold"
        >
          🔄 Play Again
        </button>
      </div>
    );
  }

  // 🟡 Instruction Screen
  if (showInstructions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-center px-5">
        <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
          🍭 Math Chat Adventure
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Help at sweet shop by solving fun math problems!
          Earn points for each correct answer and watch your score grow!
        </p>

        {/* How to Play Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 text-left max-w-xl w-full mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            📝 How to Play
          </h2>
          <ul className="list-disc list-inside text-purple-800 text-lg space-y-3">
            <li>Read the question carefully and type your answer in the input box.</li>
            <li>Press <strong>Enter</strong> or click the send button 📤 to submit.</li>
            <li>You’ll earn 🏆 points for each correct answer.</li>
            <li>Keep answering to finish all the questions and see your final score!</li>
            <li>Watch your time and try to get the highest score possible. ⏱️</li>
          </ul>
        </div>

        <button
          onClick={startGame}
          className="px-8 py-4 bg-white text-purple-700 rounded-2xl shadow-lg hover:scale-105 transition-transform text-xl font-bold"
        >
          ▶️ Start Game
        </button>
      </div>
    );
  }

  // 🟢 Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 relative overflow-hidden font-sans">
      {/* Floating Treats */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingTreat
            key={i}
            treat={treats[Math.floor(Math.random() * treats.length)]}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-20 text-center p-5 bg-white/20 backdrop-blur-sm">
        <div className="absolute top-5 right-5 bg-white px-4 py-2 rounded-full shadow-lg font-bold text-purple-700">
          ⏱️ {timer}
        </div>
        <div className="absolute top-20 right-5 bg-white px-4 py-2 rounded-2xl shadow-lg font-bold text-green-600">
          🏆 Score: {score}
        </div>
        <h1 className="text-4xl font-bold text-purple-700 mb-2 drop-shadow-sm">
          🍭 Math Chat Adventure
        </h1>
        <p className="text-xl text-purple-600 mb-4">Age Group: 8-10 🍰</p>
        {/* Progress Bar */}
        <div className="w-4/5 mx-auto h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Game Container */}
      <div className="relative z-20 max-w-4xl mx-auto p-5">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl min-h-[500px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 mb-5 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 animate-fade-in ${message.isUser ? 'justify-end' : ''}`}
              >
                {!message.isUser && (
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl mr-4">
                    🧁
                  </div>
                )}
                <div
                  className={`max-w-md px-5 py-4 rounded-2xl text-lg leading-relaxed ${
                    message.isUser
                      ? 'bg-purple-500 text-white'
                      : 'bg-indigo-100 text-indigo-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="flex-1 px-5 py-4 rounded-full text-lg bg-gray-100 border-none outline-none focus:ring-4 focus:ring-purple-300 transition-all"
            />
            <button
              onClick={submitAnswer}
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center justify-center"
            >
              📤
            </button>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center animate-bounce">
            <h2 className="text-3xl font-bold text-green-600 mb-3">🎉 Excellent!</h2>
            <p className="text-gray-600 text-lg">That's correct! Well done!</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default MathChatAdventure;
