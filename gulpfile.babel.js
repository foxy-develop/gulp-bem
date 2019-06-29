"use strict";

import gulp from "gulp";

const requireDir = require("require-dir")

requireDir("./gulp-tasks/");

export const development = gulp.series("clean", "smart-grid",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons"]), "serviceWorker", "generateManifest",
    "serve", "pagespeed");

export const prod = gulp.series("clean",
    gulp.series(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons",  "serviceWorker", "generateManifest", "gzip", "pagespeed"]));

export default development;