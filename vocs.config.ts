import { defineConfig } from "vocs";
import { DEFAULT_PORT } from "./src/common/constants";

export default defineConfig({
  // baseUrl: "https://charlzyx.github.io/bunpkg/",
  // vite: {
  //   base: "/bunpkg",
  // },
  vite: {
    server: {
      proxy: {
        "/meta": `http://localhost:${DEFAULT_PORT}`,
        "/npm": `http://localhost:${DEFAULT_PORT}`,
        "/esm": `http://localhost:${DEFAULT_PORT}`,
      },
    },
  },
  title: "BUNPKG",
  logoUrl: "https://r2.charlzyx.xyz/bunpkg.svg",
  socials: [
    {
      icon: "github",
      link: "https://github.com/charlzyx/bunpkg",
    },
  ],
});
