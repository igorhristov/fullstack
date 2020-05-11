const fs = require('fs').promises;
const path = require('path');
const JSON_PATH = path.resolve(__dirname, './data');

const saveJsonFile = async (jsonFilename, data) =>
  fs.writeFile(`${JSON_PATH}/${jsonFilename}`, JSON.stringify(data, null, 2));

const readJsonFile = async jsonFilename =>
  fs
    .readFile(`${JSON_PATH}/${jsonFilename}`)
    .then(res => JSON.parse(res.toString()));

module.exports = { saveJsonFile, readJsonFile };
