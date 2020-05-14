const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');

  res.json(articles);
};
