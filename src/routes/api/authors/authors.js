const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');

  res.json(authors);
};
