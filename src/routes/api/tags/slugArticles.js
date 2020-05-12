const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const { slug } = req.params;
  const tags = await readJsonFile('tags.json');

  if (tags[slug] === undefined) {
    return res.status(404).json({ msg: 'Given slug was not found!' });
  }

  const articles = await readJsonFile('articles.json');
  const slugArticles = articles.filter(article => article.tags.includes(slug));

  res.json(slugArticles);
};
