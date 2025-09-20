// src/components/AnimatedTitle.tsx
import { motion } from "framer-motion";

export interface AnimatedTitleProps {
  text: string;
  className?: string;
  wordGap?: string; // e.g., "1rem", "20px"
  onAnimationComplete?: () => void;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  className = "",
  wordGap = "1rem",
  onAnimationComplete,
}) => {
  const words = text.split(" ");

  return (
    <h1
      className={`text-4xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-500 ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ marginRight: wordGap }}
          className="inline-block"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: charIndex * 0.05, duration: 0.5 }}
              className="inline-block"
              onAnimationComplete={
                wordIndex === words.length - 1 &&
                charIndex === word.length - 1
                  ? onAnimationComplete
                  : undefined
              }
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};
