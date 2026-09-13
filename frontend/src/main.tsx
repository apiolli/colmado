import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Colmado } from "./Colmado.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Colmado />
  </StrictMode>,
);
