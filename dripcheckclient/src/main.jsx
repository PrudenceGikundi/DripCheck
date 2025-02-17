import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
// In main.jsx
import { OutfitProvider } from "./context/OutfitContext";  

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OutfitProvider> {/* Wrap App with OutfitProvider */}
      <App />
    </OutfitProvider>
  </StrictMode>
);
