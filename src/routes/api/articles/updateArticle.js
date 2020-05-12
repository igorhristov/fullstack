const { readJsonFile, saveJsonFile } = require('../../../utilities');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const getTags = await readJsonFile('tags.json');

  const { articleId } = req.params;
  const article = articles.find(({ id }) => id === articleId);

  if (!article) {
    return res
      .status(404)
      .json({ msg: 'The article with given ID was not found!' });
  }

  const { title, summary, body, tags } = req.body;

  const updateArticle = {
    id: article.id,
    authorId: article.authorId,
    title: title || article.title,
    date: new Date(),
    summary: summary || article.summary,
    body: body || article.body,
    tags: tags || article.tags
  };

  if (!updateArticle.authorId) {
    return res.status(400).json({ msg: 'Author ID is required' });
  }

  if (!updateArticle.title || updateArticle.title.length < 3) {
    return res
      .status(400)
      .json({ msg: 'Title is required and should be minimum 3 caracters' });
  }

  if (!updateArticle.summary || updateArticle.summary.length < 20) {
    return res
      .status(400)
      .json({ msg: 'summary is required and should be minimum 20 caracters' });
  }

  if (!updateArticle.body || updateArticle.body.length < 50) {
    return res
      .status(400)
      .json({ msg: 'body is required and should be minimum 50 caracters' });
  }

  if (!updateArticle.tags || updateArticle.tags.length < 1) {
    return res
      .status(400)
      .json({ msg: 'tag is required and should at least 1 tag' });
  }

  const newArticles = articles.map(article =>
    article.id === articleId ? updateArticle : article
  );

  await saveJsonFile('articles.json', newArticles);
  await saveJsonFile('tags.json', getTags);

  res.json({ msg: 'article UPDATED:', updateArticle });
};
