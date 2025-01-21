// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/translate": {
        target: "https://libretranslate.de",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/translate/, ""),
      },
    },
  },
});
