"use strict";

import { paths, serverConfig } from "../globalConfig";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
    browsersync.init({
        server: serverConfig.path,
        port: serverConfig.port,
        notify: serverConfig.notify,
        logPrefix: serverConfig.logPrefix,
        logLevel: serverConfig.logLevel,
        https: serverConfig.https
    });

    gulp.watch(paths.views.watch, gulp.parallel("views"));
    gulp.watch(paths.styles.watch, gulp.parallel("styles"));
    gulp.watch(paths.scripts.watch, gulp.parallel("scripts"));
    gulp.watch(paths.serviceWorker.watch, gulp.parallel("serviceWorker"));
    gulp.watch(paths.sprites.watch, gulp.parallel("sprites"));
    gulp.watch(paths.images.watch, gulp.parallel("images"));
    gulp.watch(paths.webp.watch, gulp.parallel("webp"));
    gulp.watch(paths.fonts.watch, gulp.parallel("fonts"));
});