import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoryModal = ({ isOpen, onClose }: StoryModalProps) => {
 
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>


      {/* Modal content */}
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-2xl shadow-lg bg-gradient-to-b from-pink-100 to-yellow-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-pink-600">
            🍬 The Great Adventure on Candy Island
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-lg leading-relaxed font-nunito text-gray-800">
          <p>
            Once upon a time, two best friends, <b>Lila</b> and <b>Max</b>,
            sailed across a sparkling <b>Sugar Sea</b> in a jellybean boat. They
            dreamed of finding <b>Candy Island</b>, a magical land where
            everything was made of sweets. But Candy Island had a secret… 👉 To
            explore it, you had to solve <b>math puzzles</b> hidden in every
            corner!
          </p>

          <h3 className="text-xl font-semibold text-purple-600">🌉 Chapter 1: The Chocolate Bridge</h3>
          <p>
            The first thing they saw was a huge <b>Chocolate Bridge</b> guarded
            by a friendly candy wizard.
          </p>
          <p>
            👉 Puzzle: “If there are <b>12 chocolate bars</b> and each child
            eats <b>3</b>, how many children can share them equally?”
          </p>
          <p>✅ Answer: 4 children!</p>

          <h3 className="text-xl font-semibold text-purple-600">🌳 Chapter 2: The Lollipop Forest</h3>
          <p>
            Each tree had <b>6 branches</b>, and each branch grew{" "}
            <b>5 lollipops</b>.
          </p>
          <p>👉 Puzzle: How many lollipops are on one tree?</p>
          <p>✅ Answer: 30 lollipops!</p>

          <h3 className="text-xl font-semibold text-purple-600">🐻 Chapter 3: The Gummy Bear Guard</h3>
          <p>
            The guard asked: “I have <b>24 gummy bears</b>. If I put them into
            groups of <b>8</b>, how many groups do I have?”
          </p>
          <p>✅ Answer: 3 groups!</p>

          <h3 className="text-xl font-semibold text-purple-600">⛰️ Chapter 4: Jellybean Mountain</h3>
          <p>
            Jellybean steps went up in sequence: <b>2, 4, 6, 8…</b>
          </p>
          <p>👉 Puzzle: If the 5th step is 10, what is the 10th step?</p>
          <p>✅ Answer: 20!</p>

          <h3 className="text-xl font-semibold text-purple-600">🕳️ Chapter 5: The Cookie Cave</h3>
          <p>
            Riddle: “I am a number between 10 and 20. I am double 7. What am
            I?”
          </p>
          <p>✅ Answer: 14!</p>

          <h3 className="text-xl font-semibold text-purple-600">🏰 Chapter 6: The Candy Castle</h3>
          <p>
            The Candy King asked: “I have <b>40 candies</b>. I share them
            equally among <b>5 children</b>. How many does each get?”
          </p>
          <p>✅ Answer: 8 candies each!</p>

          <p className="font-bold text-center text-pink-700">
            🎉 The Candy King crowned them winners, saying: <br />
            “Math is the true magic of Candy Island. Every puzzle you solve
            makes the world sweeter!”
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
