const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
