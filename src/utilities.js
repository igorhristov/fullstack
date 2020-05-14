const fs = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');
const JSON_PATH = path.resolve(__dirname, './data');

const saveJsonFile = async (jsonFilename, data) =>
  fs.writeFile(`${JSON_PATH}/${jsonFilename}`, JSON.stringify(data, null, 2));

const readJsonFile = async jsonFilename =>
  fs
    .readFile(`${JSON_PATH}/${jsonFilename}`)
    .then(res => JSON.parse(res.toString()));

const seedData = async () => {
  const seedJSONPath = path.resolve(__dirname, '../data');
  const origJSONPath = path.resolve(__dirname, './data');

  if (existsSync(seedJSONPath + '/articles.json')) {
    console.log('The path exists.');
  } else {
    await fs.copyFile(
      origJSONPath + '/articles.json',
      seedJSONPath + '/articles.json'
    );
    await fs.copyFile(
      origJSONPath + '/authors.json',
      seedJSONPath + '/authors.json'
    );
    await fs.copyFile(
      origJSONPath + '/comments.json',
      seedJSONPath + '/comments.json'
    );
    await fs.copyFile(origJSONPath + '/tags.json', seedJSONPath + '/tags.json');

    console.log('the path doesnt exist');
  }

  console.log(seedJSONPath);
};

module.exports = { saveJsonFile, readJsonFile, seedData };
