
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Posts from "./pages/Posts";
import Analytics from "./pages/Analytics";
import Platforms from "./pages/Platforms";
import FreelancersHire from "./pages/FreelancersHire";
import FreelancersApply from "./pages/FreelancersApply";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { AIProvider } from "./contexts/AIContext";
import { DatabaseProvider } from "./contexts/DatabaseContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AIProvider>
        <DatabaseProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/freelancers/hire" element={<FreelancersHire />} />
                <Route path="/freelancers/apply" element={<FreelancersApply />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DatabaseProvider>
      </AIProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
