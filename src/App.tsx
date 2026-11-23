import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Usage from "./pages/Usage";
import ToolPage from "./pages/ToolPage";
import NotFound from "./pages/NotFound";
import CommandPalette from "./components/CommandPalette";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteFocus from "./components/RouteFocus";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SkipLink from "./components/SkipLink";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <SkipLink />
      <CommandPalette />
      <RouteFocus />
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/tool/:toolId" element={<ToolPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <SiteFooter />
      </div>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
