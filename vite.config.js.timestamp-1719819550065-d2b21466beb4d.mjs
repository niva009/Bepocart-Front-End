// vite.config.js
import { defineConfig } from "file:///C:/Bepositive/shopo_dashboard_website_v5.8.0/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Bepositive/shopo_dashboard_website_v5.8.0/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwind from "file:///C:/Bepositive/shopo_dashboard_website_v5.8.0/client/node_modules/tailwindcss/lib/index.js";
import { VitePWA } from "file:///C:/Bepositive/shopo_dashboard_website_v5.8.0/client/node_modules/vite-plugin-pwa/dist/index.js";
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
    name: "Shopo",
    short_name: "Shopo",
    description: "Shopo",
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
  basename: "/",
  plugins: [react(), VitePWA(pwaConfig), tailwind()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxCZXBvc2l0aXZlXFxcXHNob3BvX2Rhc2hib2FyZF93ZWJzaXRlX3Y1LjguMFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXEJlcG9zaXRpdmVcXFxcc2hvcG9fZGFzaGJvYXJkX3dlYnNpdGVfdjUuOC4wXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQmVwb3NpdGl2ZS9zaG9wb19kYXNoYm9hcmRfd2Vic2l0ZV92NS44LjAvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgdGFpbHdpbmQgZnJvbSBcInRhaWx3aW5kY3NzXCI7XG5cbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbi8vIEFkZCBQV0EgY29uZmlndXJhdGlvblxuY29uc3QgcHdhQ29uZmlnID0ge1xuICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICBpbmNsdWRlQXNzZXRzOiBbXCJsb2dvLWNvbG9yLnN2Z1wiXSxcbiAgd29ya2JveDoge1xuICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwscG5nLGpwZyxnaWYsc3ZnfVwiXSwgLy8gSW5jbHVkZSB5b3VyIGFzc2V0IHR5cGVzXG4gICAgbmF2aWdhdGVGYWxsYmFjazogXCIvXCIsIC8vIFRoZSBmYWxsYmFjayBmb3IgY2xpZW50LXNpZGUgcm91dGluZ1xuICAgIG5hdmlnYXRlRmFsbGJhY2tBbGxvd2xpc3Q6IFsvXig/IVxcL19fKS4qL10sIC8vIEFsbG93bGlzdCBmb3IgbmF2aWdhdGVGYWxsYmFja1xuICAgIHJ1bnRpbWVDYWNoaW5nOiBbXG4gICAgICB7XG4gICAgICAgIHVybFBhdHRlcm46IC9cXC4ocG5nfGpwZ3xnaWZ8c3ZnKSQvLCAvLyBEZWZpbmUgdGhlIHJlZ2V4IHBhdHRlcm4gZm9yIHlvdXIgYXNzZXRzXG4gICAgICAgIGhhbmRsZXI6IFwiU3RhbGVXaGlsZVJldmFsaWRhdGVcIiwgLy8gQ2FjaGluZyBzdHJhdGVneVxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBtYW5pZmVzdDoge1xuICAgIG5hbWU6IFwiU2hvcG9cIixcbiAgICBzaG9ydF9uYW1lOiBcIlNob3BvXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2hvcG9cIixcbiAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgIGJhY2tncm91bmRfY29sb3I6IFwiI0ZGQkIzOFwiLFxuICAgIHRoZW1lX2NvbG9yOiBcIiNGRkJCMzhcIixcbiAgICBpY29uczogW1xuICAgICAge1xuICAgICAgICBzcmM6IFwiLzE5Mi5wbmdcIixcbiAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi81MTIucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZSBhbnlcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn07XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlbmFtZTogXCIvXCIsXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBWaXRlUFdBKHB3YUNvbmZpZyksIHRhaWx3aW5kKCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1WLFNBQVMsb0JBQW9CO0FBQ2hYLE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFFckIsU0FBUyxlQUFlO0FBR3hCLElBQU0sWUFBWTtBQUFBLEVBQ2hCLGNBQWM7QUFBQSxFQUNkLGVBQWUsQ0FBQyxnQkFBZ0I7QUFBQSxFQUNoQyxTQUFTO0FBQUEsSUFDUCxjQUFjLENBQUMsb0NBQW9DO0FBQUE7QUFBQSxJQUNuRCxrQkFBa0I7QUFBQTtBQUFBLElBQ2xCLDJCQUEyQixDQUFDLGFBQWE7QUFBQTtBQUFBLElBQ3pDLGdCQUFnQjtBQUFBLE1BQ2Q7QUFBQSxRQUNFLFlBQVk7QUFBQTtBQUFBLFFBQ1osU0FBUztBQUFBO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFDVCxrQkFBa0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixVQUFVO0FBQUEsRUFDVixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUNuRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
