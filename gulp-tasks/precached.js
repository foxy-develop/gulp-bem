"use strict";

import { paths } from "../globalConfig";
import gulp from "gulp";
const workbox = require("workbox-build");

gulp.task("generateManifest", () => {
  return workbox
    .injectManifest({
      swSrc: paths.serviceWorker.src,
      swDest: paths.serviceWorker.dist,
      globDirectory: paths.serviceWorker.glob,
      globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,webp,svg,ico}"]
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
});
