"use strict";

/***************************************************
1. НАСТРОЙКА СЕРВЕРА
****************************************************/

  const serverConfig = {
    port: 3500,
    path: './dist/',
    logPrefix: 'GB',
    https: false,
    logLevel: 'info', //Can be either "info", "debug", "warn", or "silent"
    notify: true
  }

/***************************************************
2. ФАЙЛОВАЯ СТРУКТУРА
****************************************************/

  
  const paths = {
    views: {
      src: ["./src/views/index.html", "./src/views/pages/*.html"],
      dist: "./dist/",
      watch: ["./src/blocks/**/*.html", "./src/views/**/*.html"]
    },
    styles: {
      src: "./src/styles/main.scss",
      dist: "./dist/styles/",
      watch: ["./src/blocks/**/*.scss", "./src/styles/**/*.scss"]
    },
    scripts: {
      src: "./src/js/index.js",
      dist: "./dist/js/",
      watch: ["./src/blocks/**/*.js", "./src/js/**/*.js"]
    },
    serviceWorker: {
      src: "src/serviceWorker/sw.js",
      dist: "dist/sw.js",
      watch: "src/serviceWorker/sw.js",
      glob: 'dist'
    },
    images: {
      src: [
        "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
        "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
      ],
      dist: "./dist/img/",
      watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"
    },
    webp: {
      src: [
        "./src/img/**/*.{jpg,jpeg,png,tiff}",
        "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
      ],
      dist: "./dist/img/",
      watch: [
        "./src/img/**/*.{jpg,jpeg,png,tiff}",
        "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
      ]
    },
    sprites: {
      src: "./src/img/svg/*.svg",
      dist: "./dist/img/sprites/",
      watch: "./src/img/svg/*.svg"
    },
    fonts: {
      src: "./src/fonts/**/*.{woff,woff2}",
      dist: "./dist/fonts/",
      watch: "./src/fonts/**/*.{woff,woff2}"
    },
    favicons: {
      src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
      dist: "./dist/img/favicons/"
    },
    gzip: {
      src: "./src/.htaccess",
      dist: "./dist/"
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
    lang: 'RU-ru',
    display: 'standalone',
    orientation: 'portrait',
  };

/***************************************************
4. НАСТРОЙКА СЕТКИ
****************************************************/

  const grid = {
    breakpoints: {
      xs: '20rem',
      sm: '36rem',
      md: '48rem',
      lg: '62rem',
      xl: '75rem'
    },
    columns: 12, // количество колонок
    offset: '2rem', // размер gutter
    fields: '1rem', // отступы по бокам контейнера
    direction: true // true - mobile-first, false - pc-first
  }

/***************************************************
5. НАСТРОЙКА СЖАТИЯ ИЗОБРАЖЕНИЙ
****************************************************/

  const imageQuality = {
      jpeg: 90,
      png: [0.6, 0.8],
      webp: 100
  };

/***************************************************
6. НАСТРОЙКА ВЕНДОРНЫХ ПРЕФИКСОВ
****************************************************/

  const autoprefixerBrowsers = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

/***************************************************
7. ТЕСТ GOOGLE PAGESPEED
****************************************************/

  const pagespeed = {
    site: `http://192.168.43.189:3500`,
    mobile: true,
    desctop: true
  };

/***************************************************
Экспорт обьектов
****************************************************/

export { serverConfig };
export { paths };
export { manifest };
export { grid };
export { imageQuality };
export { autoprefixerBrowsers };
export { pagespeed };