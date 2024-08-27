// vite.config.js
import { defineConfig } from "file:///C:/Users/prana/Desktop/Bepocart-Front-End/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/prana/Desktop/Bepocart-Front-End/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwind from "file:///C:/Users/prana/Desktop/Bepocart-Front-End/node_modules/tailwindcss/lib/index.js";
import { VitePWA } from "file:///C:/Users/prana/Desktop/Bepocart-Front-End/node_modules/vite-plugin-pwa/dist/index.js";
var pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg}"],
    // Include your asset types
    navigateFallback: "/",
    // The fallback for client-side routing
    navigateFallbackAllowlist: [/^(?!\/__).*/],
    // Allowlist for navigateFallback
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg)$/,
        // Define the regex pattern for your assets
        handler: "StaleWhileRevalidate"
        // Caching strategy
      }
    ]
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
        purpose: "any maskable"
      },
      {
        src: "/512.png",
        sizes: "512x512",
        purpose: "maskable any"
      }
    ]
  }
};
var vite_config_default = defineConfig({
  base: "/",
  // Specify the base path
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  server: {
    proxy: {
      "/api": {
        target: "https://bepocart.in",
        // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
        // Optional: remove '/api' prefix
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwcmFuYVxcXFxEZXNrdG9wXFxcXEJlcG9jYXJ0LUZyb250LUVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccHJhbmFcXFxcRGVza3RvcFxcXFxCZXBvY2FydC1Gcm9udC1FbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3ByYW5hL0Rlc2t0b3AvQmVwb2NhcnQtRnJvbnQtRW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5cclxuLy8gQWRkIFBXQSBjb25maWd1cmF0aW9uXHJcbmNvbnN0IHB3YUNvbmZpZyA9IHtcclxuICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG4gIGluY2x1ZGVBc3NldHM6IFtcImxvZ28tY29sb3Iuc3ZnXCJdLFxyXG4gIHdvcmtib3g6IHtcclxuICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwscG5nLGpwZyxnaWYsc3ZnfVwiXSwgLy8gSW5jbHVkZSB5b3VyIGFzc2V0IHR5cGVzXHJcbiAgICBuYXZpZ2F0ZUZhbGxiYWNrOiBcIi9cIiwgLy8gVGhlIGZhbGxiYWNrIGZvciBjbGllbnQtc2lkZSByb3V0aW5nXHJcbiAgICBuYXZpZ2F0ZUZhbGxiYWNrQWxsb3dsaXN0OiBbL14oPyFcXC9fXykuKi9dLCAvLyBBbGxvd2xpc3QgZm9yIG5hdmlnYXRlRmFsbGJhY2tcclxuICAgIHJ1bnRpbWVDYWNoaW5nOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB1cmxQYXR0ZXJuOiAvXFwuKHBuZ3xqcGd8Z2lmfHN2ZykkLywgLy8gRGVmaW5lIHRoZSByZWdleCBwYXR0ZXJuIGZvciB5b3VyIGFzc2V0c1xyXG4gICAgICAgIGhhbmRsZXI6IFwiU3RhbGVXaGlsZVJldmFsaWRhdGVcIiwgLy8gQ2FjaGluZyBzdHJhdGVneVxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIG1hbmlmZXN0OiB7XHJcbiAgICBuYW1lOiBcIkJlcG9jYXJ0XCIsXHJcbiAgICBzaG9ydF9uYW1lOiBcIkJlcG9jYXJ0XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJiZXBvY2FydFwiLFxyXG4gICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxyXG4gICAgYmFja2dyb3VuZF9jb2xvcjogXCIjRkZCQjM4XCIsXHJcbiAgICB0aGVtZV9jb2xvcjogXCIjRkZCQjM4XCIsXHJcbiAgICBpY29uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiBcIi8xOTIucG5nXCIsXHJcbiAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgIHB1cnBvc2U6IFwiYW55IG1hc2thYmxlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6IFwiLzUxMi5wbmdcIixcclxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZSBhbnlcIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogJy8nLCAgLy8gU3BlY2lmeSB0aGUgYmFzZSBwYXRoXHJcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0EocHdhQ29uZmlnKSwgdGFpbHdpbmQoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2JlcG9jYXJ0LmluJywgLy8gQmFja2VuZCBVUkxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSwgLy8gT3B0aW9uYWw6IHJlbW92ZSAnL2FwaScgcHJlZml4XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVULFNBQVMsb0JBQW9CO0FBQ3BWLE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFDckIsU0FBUyxlQUFlO0FBR3hCLElBQU0sWUFBWTtBQUFBLEVBQ2hCLGNBQWM7QUFBQSxFQUNkLGVBQWUsQ0FBQyxnQkFBZ0I7QUFBQSxFQUNoQyxTQUFTO0FBQUEsSUFDUCxjQUFjLENBQUMsb0NBQW9DO0FBQUE7QUFBQSxJQUNuRCxrQkFBa0I7QUFBQTtBQUFBLElBQ2xCLDJCQUEyQixDQUFDLGFBQWE7QUFBQTtBQUFBLElBQ3pDLGdCQUFnQjtBQUFBLE1BQ2Q7QUFBQSxRQUNFLFlBQVk7QUFBQTtBQUFBLFFBQ1osU0FBUztBQUFBO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFDVCxrQkFBa0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUE7QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQUEsRUFDakQsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUE7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
