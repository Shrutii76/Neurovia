import React from "react";

export const AnimatedBg = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Moving gradient */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-[length:400%_400%]"></div>

      {/* Floating candies/stars */}
      <div className="absolute top-10 left-5 text-3xl animate-float">🍭</div>
      <div className="absolute top-20 right-10 text-4xl animate-float animation-delay-500">🧁</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-float animation-delay-1000">🍫</div>
    </div>
  );
};
