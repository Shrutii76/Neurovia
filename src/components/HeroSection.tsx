// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import StoryModal from "./StoryModal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AnimatedTitle } from "./AnimatedTitle";
import { speakIndianCartoon } from '../utils/speech';



const HeroSection = () => {
  const [openStory, setOpenStory] = useState(false);
  const navigate = useNavigate();
   const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    audioRef.current?.play();
  };


  
    // play voice when component loads
  useEffect(() => {
    speakIndianCartoon('"Welcome to Candy Island! Your sweet adventure begins here! Are you ready for your candy island world? Let’s go!"');
  }, []);




  const handleStartAdventure = () => {
    speakIndianCartoon(
      'Start your adventure! Each candy house hides a fun challenge just for you. Play and learn  along the way! 🌟 Are you ready for your candy adventure? Let’s go!'
    );

    // Delay navigation so audio can play
    setTimeout(() => navigate("/CandyIslandMap"), 1500);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-candy">
      <div
        className="absolute inset-0 bg-gradient-rainbow opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('candy-island1-bg.jpg')",
        }}
      ></div>

      <div className="container px-4 relative z-10">
        <div className="gap-12 items-center">
          <div className="text-center">
            {/* Animated Title with cartoon voice on complete */}
            <AnimatedTitle
              text="Welcome&nbsp;to&nbsp;Candy&nbsp;Island!"
              
            />

            <div className="flex flex-col mt-6 sm:flex-row gap-4 justify-center">
          <Button
                onClick={handleStartAdventure}
                className="hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-300/50"
              >
                🍭 Start Adventure
              </Button>



              <Button
                variant="sunshine"
                size="lg"
                className="hover-candy"
                onClick={() => setOpenStory(true)}
              >
                📖 Read Story
              </Button>

              <StoryModal
                isOpen={openStory}
                onClose={() => setOpenStory(false)}
              />
            </div>
          </div>

          <p className="text-lg text-center text-foreground font-nunito font-semibold mt-8 max-w-2xl mx-auto drop-shadow-sm">
            Embark on a sweet adventure through the magical Candy Island! Discover colorful lands filled with delicious treats and exciting challenges.
          </p>
        </div>
      </div>
    

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
