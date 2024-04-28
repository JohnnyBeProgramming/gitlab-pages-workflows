import Alpine from "jslibs/alpinejs/v3/alpinejs/dist/module.esm.js";

import { config } from "./config";
import { workflows } from "./workflows";
import { FormGenerator } from "./forms";

document.addEventListener("alpine:init", () => {
  // Add a store for managing workflow state
  Alpine.store("config", config);
  Alpine.store("workflows", workflows);

  // Register a hook for form generators
  Alpine.data("useWorkflow", (...opts) => new FormGenerator(...opts));
});

Alpine.start();
