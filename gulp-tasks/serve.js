"use strict";

import { paths, serverConfig } from "../globalConfig";
import gulp from "gulp";
import browsersync from "browser-sync";
gulp.task("reload", (done) => {
  browsersync.reload();
  done();
});
gulp.task("serve", () => {
  browsersync.init({
    port: serverConfig.port,
    notify: serverConfig.notify,
    logPrefix: serverConfig.logPrefix,
    logLevel: serverConfig.logLevel,
    https: serverConfig.https,
    server: serverConfig.path
  });

  gulp.watch(paths.views.watch, gulp.series(["views", "reload"]));
  gulp.watch(paths.pug.blocks, gulp.series(["views:blocks", "reload"]));
  gulp.watch(paths.styles.watch, gulp.series(["styles", "reload"]));
  gulp.watch(paths.styles.blocks, gulp.series(["importBlocks", "reload"]));
  gulp.watch(paths.scripts.watch, gulp.series(["scripts", "reload"]));
  gulp.watch(paths.scripts.blocks, gulp.series(["importJs", "reload"]));
  gulp.watch(paths.serviceWorker.watch, gulp.series(["serviceWorker", "reload"]));
  gulp.watch(paths.sprites.watch, gulp.series(["sprites", "reload"]));
  gulp.watch(paths.images.watch, gulp.series(["images", "reload"]));
  gulp.watch(paths.webp.watch, gulp.series(["webp", "reload"]));
  gulp.watch(paths.fonts.watch, gulp.series(["fonts", "reload"]));
});
