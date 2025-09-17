// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import StoryModal from "./StoryModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatedTitle } from "./AnimatedTitle";
import { speakIndianCartoon } from '../utils/speech';
import { useEffect } from 'react';

const HeroSection = () => {
  const [openStory, setOpenStory] = useState(false);
  const navigate = useNavigate();

const playCartoonVoice = async () => {
  try {
    const res = await fetch('http://localhost:3001/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voiceId: 'tc_66bc60339ab2db047154b94e',
        text: 'Welcome to Candy Island! ...',
        format: 'mp3'
      })
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  } catch (err) {
    console.error(err);
  }
};


    // play voice when component loads
  // useEffect(() => {
  //   speakIndianCartoon('"Welcome to Candy Island! Your sweet adventure begins here!Are you ready for your candy island world? Let’s go!"');
  // }, []);


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
  onClick={() => {
    playCartoonVoice();
    setTimeout(() => navigate("/CandyIslandMap"), 2000);
  }}
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
