// src/components/StoryModal.tsx
import React from "react";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // hide modal if not open

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-pink-100 to-yellow-50 p-6 rounded-2xl shadow-lg max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-pink-700 font-bold text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
          🍬 The Great Adventure on Candy Island
        </h1>

        <div className="space-y-6 text-lg leading-relaxed font-nunito text-gray-800">
          <p>
            Once upon a time, two best friends <b>Lila</b> and <b>Max</b> set sail across
            the <b>Sugar Sea</b> in a jellybean boat. They finally reached <b>Candy Island</b>,
            a magical land where everything was sweet but guarded by <b>math challenges</b>.
            To travel through each land, they had to play seven special games!
          </p>

          <h3 className="text-xl font-semibold text-purple-600">🍬 Game 1: The Counting Grove</h3>
          <p>
            Lila and Max entered a field full of <b>lollipops, chocolates, donuts, and candies</b>.
            The Candy Fairy asked them to <b>count how many items</b> and pick the correct number.
            Only by counting correctly could they move ahead.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">🎨 Game 2: The Pattern Path</h3>
          <p>
            Next came a glowing path of candies arranged in patterns: <b>🍬🍭🍬🍭…?</b>
            Some parts were missing! They had to <b>fill in the blanks</b> to complete the
            candy patterns and keep the path solid under their feet.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">⚖️ Game 3: The Comparison Bridge</h3>
          <p>
            Two giant candy boxes blocked the bridge. One box had <b>more sweets</b> than the other.
            The Gummy Bear Guard said: “Pick the box with the <b>greater number of elements</b>.”
            Choosing correctly opened the bridge.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">🔍 Game 4: The Symbol Cave</h3>
          <p>
            Inside the glowing cave, strange <b>symbols</b> appeared on the walls.
            They had to <b>detect and guess the right symbols</b> from options to open
            the hidden door deeper into Candy Island.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">⏰ Game 5: The Candy Clock Tower</h3>
          <p>
            The Candy Clock Tower chimed. A wise owl asked them to <b>set the time on a magical clock</b>.
            If they matched the given time correctly, the tower released a rainbow candy key.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">📜 Game 6: The Word Problem Garden</h3>
          <p>
            In a garden of licorice vines, math riddles floated in the air.
            They had to read <b>word problems</b> carefully and pick the correct answers
            to unlock the garden gates.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">💬 Game 7: The Maths Chat with the Candy King</h3>
          <p>
            Finally, in the Candy Castle, the <b>Candy King</b> appeared and started a <b>math chat</b>.
            He asked them quick calculations. Each correct answer turned the floor tiles into gold.
            After solving the last question, the king smiled.
          </p>

          <p className="font-bold text-center text-pink-700">
            🎉 “You’ve completed all seven magical games!” said the Candy King.
            “Math is the sweetest magic of all!”  
            Lila and Max became the official heroes of Candy Island.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
