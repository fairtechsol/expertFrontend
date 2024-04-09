import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/expert",
  build: {
    // Enable dynamic imports
    rollupOptions: {
      output: {
        manualChunks: undefined,
        chunkFileNames: "[name].js",
      },
    },
  },
});
