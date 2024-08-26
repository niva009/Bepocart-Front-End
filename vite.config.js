import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";

// Add PWA configuration
const pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg}"], // Include your asset types
    navigateFallback: "/", // The fallback for client-side routing
    navigateFallbackAllowlist: [/^(?!\/__).*/], // Allowlist for navigateFallback
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg)$/, // Define the regex pattern for your assets
        handler: "StaleWhileRevalidate", // Caching strategy
      },
    ],
  },
  manifest: {
    name: "Bepocart",
    short_name: "Bepocart",
    description: "bepocart",
    start_url: "/",
    display: "standalone",
    background_color: "#FFBB38",
    theme_color: "#FFBB38",
    icons: [
      {
        src: "/192.png",
        sizes: "192x192",
        purpose: "any maskable",
      },
      {
        src: "/512.png",
        sizes: "512x512",
        purpose: "maskable any",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Specify the base path
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bepocart.in', // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove '/api' prefix
      },
    },
  },
});
