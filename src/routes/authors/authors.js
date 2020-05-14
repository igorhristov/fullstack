const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');

  res.json(authors);
};
