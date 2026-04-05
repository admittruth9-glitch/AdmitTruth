import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const githubRepository = process.env.GITHUB_REPOSITORY;
const repositoryName = githubRepository?.split("/")[1] ?? "AdmitTruth";
const productionBase = `/${repositoryName}/`;

// https://vitejs.dev
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? productionBase : "/",
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
