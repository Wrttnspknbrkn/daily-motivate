import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./contexts/HabitContext";
import { Dashboard } from "./components/Dashboard";
import { Navigation } from "./components/Navigation";
import NotFound from "./pages/NotFound";
import Habits from "./pages/Habits";
import Progress from "./pages/Progress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HabitProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="pb-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Navigation />
        </BrowserRouter>
      </HabitProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;