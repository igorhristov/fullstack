const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const articleId = req.params.id;
  const article = articles.find(article => article.id === articleId);

  article !== undefined
    ? res.json(article)
    : res.status(404).send('404:Not found!');
};
