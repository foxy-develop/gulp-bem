"use strict";

import { paths, manifest } from "../globalConfig";
import gulp from "gulp";
import favicons from "gulp-favicons";
import debug from "gulp-debug";

gulp.task("favicons", () => {
    return gulp.src(paths.favicons.src)
        .pipe(favicons({
            appName: manifest.name,
            appShortName: manifest.shortname,
            appDescription: manifest.description,
            background: manifest.bg,
            url: manifest.url,
            lang: manifest.lang,
            display: manifest.display,
            orientation: manifest.orientation,
            path: '../favicons/',
            scope: '/',
            start_url: '/',
            icons: {
                appleIcon: true,
                favicons: true,
                online: true,
                appleStartup: false,
                android: true,
                firefox: true,
                yandex: false,
                windows: true,
                coast: false
            }
        }))
        .pipe(gulp.dest(paths.favicons.dist))
        .pipe(debug({
            "title": "Favicons"
        }));
});