import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Trophy } from "lucide-react";

interface GameResultsProps {
  score: number;
  totalRounds: number;
  onPlayAgain: () => void;
}

export function GameResults({ score, totalRounds, onPlayAgain }: GameResultsProps) {
  const { t } = useTranslation();

  const percentage = (score / totalRounds) * 100;
  let feedback = "";

  if (percentage === 100) {
    feedback = t("game.final.perfect");
  } else if (percentage >= 60) {
    feedback = t("game.final.great");
  } else {
    feedback = t("game.final.keepTrying");
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-100 px-6 py-12">
      <Card className="relative w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl border-4 border-white/40 shadow-2xl p-10 text-center overflow-hidden">
        {/* Decorative floating icons */}
        <Star className="absolute top-6 left-6 text-yellow-400 w-8 h-8 animate-bounce" />
        <Heart className="absolute top-6 right-6 text-pink-400 w-8 h-8 animate-pulse" />
        <Trophy className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-purple-400 w-8 h-8 animate-spin" />

        {/* Trophy emoji big */}
        <div className="text-7xl mb-6">🏆</div>

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-pink-700 mb-4 drop-shadow-sm">
          {t("game.final.congratulations")}
        </h2>

        {/* Feedback */}
        <p className="text-xl text-purple-700 mb-6 font-medium">{feedback}</p>

        {/* Score box */}
        <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-2xl p-8 mb-8 border-4 border-pink-200 shadow-inner">
          <p className="text-3xl font-bold text-pink-700">
            {t("game.final.score", { score, total: totalRounds })}
          </p>
        </div>

        {/* Play Again Button */}
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
        >
          🔄 {t("game.final.playAgain")}
        </Button>
      </Card>
    </section>
  );
}
