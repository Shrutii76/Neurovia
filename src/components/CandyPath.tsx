import { useMemo } from "react";

interface CheckpointData {
  id: number;
  position: { x: number; y: number };
  completed: boolean;
  current?: boolean;
  locked?: boolean;
}

interface CandyPathProps {
  checkpoints: CheckpointData[];
}

export const CandyPath = ({ checkpoints }: CandyPathProps) => {
  const pathData = useMemo(() => {
    if (checkpoints.length < 2) return "";
    
    const points = checkpoints.map(cp => `${cp.position.x},${cp.position.y}`);
    return `M ${points.join(" L ")}`;
  }, [checkpoints]);

  const completedPathData = useMemo(() => {
    const completedCheckpoints = checkpoints.filter(cp => cp.completed);
    if (completedCheckpoints.length < 2) return "";
    
    const points = completedCheckpoints.map(cp => `${cp.position.x},${cp.position.y}`);
    return `M ${points.join(" L ")}`;
  }, [checkpoints]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for the path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--candy-pink-bright))" />
            <stop offset="50%" stopColor="hsl(var(--candy-lavender))" />
            <stop offset="100%" stopColor="hsl(var(--candy-mint))" />
          </linearGradient>
          
          <linearGradient id="completedPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--candy-mint))" />
            <stop offset="100%" stopColor="hsl(var(--candy-sunshine))" />
          </linearGradient>

          {/* Candy pattern for the path */}
          <pattern id="candyPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="hsl(var(--candy-pink))" opacity="0.6" />
            <circle cx="6" cy="6" r="1" fill="hsl(var(--candy-mint))" opacity="0.6" />
          </pattern>
        </defs>

        {/* Main path (incomplete sections) */}
        <path
          d={pathData}
          stroke="url(#pathGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"  
          strokeDasharray="10,5"
          opacity="0.7"
        />

        {/* Completed path sections */}
        <path
          d={completedPathData}
          stroke="url(#completedPathGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />

        {/* Candy decorations along the path */}
        <path
          d={completedPathData}
          stroke="url(#candyPattern)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Animated sparkles along completed path */}
        {checkpoints
          .filter(cp => cp.completed)
          .map((checkpoint, index) => (
            <g key={checkpoint.id}>
              <circle
                cx={checkpoint.position.x}
                cy={checkpoint.position.y}
                r="2"
                fill="hsl(var(--candy-sunshine))"
                opacity="0.8"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.5}s` }}
              />
              <circle
                cx={checkpoint.position.x + 3}
                cy={checkpoint.position.y - 3}
                r="1"
                fill="hsl(var(--candy-pink))"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.5 + 0.25}s` }}
              />
            </g>
          ))}
      </svg>
    </div>
  );
};