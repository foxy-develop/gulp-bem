"use strict";

import { paths } from "../globalConfig";
import gulp from "gulp";
import sw from "workbox-build";

  gulp.task('serviceWorker', () => {
    return sw.generateSW({
      swDest: paths.serviceWorker.dist,
      globDirectory: paths.serviceWorker.glob,
      globPatterns: [
        '**\/*.{js,css,html,png,jpg}',
      ]
    }).then(() => console.info('Service worker generation completed.')
    ).catch((error) => console.warn('Service worker generation failed:', error));
  });
