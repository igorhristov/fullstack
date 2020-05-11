const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');

  res.json(articles);
};
