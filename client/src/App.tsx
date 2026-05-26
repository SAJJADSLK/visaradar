import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import WheelPage from "./pages/WheelPage";
import WheelsPage from "./pages/WheelsPage";
import TeamsPage from "./pages/TeamsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wheel/new" component={WheelPage} />
      <Route path="/wheels" component={WheelsPage} />
      <Route path="/teams" component={TeamsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
