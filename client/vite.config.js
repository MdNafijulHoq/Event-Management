import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/eventmanagement/api": {
        target: "https://event-management-server-gamma.vercel.app/",
      },
    },
  },
});
