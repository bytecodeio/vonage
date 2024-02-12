import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.id = "app-container";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<App />);
});
