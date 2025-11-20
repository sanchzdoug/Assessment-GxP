import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AssessmentWizard from "./components/AssessmentWizard";
import CompanyRegistration from "./components/CompanyRegistration";
import SystemsInventory from "./components/SystemsInventory";
import ReportsPage from "./components/ReportsPage";
import AssessmentsManager from "./components/AssessmentsManager";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<CompanyRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<AssessmentWizard />} />
          <Route path="/systems" element={<SystemsInventory />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;