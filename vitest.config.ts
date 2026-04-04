import { defineConfig } from "vite"; // Use vite for the main config
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // 1. ADD THIS LINE: Use your repository name here
  base: "/admittruth9-glitch/", 

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Keep your existing test config below
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
