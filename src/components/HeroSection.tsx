// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import StoryModal from "./StoryModal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatedTitle } from "./AnimatedTitle";
import { speakIndianCartoon } from '../utils/speech';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher'; // 👈 Import LanguageSwitcher
import '../index.css';

const HeroSection = () => {
  const [openStory, setOpenStory] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // i18next hook

  // Play welcome voice when component loads
  useEffect(() => {
    speakIndianCartoon(t("hero.welcomeVoice"));
  }, [t]);

  const handleStartAdventure = () => {
    speakIndianCartoon(t("hero.startVoice"));

    // Delay navigation so audio can play
    setTimeout(() => navigate("/CandyIslandMap"), 1500);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-candy">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-rainbow opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('candy-island1-bg.jpg')" }}
      ></div>

      {/* Language Switcher at top-right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="container px-4 relative z-10">
        <div className="gap-12 items-center">
          <div className="text-center">
            {/* Animated Title */}
           <AnimatedTitle
  text="Welcome to Candy Island!"
  wordGap="2rem"
  onAnimationComplete={() => console.log("Animation done")}
/>


            {/* Buttons */}
            <div className="flex flex-col mt-6 sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleStartAdventure}
                className="hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-300/50"
              >
                {t("hero.startButton")}
              </Button>

              <Button
                variant="sunshine"
                size="lg"
                className="hover-candy"
                onClick={() => setOpenStory(true)}
              >
                {t("hero.readStoryButton")}
              </Button>

              <StoryModal
                isOpen={openStory}
                onClose={() => setOpenStory(false)}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-center text-foreground font-nunito font-semibold mt-8 max-w-2xl mx-auto drop-shadow-sm">
            {t("hero.description")}
          </p>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
