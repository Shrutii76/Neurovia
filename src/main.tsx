import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n"; // 👈 import your i18n config
import './index.css'

// createRoot(document.getElementById("root")!).render(<App />);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);