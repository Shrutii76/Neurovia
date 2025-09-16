import { useState } from "react";
import candyIslandBg from "@/assets/candy-island-bg.jpg";
import { Checkpoint } from "./Checkpoint";
import { CandyPath } from "./CandyPath";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Trophy, Heart } from "lucide-react";
import { CandyCountGame } from "./CandyCountGame";
import ClockGame from "./ClockGame";
import MathChatAdventure from "./MathChatAdventure";
import { useNavigate } from "react-router-dom";



const checkpoints = [
  {
    id: 1,
    name: "Cupcake Counting",
    type: "cupcake" as const,
    position: { x: 15, y: 75 },
    completed: true,
    stars: 3,
    game:"candyCount"
  },
  {
    id: 2,
    name: "Candy clock Time",
    type: "clock" as const,
    position: { x: 28, y: 63 },
    completed: true,
    stars: 2,
    game:"clockGame"
  },
  {
    id: 3,
    name: "Lollipop Patterns",
    type: "lollipop" as const,
    position: { x: 42, y: 48 },
    completed: false,
    stars: 0,
    current: true,
  },
  {
    id: 4,
    name: "Chocolate Letters",
    type: "chocolate" as const,
    position: { x: 55, y: 38 },
    completed: false,
    stars: 0,
    locked: true,
  },
  {
    id: 5,
    name: "Clock Tower Time",
    type: "clock" as const,
    position: { x: 68, y: 50 },
    completed: false,
    stars: 0,
    locked: true,
  },
  {
    id: 6,
    name: "Clock Tower Time",
    type: "clock" as const,
    position: { x: 82, y: 43 },
    completed: false,
    stars: 0,
    locked: true,
  },
   {
    id: 7,
    name: "Coversational Math Game",
    type: "chat" as const,
    position: { x: 95, y: 52 },
    completed: false,
    stars: 0,
    current: true,
    game:"MathChatAdventure"
  },
];

export const CandyIslandMap = () => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const handleCheckpointClick = (checkpointId: number) => {
    const checkpoint = checkpoints.find(cp => cp.id === checkpointId);
    if (checkpoint && !checkpoint.locked) {
      setSelectedCheckpoint(checkpointId);
    }
  };

  const handlePlay = () => {
    const checkpoint = checkpoints.find(cp => cp.id === selectedCheckpoint);
    if (!checkpoint) return;

    switch (checkpoint.game) {
      case "candyCount":
        navigate("/game/candy-count");
        break;
      case "clockGame":
        navigate("/game/clock");
        break;
      case "MathChatAdventure":
        navigate("/game/math-chat");
        break;
      default:
        alert("Game coming soon!");
    }
  };
   const renderGame = () => {
    const checkpoint = checkpoints.find(cp => cp.id === selectedCheckpoint);
    if (!checkpoint) return null;

    switch (checkpoint.game) {
      case "candyCount":
        return <CandyCountGame />;
      case "clockGame":
        return <ClockGame />;
        case "MathChatAdventure":
        return <MathChatAdventure />;
      default:
        return <p className="text-center text-lg">🚧 Game coming soon!</p>;
    }
  };

  return (
    <div id="CandyIslandMap" className="min-h-screen bg-gradient-island overflow-hidden relative">
      {/* Background Island */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${candyIslandBg})` }}
      />
      
      {/* Floating candy decorations */}
      <div className="absolute top-10 left-10 text-6xl float">🍭</div>
      <div className="absolute top-20 right-20 text-5xl float" style={{ animationDelay: '1s' }}>🧁</div>
      <div className="absolute bottom-20 left-20 text-4xl float" style={{ animationDelay: '2s' }}>🍫</div>
      <div className="absolute bottom-10 right-10 text-5xl float" style={{ animationDelay: '0.5s' }}>🍬</div>
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <Card className="bg-gradient-candy-pink shadow-candy border-0 backdrop-blur-sm bg-opacity-90">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-rainbow bg-clip-text text-transparent">
                  Candy Quest Island
                </h1>
                <p className="text-muted-foreground mt-1">Choose your sweet adventure!</p>
              </div>
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
                const checkpoint = checkpoints.find(cp => cp.id === selectedCheckpoint);
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
                              ? 'text-candy-sunshine fill-current' 
                              : 'text-muted-foreground'
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

      {/* ✅ Game Modal */}
      {showGame && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center  z-50 p-4">
         
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full   overflow-auto">
              {/* Close button at top-left */}
      <Button
        onClick={() => {
          setShowGame(false);
          setSelectedCheckpoint(null);
        }}
        className="absolute top-4 left-4 ml-4 bg-pink-500 text-white px-4 py-2 rounded"
      >
        Close Game
      </Button>
            {renderGame()}
            {/* <div className="mt-4 text-center">
              <Button
                onClick={() => {
                  setShowGame(false);
                  setSelectedCheckpoint(null);
                }}
                className="bg-pink-500 text-white px-6 py-2 rounded"
              >
                Close Game
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
