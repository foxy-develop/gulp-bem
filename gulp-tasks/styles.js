"use strict";

import { paths, autoprefixerBrowsers } from "../globalConfig";
import { importBlocks } from "./importBlocks";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import sass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import postcss from "gulp-postcss";
import fonts from "postcss-font-magician";

const argv = yargs.argv,
  production = !!argv.production;

gulp.task("importBlocks", ()=> importBlocks("scss"));
gulp.task("styles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass({ includePaths: [__dirname + "/", "node_modules"] }))
    .pipe(groupmedia())
    .pipe(
      postcss([
        fonts({
          display: "swap",
          formats: "woff2 woff"
        })
      ])
    )
    .pipe(gulpif(production, autoprefixer({ browsers: autoprefixerBrowsers })))
    .pipe(
      gulpif(
        production,
        mincss({
          compatibility: "ie8",
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false
            }
          }
        })
      )
    )
    .pipe(
      gulpif(
        production,
        rename({
          suffix: ".min"
        })
      )
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!production, sourcemaps.write("./maps/")))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: "CSS files"
      })
    )
    .pipe(browsersync.reload({ stream: true }));
});
