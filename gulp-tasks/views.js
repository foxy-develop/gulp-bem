"use strict";

import { paths, pugOption, prettyOption } from "../globalConfig";
import { pugMixins, getFromHtml } from "./importBlocks";
import gulp from "gulp";
import pug from "gulp-pug";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import prettyHtml from "gulp-pretty-html";
import through2 from "through2";
import yargs from "yargs";
import debug from "gulp-debug";

const pugFilter = (text, opt) => {
  const lines = text.split("\n");
  let res = "<pre class='code'>\n";
  if (typeof opt["first-line"] !== "undefined") {
    res += "<code>" + opt["first-line"] + "</code>\n";
  }
  for (let i = 0; i < lines.length - 1; i++) {
    res += "<code>" + lines[i].replace(/</gm, "&lt;") + "</code>\n";
  }
  res += "</pre>\n";
  return res.replace(/<code><\/code>/g, "<code>&nbsp;</code>");
};

const argv = yargs.argv,
  production = !!argv.production;

pugOption.filters = { "show-code": pugFilter };
pugMixins();
gulp.task("views", () => {
  return gulp
    .src(paths.views.src)
    .pipe(debug({ title: "Compiles " }))
    .pipe(pug(pugOption))
    .pipe(prettyHtml(prettyOption))
    .pipe(replace(/^(\s*)(<button.+?>)(.*)(<\/button>)/gm, "$1$2\n$1  $3\n$1$4"))
    .pipe(replace(/^( *)(<.+?>)(<script>)([\s\S]*)(<\/script>)/gm, "$1$2\n$1$3\n$4\n$1$5\n"))
    .pipe(replace(/^( *)(<.+?>)(<script\s+src.+>)(?:[\s\S]*)(<\/script>)/gm, "$1$2\n$1$3$4"))
    .pipe(gulpif(production, replace(".css", ".min.css")))
    .pipe(gulpif(production, replace("main.js", "main.min.js ")))
    .pipe(through2.obj(getFromHtml))
    .pipe(gulp.dest(paths.views.dist))
    .pipe(browsersync.stream());
});
gulp.task("views:blocks", () => {
  pugMixins();
});
