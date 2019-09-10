/* eslint-disable */
"use strict";

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require("fs");

const dir = "./src/blocks/";
const mkdirp = require("mkdirp");

const blockName = process.argv[2];
const defaultExtensions = ["scss", "pug"]; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (blockName) {
  const dirPath = `${dir}${blockName}/`; // полный путь к создаваемой папке блока
  mkdirp(dirPath, err => {
    if (err) {
      console.error(`Отмена операции: ${err}`);
    }
    // Нет ошибки, поехали!
    else {
      console.log(`Создание папки: ${dirPath} (если отсутствует)`);

      // Обходим массив расширений и создаем файлы, если они еще не созданы
      extensions.forEach(extension => {
        const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
        let fileContent = ""; // будущий контент файла
        let fileCreateMsg = ""; // будущее сообщение в консоли при создании файла

        if (extension === "scss") {
          fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий.. \n\n.${blockName} {\n\n  $this:                &; // #{$block-name}__element\n}\n`;
          // fileCreateMsg = '';
        } else if (extension === "js") {
          fileContent = `// const ready = require('../../js/utils/documentReady.js');\n\n// ready(function(){\n//   \n// });\n`;
        } else if (extension === "md") {
          fileContent = "";
        } else if (extension === "pug") {
          fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(text, mods)\n\n  //- Принимает:\n  //-   text    {string} - текст\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}('Текст', 'some-mod')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + ' ${blockName}--' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)&attributes(attributes)\n    .${blockName}__inner\n      block\n`;
        } else if (extension === "img") {
          const imgFolder = `${dirPath}img/`;
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, err => {
              if (err) console.error(err);
              else console.log(`Создание папки: ${imgFolder} (если отсутствует)`);
            });
          } else {
            console.log(`Папка ${imgFolder} НЕ создана (уже существует) `);
          }
        } else if (extension === "bg-img") {
          const imgFolder = `${dirPath}bg-img/`;
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, err => {
              if (err) console.error(err);
              else console.log(`Создание папки: ${imgFolder} (если отсутствует)`);
            });
          } else {
            console.log(`Папка ${imgFolder} НЕ создана (уже существует) `);
          }
        }

        if (fileExist(filePath) === false && extension !== "img" && extension !== "bg-img" && extension !== "md") {
          fs.writeFile(filePath, fileContent, err => {
            if (err) {
              return console.log(`Файл НЕ создан: ${err}`);
            }
            console.log(`Файл создан: ${filePath}`);
            if (fileCreateMsg) {
              console.warn(fileCreateMsg);
            }
          });
        } else if (extension !== "img" && extension !== "bg-img" && extension !== "md") {
          console.log(`Файл НЕ создан: ${filePath} (уже существует)`);
        } else if (extension === "md") {
          fs.writeFile(`${dirPath}readme.md`, fileContent, err => {
            if (err) {
              return console.log(`Файл НЕ создан: ${err}`);
            }
            console.log(`Файл создан: ${dirPath}readme.md`);
            if (fileCreateMsg) {
              console.warn(fileCreateMsg);
            }
          });
        }
      });
    }
  });
} else {
  console.log("Отмена операции: не указан блок");
}

function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

function fileExist(path) {
  const fs = require("fs");
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === "ENOENT");
  }
}
