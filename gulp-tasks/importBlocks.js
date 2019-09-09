"use strict";

import { paths } from "../globalConfig";
const fs = require("fs");
const getClassesFromHtml = require("get-classes-from-html");

let classesFromHTML = [];
let importsList = {scss: [], js: []};
//ADDITIONAL FUNCTIONSß
/**
   * Проверка существования файла или папки
   * @param  {string} path      Путь до файла или папки
   * @return {boolean}
   */
const fileExist = filepath => {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
};

/**
   * Get names of all directories in a source, that contains file with
   * current type and have the same name as a directory.
   * @param  {string} type    type of files
   * @return {array}          array with names
   */
const getDirectories = type =>
  fs
    .readdirSync(paths.bem.src)
    .filter(item => fs.lstatSync(`${paths.bem.src}${item}`).isDirectory())
    .filter(item => fileExist(`${paths.bem.src}${item}/${item}.${type}`));

/**
   * Get differnces between arrays
   * @param  {array} a1 first array
   * @param  {array} a2 second array
   * @return {array}    difference
   */
const getDifference = (a1, a2) => [...a1.filter(i => !a2.includes(i)), a2.filter(i => !a1.includes(i))];

/**
   * Get all classes from  HTML.
   * @param  {object}   file current file
   * @param  {string}   enc  encode
   * @param  {Function} cb   callback
   */
function getFromHtml(file, enc, cb) {
  // Check file
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  const content = file.contents.toString();
  let classes = getClassesFromHtml(content);

  // Consider all the classes
  // If it's a block that isn't already present - push it to array.
  for (let el of classes) {
    if (/(__|--)/.test(el) || classesFromHTML.includes(el)) continue;
    classesFromHTML.push(el);
  }

  console.log("---------- Used HTML blocks: " + classesFromHTML.join(", "));
  file.contents = new Buffer.from(content);
  this.push(file);
  cb();
  return classesFromHTML;
}

function importBlocks(type) {
  let list = [];
  const allBlocks = getDirectories(type);
  allBlocks.forEach(block => {
    let url = `${paths.bem.blocks}${block}/${block}`;
    if (classesFromHTML.includes(block) && !list.includes(url)) list.push(url);
  });
  if (getDifference(list, importsList[type]).length) {
    let require = "/* blocks that used */\n\n";
    list.forEach(el => {
      require += type == "js" ? `require("${el}");\n` : `@import '${el}';\n`;
    });
    fs.writeFileSync(`${paths.bem.main}${type}/_blocks.${type}`, require);
    importsList[type] = list;
  }
}
exports.importBlocks = importBlocks;


function pugMixins() {
  let mixins = "";
  getDirectories("pug").forEach(block => {
    mixins += `include ${paths.bem.blocks.replace(paths.bem.main, "../")}${block}/${block}.pug\n`;
  });
  fs.writeFileSync(`${paths.bem.main}pug/mixins.pug`, mixins);
}
exports.pugMixins = pugMixins;

export { importsList };
export { getFromHtml };
export { pugMixins };
export { importBlocks };
