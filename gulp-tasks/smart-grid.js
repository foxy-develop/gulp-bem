"use strict";

import gulp from "gulp";
import { grid } from '../globalConfig'
const smartgrid = require("smart-grid");

gulp.task("smart-grid", (cb) => {
    smartgrid("./src/styles/vendor/import/", {
        outputStyle: "scss",
        filename: "_smart-grid",
        columns: grid.columns, // number of grid columns
        offset: grid.offset, // gutter width
        mobileFirst: grid.direction,
        mixinNames: {
            container: "container"
        },
        container: {
            fields: grid.fields // side fields
        },
        breakPoints: {
            xs: {
                width: grid.breakpoints.xs
            },
            sm: {
                width: grid.breakpoints.sm
            },
            md: {
                width: grid.breakpoints.md
            },
            lg: {
                width: grid.breakpoints.lg
            },
            xl: {
                width: grid.breakpoints.xl
            }
        }
    });
    cb();
});