"use strict";

import gulp from "gulp";

const requireDir = require("require-dir");
requireDir("./gulp-tasks/");


export const development = gulp.series(
  gulp.parallel(["clean", "views"]),
  gulp.parallel(["images", "webp", "sprites", "fonts"]),
  gulp.parallel(["styles", "scripts"]),
  "serve"
);

export const prod = gulp.series("clean",
  gulp.series(["views", "styles",
    "scripts", "images", "webp", "sprites",
    "fonts", "favicons",  "serviceWorker",
    "generateManifest", "gzip"]
  ));

export default development;
