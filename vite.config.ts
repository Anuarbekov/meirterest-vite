import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@pagination",
        replacement: fileURLToPath(
          new URL("./src/components/Pagination", import.meta.url)
        ),
      },
      {
        find: "@header",
        replacement: fileURLToPath(
          new URL("./src/components/Header", import.meta.url)
        ),
      },
    ],
  },
  plugins: [react()],
});
