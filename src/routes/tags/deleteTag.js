const { saveJsonFile, readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const tags = await readJsonFile('tags.json');
  const articles = await readJsonFile('articles.json');

  const { slug } = req.params;
  const updatedArticles = [];

  tags.hasOwnProperty(slug)
    ? delete tags[slug]
    : res.status(404).send({ msg: 'Invalid tag' });

  articles.forEach(article => {
    if (article.tags.includes(slug)) {
      const index = article.tags.indexOf(slug);
      article.tags.splice(index);
      updatedArticles.push(article);
    }
    updatedArticles.push(article);
  });

  await saveJsonFile('tags.json', tags);
  await saveJsonFile('articles.json', updatedArticles);
  res.json(updatedArticles);
};
