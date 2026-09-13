import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Colmado } from "./Colmado.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toast.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Colmado />
    <Toaster />
  </StrictMode>,
);
