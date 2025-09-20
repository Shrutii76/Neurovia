import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Star, Candy, Heart } from "lucide-react"; // playful icons

interface GameInstructionsProps {
  onStart: () => void; // callback when "start" button is clicked
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-100 px-6 py-12">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        {/* Decorative floating icons */}
        <Star className="absolute top-6 left-6 text-pink-400 w-8 h-8 animate-bounce" />
        <Heart className="absolute top-6 right-6 text-red-400 w-8 h-8 animate-pulse" />
        <Candy className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-purple-400 w-8 h-8 animate-spin" />

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-pink-700 mb-4 tracking-tight drop-shadow-sm">
          🍭 {t("game.instructions.title")}
        </h1>

        {/* Age Group */}
        <p className="text-lg font-semibold text-purple-700 mb-2">
          {t("game.instructions.ageGroup")}
        </p>

        {/* Welcome Message */}
        <p className="text-xl text-pink-600 mb-4 font-semibold">
          {t("game.instructions.welcome")}
        </p>

        {/* Description */}
        <p className="text-gray-800 text-lg mb-6 leading-relaxed">
          {t("game.instructions.description")}
        </p>

        {/* How to Play Section */}
        <h2 className="text-2xl font-bold text-pink-800 mb-4">
          {t("game.instructions.howToPlay")}
        </h2>
        <ul className="list-none text-left space-y-3 mb-8">
          <li className="flex items-center gap-3 bg-pink-50 rounded-xl px-4 py-3 shadow-sm">
            <Star className="text-yellow-500 w-5 h-5" />
            <span className="text-gray-700">{t("game.instructions.step1")}</span>
          </li>
          <li className="flex items-center gap-3 bg-purple-50 rounded-xl px-4 py-3 shadow-sm">
            <Heart className="text-pink-500 w-5 h-5" />
            <span className="text-gray-700">{t("game.instructions.step2")}</span>
          </li>
          <li className="flex items-center gap-3 bg-yellow-50 rounded-xl px-4 py-3 shadow-sm">
            <Candy className="text-purple-500 w-5 h-5" />
            <span className="text-gray-700">{t("game.instructions.step3")}</span>
          </li>
        </ul>

        {/* Start Button */}
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
        >
          🍬 {t("game.instructions.start")}
        </Button>
      </div>
    </section>
  );
};

export default GameInstructions;
