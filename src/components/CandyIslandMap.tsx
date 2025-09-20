import { useState } from "react";
import candyIslandBg from "@/assets/candy-island-bg.jpg";
import { Checkpoint } from "./Checkpoint";
import { CandyPath } from "./CandyPath";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Trophy, Heart } from "lucide-react";
import { CandyCountGame } from "./CandyCountGame";
import MathChatAdventure from "./MathChatAdventure";
import { useNavigate } from "react-router-dom";
import CandyComparisonGame from "./CandyComparisonGame";
import SymbolDetectiveGame from "./SymbolDetectiveGame";
import MathStoryGame from "./MathsStoryGame";
import { CandyClock } from "./CandyClock";
import PatternChallenge from "./PatternChallenge";
import React from "react";

// ✅ Keep only checkpoints and speakName outside
const checkpoints = [
  {
    id: 1,
    name: "Cupcake Counting",
    type: "cupcake" as const,
    position: { x: 15, y: 75 },
    completed: true,
    stars: 3,
    game: "candyCount",
    locked: false,
    current: true,
  },
  {
    id: 2,
    name: "Pattern Challenge",
    type: "chocolate" as const,
    position: { x: 28, y: 63 },
    completed: true,
    stars: 2,
    game: "PatternChallenge",
  },
  {
    id: 3,
    name: "candy comparison",
    type: "scale" as const,
    position: { x: 42, y: 48 },
    completed: false,
    stars: 0,
    game: "CandyComparisonGame",
  },
  {
    id: 4,
    name: "Symbol Detection",
    type: "lollipop" as const,
    position: { x: 55, y: 38 },
    completed: false,
    stars: 0,
    game: "SymbolDetectiveGame",
  },
  {
    id: 5,
    name: "Candy clock",
    type: "clock" as const,
    position: { x: 68, y: 50 },
    completed: false,
    stars: 2,
    game: "CandyClock",
  },
  {
    id: 6,
    name: "Maths story",
    type: "story" as const,
    position: { x: 82, y: 43 },
    completed: false,
    stars: 0,
    game: "MathsStoryGame",
  },
  {
    id: 7,
    name: "Coversational Math Game",
    type: "chat" as const,
    position: { x: 95, y: 52 },
    completed: false,
    stars: 0,
    game: "MathChatAdventure",
  },
];

// ✅ Speech helper
const speakName = (text: string) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN"; // or en-US
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};


  let goToPage = () => {
    window.location.href = "http://localhost:8080"; // your link
  };


export const CandyIslandMap = () => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  // ✅ Only one handleCheckpointClick INSIDE the component
  const handleCheckpointClick = (checkpointId: number) => {
    const checkpoint = checkpoints.find((cp) => cp.id === checkpointId);
    if (checkpoint && !checkpoint.locked) {
      speakName(checkpoint.name); // speak aloud
      setSelectedCheckpoint(checkpointId);
    }
  };

  const handlePlay = () => {
    const checkpoint = checkpoints.find((cp) => cp.id === selectedCheckpoint);
    if (!checkpoint) return;

    switch (checkpoint.game) {
      case "candyCount":
        navigate("/game/candy-count");
        break;
      case "MathChatAdventure":
        navigate("/game/math-chat");
        break;
      case "CandyComparisonGame":
        navigate("/game/CandyComparison");
        break;
      case "MathsStoryGame":
        navigate("/game/MathsStory");
        break;
      case "SymbolDetectiveGame":
        navigate("/game/SymbolDetective");
        break;
      case "CandyClock":
        navigate("/game/CandyClock");
        break;
      case "PatternChallenge":
        navigate("/game/PatternChallenge");
        break;
      default:
        alert("Game coming soon!");
    }
  };

  const renderGame = () => {
    const checkpoint = checkpoints.find((cp) => cp.id === selectedCheckpoint);
    if (!checkpoint) return null;

    switch (checkpoint.game) {
      case "candyCount":
        return <CandyCountGame />;
      case "MathChatAdventure":
        return <MathChatAdventure />;
      case "CandyComparisonGame":
        return <CandyComparisonGame />;
      case "MathsStoryGame":
        return <MathStoryGame />;
      case "SymbolDetectiveGame":
        return <SymbolDetectiveGame />;
      case "CandyClock":
        return <CandyClock />;
      case "PatternChallenge":
        return <PatternChallenge />;
      default:
        return <p className="text-center text-lg">🚧 Game coming soon!</p>;
    }
  };

  return (
    <div
      id="CandyIslandMap"
      className="min-h-screen bg-gradient-island overflow-hidden relative"
    >
        <button
      onClick={goToPage}
      className="fixed top-5 right-5 z-100 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg text-2xl transition"
    >
      ⬅️
    </button>


      
      {/* Background Island */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${candyIslandBg})` }}
      />




      {/* Floating candy decorations */}
      <div className="absolute top-10 left-10 text-6xl float">🍭</div>
      <div
        className="absolute top-20 right-20 text-5xl float"
        style={{ animationDelay: "1s" }}
      >
        🧁
      </div>
      <div
        className="absolute bottom-20 left-20 text-4xl float"
        style={{ animationDelay: "2s" }}
      >
        🍫
      </div>
      <div
        className="absolute bottom-10 right-10 text-5xl float"
        style={{ animationDelay: "0.5s" }}
      >
        🍬
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Card className="bg-gradient-candy-pink shadow-candy border-0 backdrop-blur-sm bg-opacity-90">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-rainbow bg-clip-text text-transparent">
                  Candy  Island
                </h1>
                <p className="text-muted-foreground mt-1">
                  Choose your sweet adventure!
                </p>
              </div>
              <button
      onClick={goToPage}
      className="fixed top-5 left-10 z-100 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg text-2xl transition"
    >
      ⬅️
    </button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-candy-sunshine">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">15</span>
                </div>
                <div className="flex items-center gap-1 text-candy-pink">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="font-bold">5</span>
                </div>
                <div className="flex items-center gap-1 text-candy-lavender">
                  <Trophy className="w-5 h-5 fill-current" />
                  <span className="font-bold">3</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Game Map */}
      <div className="relative z-10 px-6 pb-6">
        <div className="relative w-full h-[600px] overflow-hidden rounded-3xl">
          {/* Candy Path */}
          <CandyPath checkpoints={checkpoints} />

          {/* Checkpoints */}
          {checkpoints.map((checkpoint) => (
            <Checkpoint
              key={checkpoint.id}
              checkpoint={checkpoint}
              isSelected={selectedCheckpoint === checkpoint.id}
              onClick={() => handleCheckpointClick(checkpoint.id)}
            />
          ))}
        </div>
      </div>

      {/* Selected Checkpoint Modal */}
      {selectedCheckpoint && !showGame && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gradient-candy-pink shadow-candy border-0  max-w-md w-full">
            <div className="p-6 text-center">
              {(() => {
                const checkpoint = checkpoints.find(
                  (cp) => cp.id === selectedCheckpoint
                );
                if (!checkpoint) return null;

                return (
                  <>
                    <div className="mb-4">
                      <Checkpoint
                        checkpoint={checkpoint}
                        isSelected={false}
                        onClick={() => {}}
                        size="large"
                      />
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-foreground">
                      {checkpoint.name}
                    </h2>

                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= checkpoint.stars
                              ? "text-candy-sunshine fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCheckpoint(null)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePlay}
                        className="flex-1 bg-gradient-rainbow border-0 text-foreground font-bold bounce-hover"
                      >
                        Play! 🎮
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
