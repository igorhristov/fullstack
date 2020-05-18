const { saveJsonFile, readJsonFile } = require('../../utilities');
module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const id = req.params.id;
  const article = articles.find(article => article.id === id);
  
  if (!article) {
    throw 'This article does not exist';
  }

  const { title, summary, body, tags } = req.body;

  const updatedArticle = {
    id: article.id,
    authorId: article.authorId,
    title: title || article.title,
    date: new Date(),
    summary: summary || article.summary,
    body: body || article.body,
    tags: tags || article.tags
  };

  const originalTags = await readJsonFile('tags.json');
  updatedArticle.tags.forEach(tag =>
    Object.keys(originalTags).includes(tag)
      ? originalTags
      : (originalTags[tag] = tag)
  );
  await saveJsonFile('tags.json', originalTags);

  if (!updatedArticle.authorId) {
    throw new Error('Author ID required');
  }

  if (!updatedArticle.title || updatedArticle.title.length < 3) {
    throw new Error('Insert Title');
  }

  if (!updatedArticle.summary || updatedArticle.summary.length < 20) {
    throw new Error('Insert summary');
  }

  if (!updatedArticle.body || updatedArticle.body.length < 50) {
    throw new Error('Insert body');
  }

  if (!updatedArticle.tags || updatedArticle.tags.length < 1) {
    throw new Error('Tag required');
  }

  const newArticles = articles.map(article =>
    article.id === id ? updatedArticle : article
  );

  await saveJsonFile('articles.json', newArticles);

  res.json({
    updatedArticle,
    message: 'Article is updated'
  });
};
