import React, { useState } from 'react';
import { GameMenu } from '../components/GameMenu';
import { CandyClock } from '../components/CandyClock';
import { PatternChallenge } from '../components/PatternChallenge';
import { Button } from '../components/ui/button';

const ClockGame= () => {
  const [currentMode, setCurrentMode] = useState<'menu' | 'clock' | 'pattern'>('menu');
  const [candyPoints, setCandyPoints] = useState(0);

  const handleBackToMenu = () => {
    setCurrentMode('menu');
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'clock':
        return (
          <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <Button
                  onClick={handleBackToMenu}
                  variant="outline"
                  className="candy-button bg-white/80"
                >
                  🏠 Back 
                </Button>
                {/* <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    🍬 {candyPoints} Candy Points
                  </p>
                </div> */}
              </div>
              <CandyClock />
            </div>
          </div>
        );
      
      case 'pattern':
        return (
          <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <Button
                  onClick={handleBackToMenu}
                  variant="outline"
                  className="candy-button bg-white/80"
                >
                  🏠 Back to Island
                </Button>
                {/* <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    🍬 {candyPoints} Candy Points
                  </p>
                </div> */}
              </div>
              <PatternChallenge />
            </div>
          </div>
        );
      
      default:
        return <GameMenu onSelectMode={setCurrentMode} candyPoints={candyPoints} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {renderContent()}
    </div>
  );
};

export default ClockGame;
