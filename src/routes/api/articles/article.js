const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');

  const { articleId } = req.params;
  const article = articles.find(({ id }) => id === articleId);

  !article
    ? res.status(404).json({ msg: 'The article with given ID was not found!' })
    : res.json(article);
};
