"use strict";

import { paths } from "../globalConfig";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("gzip", () => {
    return gulp.src(paths.gzip.src)
        .pipe(gulp.dest(paths.gzip.dist))
        .pipe(debug({
            "title": "GZIP config"
        }));
});