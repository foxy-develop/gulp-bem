"use strict";

import { paths, webpackConfig } from "../globalConfig";
import { importBlocks } from "./importBlocks";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
const path = require("path");
let argv = yargs.argv,
  production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";
webpackConfig.resolve = { alias: { "%modules%": path.resolve(__dirname, paths.bem.blocks)}};


gulp.task("scripts", () => {
  importBlocks("js");
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulpif(production, rename({ suffix: ".min"})))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(debug({title: "JS files"}))
    .on("end", browsersync.reload);
});
