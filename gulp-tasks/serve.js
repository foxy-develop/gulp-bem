"use strict";

import { paths, serverConfig } from "../globalConfig";
import gulp from "gulp";
import browsersync from "browser-sync";
gulp.task("reload", () => browsersync.reload());
gulp.task("serve", () => {
  browsersync.init({
    port: serverConfig.port,
    notify: serverConfig.notify,
    logPrefix: serverConfig.logPrefix,
    logLevel: serverConfig.logLevel,
    https: serverConfig.https,
    server: serverConfig.path
  });

  gulp.watch(paths.views.watch, gulp.series("views"));
  gulp.watch(paths.styles.watch, gulp.series("styles"));
  gulp.watch(paths.scripts.watch, gulp.series("scripts"));
  gulp.watch(paths.serviceWorker.watch, gulp.series("serviceWorker"));
  gulp.watch(paths.sprites.watch, gulp.series("sprites"));
  gulp.watch(paths.images.watch, gulp.series("images"));
  gulp.watch(paths.webp.watch, gulp.series("webp"));
  gulp.watch(paths.fonts.watch, gulp.series("fonts"));
});
