import { Button } from "@/components/ui/button";
import StoryModal from "./StoryModal";
import { CandyIslandMap }  from "./CandyIslandMap";
import { useState } from "react";

const HeroSection = () => {
    const [openStory, setOpenStory] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-candy">
      <div className="absolute inset-0 bg-gradient-rainbow opacity-20 bg-cover bg-center"   style={{
    backgroundImage: "url('candy-island1-bg.jpg')", // put your image inside public/images
  }}></div>
      
  
      <div className="container  px-4 relative z-10">
        <div className=" gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center  ">
           <h1 className="text-4xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-500 animate-gradient">
  Welcome To Candy Island
</h1>

           
            
            <div className="flex flex-col  mt-6 sm:flex-row gap-4 justify-center ">
           <Button
  onClick={() => {
    document.getElementById("CandyIslandMap")?.scrollIntoView({ behavior: "smooth" });
  }}
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

      <StoryModal isOpen={openStory} onClose={() => setOpenStory(false)} />
          </div>

            </div>
            <p className="text-lg text-foreground font-nunito font-semibold mt-8 max-w-2xl mx-auto drop-shadow-sm">
          Embark on a sweet adventure through the magical Candy Island! 
          Discover colorful lands filled with delicious treats and exciting challenges.
        </p>
          </div>

          
         
        </div>
  
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      

    </section>

  );
};

export default HeroSection;