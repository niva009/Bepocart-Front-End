import React from "react";
import ReactDOM from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-range-slider-input/dist/style.css';
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import Maintenance from './components/Maintance';
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

if (import.meta.env.MODE === "production") {
  registerSW();
}

// Get maintenance mode from environment variable
const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="539938510228-jfhbm9d7l9qu8vcsrhdvgrobdq5nagvk.apps.googleusercontent.com">
  <React.StrictMode>
    {isMaintenanceMode ? <Maintenance /> : <App />}
  </React.StrictMode>
  </GoogleOAuthProvider>
);

// Initialize AOS only if not in maintenance mode
if (!isMaintenanceMode) {
  AOS.init();
}
