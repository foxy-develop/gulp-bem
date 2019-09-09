"use strict";

/***************************************************
1. НАСТРОЙКА СЕРВЕРА
****************************************************/

const serverConfig = {
  port: 3500,
  path: "./dist/",
  logPrefix: "GB",
  https: false,
  logLevel: "info", //Can be either "info", "debug", "warn", or "silent"
  notify: true
};

/***************************************************
2. ФАЙЛОВАФЯ СТРУКТУРА
****************************************************/

const paths = {
  views: {
    src: ["./src/pages/**/*.pug"],
    dist: "./dist/",
    watch: ["./src/blocks/**/*.pug", "./src/pug/**/*.pug", "./src/pages/**/*.pug"],
    html: ["./dist/**/*.html"]
  },
  styles: {
    src: "./src/scss/main.scss",
    dist: "./dist/css/",
    watch: ["./src/blocks/**/*.scss", "./src/scss/**/*.scss"],
    dir: "./src/scss/"
  },
  scripts: {
    src: "./src/js/main.js",
    dist: "./dist/js/",
    watch: ["./src/blocks/**/*.js", "./src/js/**/*.js"]
  },
  serviceWorker: {
    src: "src/js/serviceWorker/serviceWorker.js",
    dist: "dist/serviceWorker.js",
    watch: "src/js/serviceWorker/serviceWorker.js",
    glob: "dist"
  },
  images: {
    src: ["./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}", "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"],
    dist: "./dist/img/",
    watch: ["./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"]
  },
  webp: {
    src: ["./src/img/**/*.{jpg,jpeg,png,tiff}", "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"],
    dist: "./dist/img/",
    watch: ["./src/img/**/*.{jpg,jpeg,png,tiff}", "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"]
  },
  sprites: {
    src: ["./src/img/svg/*.svg"],
    dist: "./dist/img/sprites/",
    watch: ["./src/img/svg/*.svg"]
  },
  fonts: {
    src: ["./src/fonts/**/*.{woff,woff2}"],
    dist: "./dist/fonts/",
    watch: ["./src/fonts/**/*.{woff,woff2}"]
  },
  favicons: {
    src: ["./src/img/favicon/*.{jpg,jpeg,png,gif}"],
    dist: "./dist/img/favicons/"
  },
  gzip: {
    src: "./src/.htaccess",
    dist: "./dist/"
  },
  bem: {
    src: "./src/blocks/",
    blocks: "../blocks/",
    main: "./src/"
  }
};

/***************************************************
3. НАСТРОЙКА PWA (manifest.json)
****************************************************/

const manifest = {
  name: "GULP-BEM",
  shortname: "GB",
  description: "Automotive tasks system for BEM",
  url: "/",
  bg: "#000",
  lang: "RU-ru",
  display: "standalone",
  orientation: "portrait"
};

/***************************************************
4. НАСТРОЙКА СЖАТИЯ ИЗОБРАЖЕНИЙ
****************************************************/

const imageQuality = {
  jpeg: 90,
  png: [0.6, 0.8],
  webp: 100
};

/***************************************************
5. НАСТРОЙКА ВЕНДОРНЫХ ПРЕФИКСОВ
****************************************************/

const autoprefixerBrowsers = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

/***************************************************
6. PUG config
****************************************************/

let pugOption = {
  data: { repoUrl: "https://github.com/foxy-develop/gulp-bem.git" }
};

/***************************************************
7. HTML beautify options
****************************************************/

let prettyOption = {
  indent_size: 2,
  indent_char: " ",
  unformatted: ["code", "em", "strong", "span", "i", "b", "br", "script"],
  content_unformatted: []
};

/***************************************************
8. WEBPACK options
****************************************************/

const webpackConfig = {
  entry: { main: paths.scripts.src },
  output: { filename: "[name].js" },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};

/***************************************************
Экспорт обьектов
****************************************************/

export { webpackConfig };
export { pugOption };
export { prettyOption };
export { serverConfig };
export { paths };
export { manifest };
export { imageQuality };
export { autoprefixerBrowsers };
