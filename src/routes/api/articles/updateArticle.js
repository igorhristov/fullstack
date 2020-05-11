const { readJsonFile, saveJsonFile } = require('../../../utilities');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');

  const { articleId } = req.params;
  const article = articles.find(({ id }) => id === articleId);

  if (!article) {
    return res.status(404).send('The article with given ID was not found!');
  }

  const { authorId, title, summary, body, tags } = req.body;

  if (!authorId) {
    return res.status(400).send('Author ID is required');
  }

  if (!title || title.length < 3) {
    return res
      .status(400)
      .send('Title is required and should be minimum 3 caracters');
  }

  if (!summary || summary.length < 20) {
    return res
      .status(400)
      .send('summary is required and should be minimum 20 caracters');
  }

  if (!body || body.length < 50) {
    return res
      .status(400)
      .send('body is required and should be minimum 50 caracters');
  }

  if (!tags || tags.length < 1) {
    return res.status(400).send('tag is required and should at least 1 tag');
  }

  const updateArticle = {
    id: articleId,
    authorId,
    title,
    date: new Date(),
    summary,
    body,
    tags
  };

  const newArticles = articles.map(article =>
    article.id === articleId ? updateArticle : article
  );

  await saveJsonFile('articles.json', newArticles);

  res.json({ msg: 'article UPDATED: ', updateArticle });
};
