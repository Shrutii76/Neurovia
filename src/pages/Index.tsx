import React from "react";
import HeroSection from "@/components/HeroSection";

// ✅ Index page component
const Index: React.FC = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero section (with Language Switcher included inside HeroSection) */}
      <HeroSection />
    </main>
  );
};

export default Index;
