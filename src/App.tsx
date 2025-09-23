import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StartExplore from "./pages/StartExplore";
import Gamification from "./pages/Gamification";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import ARTimeTravel from "./pages/ARTimeTravel";
import Storytelling from "./pages/Storytelling";
import TravelLogs from "./pages/TravelLogs";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<StartExplore />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/ar" element={<ARTimeTravel />} />
          <Route path="/story" element={<Storytelling />} />
          <Route path="/logs" element={<TravelLogs />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
