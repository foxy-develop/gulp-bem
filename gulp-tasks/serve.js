/* eslint-disable no-console */
"use strict";

import { paths, serverConfig } from "../globalConfig";
import gulp from "gulp";
import browsersync from "browser-sync";
import fs from "fs";

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

  // Страницы: изменение, добавление
  gulp.watch(paths.views.src, { events: ["change", "add"], delay: 100 }, gulp.series(
    "views",
    gulp.parallel(["styles", "scripts"]),
    "reload"
  ));

  // Страницы: удаление
  gulp.watch(paths.views.src, { delay: 100 }).on("unlink", path => {
    let filePathInBuildDir = path.replace(paths.views.pages, paths.views.dist).replace(".pug", ".html");
    fs.unlink(filePathInBuildDir, (err) => {
      if (err) throw err;
      console.log(`---------- Delete:  ${filePathInBuildDir}`);
    });
  });

  // Разметка Блоков: изменение
  gulp.watch([paths.pug.blocks], { events: ["change"], delay: 100 }, gulp.series([
    "views", "reload"
  ]));


  // Разметка Блоков: добавление
  gulp.watch([paths.pug.blocks], { delay: 100 }, gulp.series(
    "views",
    "reload"
  ));

  // Разметка Блоков: удаление
  gulp.watch([paths.pug.blocks], { events: ["unlink"], delay: 100 }, gulp.series("views:blocks"));

  // Шаблоны pug: все события
  gulp.watch([paths.pug.all, `!${paths.pug.mixins}` ], { delay: 100 }, gulp.series(
    "views",
    gulp.parallel(["styles", "scripts"]),
    "reload"
  ));

  // Стили Блоков: изменение
  gulp.watch([paths.styles.blocks], { events: ["change"], delay: 100 }, gulp.series("styles"));

  // Стили Блоков: добавление
  gulp.watch([paths.styles.blocks], { events: ["add"], delay: 100 }, gulp.series("styles"));

  // Стилевые глобальные файлы: все события
  gulp.watch([paths.styles.watch, `!${paths.styles.dir}_blocks.scss`],
    { events: ["all"], delay: 100 }, gulp.series("styles"));

  //Скриптовые глобальные файлы: все события
  gulp.watch([paths.scripts.watch, `!${paths.scripts.entry}`, paths.scripts.blocks],
    { events: ["all"], delay: 100 }, gulp.series("scripts", "reload"));

  gulp.watch(paths.images.watch, gulp.series(["images", "reload"]));
  gulp.watch(paths.sprites.watch, gulp.series(["sprites", "reload"]));
  gulp.watch(paths.serviceWorker.watch, gulp.series(["serviceWorker", "reload"]));
  gulp.watch(paths.webp.watch, gulp.series(["webp", "reload"]));
  gulp.watch(paths.fonts.watch, gulp.series(["fonts", "reload"]));

});
