import { cn } from "@/lib/utils";
import { Star, Lock } from "lucide-react";
import cupcakeIcon from "@/assets/checkpoint-cupcake.jpg";
import scaleIcon from "@/assets/checkpoint-scale.jpg";
import lollipopIcon from "@/assets/checkpoint-lollipop.jpg";
import chocolateIcon from "@/assets/checkpoint-chocolate.jpg";
import clockIcon from "@/assets/checkpoint-clock.jpg";
import chat from "@/assets/checkpoint-chat1.jpg";

interface CheckpointData {
  id: number;
  name: string;
  type: "cupcake" | "scale" | "lollipop" | "chocolate" | "clock"|"chat";
  position: { x: number; y: number };
  completed: boolean;
  stars: number;
  current?: boolean;
  locked?: boolean;
}

interface CheckpointProps {
  checkpoint: CheckpointData;
  isSelected: boolean;
  onClick: () => void;
  size?: "normal" | "large";
}

const checkpointIcons = {
  cupcake: cupcakeIcon,
  scale: scaleIcon,
  lollipop: lollipopIcon,
  chocolate: chocolateIcon,
  clock: clockIcon,
  chat:chat,
};

export const Checkpoint = ({ checkpoint, isSelected, onClick, size = "normal" }: CheckpointProps) => {
  const sizeClasses = size === "large" ? "w-24 h-24" : "w-16 h-16";
  const iconSize = size === "large" ? "w-20 h-20" : "w-12 h-12";

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
      style={{
        left: `${checkpoint.position.x}%`,
        top: `${checkpoint.position.y}%`,
      }}
    >
      <button
        onClick={onClick}
        disabled={checkpoint.locked}
        className={cn(
          "relative transition-candy",
          sizeClasses,
          !checkpoint.locked && "cursor-pointer hover:scale-110 bounce-hover",
          checkpoint.locked && "cursor-not-allowed opacity-60",
          checkpoint.current && "pulse-glow",
          isSelected && "scale-125"
        )}
      >
        {/* Main checkpoint icon */}
        <div
          className={cn(
            "relative rounded-full overflow-hidden shadow-checkpoint border-4",
            iconSize,
            checkpoint.completed && "border-candy-mint",
            checkpoint.current && "border-candy-pink-bright",
            checkpoint.locked && "border-muted",
            !checkpoint.completed && !checkpoint.current && "border-candy-lavender"
          )}
        >
          <img
            src={checkpointIcons[checkpoint.type]}
            alt={checkpoint.name}
            className="w-full h-full object-cover"
          />
          
          {/* Lock overlay */}
          {checkpoint.locked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Stars for completed levels */}
        {checkpoint.completed && checkpoint.stars > 0 && (
          <div className="absolute -top-2 -right-2 flex">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-3 h-3",
                  star <= checkpoint.stars
                    ? "text-candy-sunshine fill-current"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
        )}

        {/* Current level indicator */}
        {checkpoint.current && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-candy-pink-bright text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              PLAY
            </div>
          </div>
        )}

        {/* Level number */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-rainbow rounded-full flex items-center justify-center text-white text-sm font-bold shadow-candy">
          {checkpoint.id}
        </div>
      </button>
    </div>
  );
};