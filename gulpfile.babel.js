/* eslint-disable no-console */
"use strict";

import gulp from "gulp";

const requireDir = require("require-dir");
requireDir("./gulp-tasks/");


export const development = gulp.series(
  "clean",
  gulp.parallel(["views", "sprites", "fonts"]),
  gulp.parallel(["images", "webp"]),
  gulp.parallel(["styles", "scripts"]),
  gulp.parallel(["serviceWorker", "favicons", "gzip"]),
  "serve"
);

export const production = gulp.series("clean",
  gulp.series(
    "clean",
    gulp.parallel(["views", "sprites", "fonts"]),
    gulp.parallel(["images", "webp"]),
    gulp.parallel(["styles", "scripts"]),
    gulp.parallel(["serviceWorker", "favicons", "gzip"]),
    "serve"
  ));

export default development;
