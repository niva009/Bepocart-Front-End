import React from "react";
import ReactDOM from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-range-slider-input/dist/style.css';
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import Maintenance from './components/Maintance';
import "./index.css";

if (import.meta.env.MODE === "production") {
  registerSW();
}

// Get maintenance mode from environment variable
const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isMaintenanceMode ? <Maintenance /> : <App />}
  </React.StrictMode>
);

// Initialize AOS only if not in maintenance mode
if (!isMaintenanceMode) {
  AOS.init();
}
