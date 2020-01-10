"use strict";

import { paths } from "../globalConfig";
import gulp from "gulp";
const workbox = require("workbox-build");


gulp.task("serviceWorker", () => {
  return workbox.injectManifest({
    globDirectory: paths.serviceWorker.glob,
    globPatterns: ["**/**/*.{html,js,css}"],
    swDest: paths.serviceWorker.dist,
    swSrc: paths.serviceWorker.src,
  }).then(({warnings}) => {
    // In case there are any warnings from workbox-build, log them.
    for (const warning of warnings) {
      console.warn(warning);
    }
    console.info("Service worker generation completed.");
  }).catch((error) => {
    console.warn("Service worker generation failed:", error);
  });
});
