import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HeroSection from "./components/HeroSection";
import { CandyIslandMap } from "./components/CandyIslandMap";
import { CandyCountGame } from "./components/CandyCountGame";
import ClockGame from "./components/ClockGame";
import MathChatAdventure from "./components/MathChatAdventure";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ Everything inside BrowserRouter */}
      <BrowserRouter>
        <Routes>
          {/* ✅ Only one / route */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/index" element={<Index />} />
          <Route path="/candyIslandMap" element={<CandyIslandMap />} />
           <Route path="/game/candy-count" element={<CandyCountGame />} />
    <Route path="/game/clock" element={<ClockGame />} />
    <Route path="/game/math-chat" element={<MathChatAdventure />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
