import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Оставь только этот, если в App.css старый мусор
import DashboardLayout from "./components/DashboardLayout";
import SmartIrrigationDashboard from "./components/SmartIrrigationDashboard";
import WaterUsageAnalysis from "./pages/WaterUsageAnalysis";
import FarmProfileSettings from "./pages/FarmProfileSettings";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SmartIrrigationDashboard />} />
          <Route path="/water-usage" element={<WaterUsageAnalysis />} />
          <Route path="/settings" element={<FarmProfileSettings />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
