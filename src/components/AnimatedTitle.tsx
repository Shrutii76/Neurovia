// src/components/AnimatedTitle.tsx
import { motion } from "framer-motion";

export interface AnimatedTitleProps {
  text: string;
  className?: string;
  onAnimationComplete?: () => void; // ✅ add this
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  className = "",
  onAnimationComplete,
}) => {
  const letters = text.split("");

  return (
    <h1
      className={`text-4xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-500 ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          className="inline-block"
          // Call only on the last letter
          onAnimationComplete={
            index === letters.length - 1 ? onAnimationComplete : undefined
          }
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
};
