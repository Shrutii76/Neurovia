import { useEffect, useState } from "react";

const EMOJIS = ["🍭", "🍬", "🍫", "🍪", "🍩", "🍡"];

export function FloatingCandies({ count = 12 }) {
  const [candies, setCandies] = useState<
    { top: number; left: number; delay: number; size: number; emoji: string }[]
  >([]);

  useEffect(() => {
    setCandies(
      Array.from({ length: count }).map(() => ({
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        top: Math.random() * 90, // keep inside container
        left: Math.random() * 90,
        delay: +(Math.random() * 3).toFixed(2),
        size: 20 + Math.floor(Math.random() * 20), // 20–40px
      }))
    );
  }, [count]);

  return (
    <>
      {candies.map((c, i) => (
        <span
          key={i}
          className="absolute animate-float pointer-events-none"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            fontSize: `${c.size}px`,
            filter: "drop-shadow(0 2px 2px rgba(0,0,0,.2))",
          }}
        >
          {c.emoji}
        </span>
      ))}
    </>
  );
}
