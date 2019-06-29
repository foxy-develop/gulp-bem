"use strict";

import { pagespeed } from "../globalConfig";
import gulp from "gulp";
import gulpif from "gulp-if";
import psi from "psi";

gulp.task("pagespeed:mobile", () => 
  gulpif(pagespeed.mobile, psi(pagespeed.site, {
    nokey: "true",
    strategy: "mobile"
  }).then(data => {
    console.log("Очки быстродействия: " + data.ruleGroups.SPEED.score);
    console.log("Удобство использования: " + data.ruleGroups.USABILITY.score);
  })
));

gulp.task("pagespeed:desktop", () => 
  gulpif(pagespeed.desktop, psi(pagespeed.site, {
    nokey: "true",
    strategy: "desktop"
  }).then(data => 
    console.log("Очки быстродействия: " + data.ruleGroups.SPEED.score))
));

gulp.task('pagespeed', ()=> gulp.series("pagespeed:mobile", "pagespeed:desktop"))