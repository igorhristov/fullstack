const { saveJsonFile, readJsonFile } = require('../../utilities');
module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const comments = await readJsonFile('comments.json');
  const id = req.params.id;
  const article = articles.find(article => article.id === id);
  if (!article) {
    throw 'This article does not exist';
  }

  await saveJsonFile(
    'articles.json',
    articles.filter(article => article.id !== id)
  );

  await saveJsonFile(
    'comments.json',
    comments.filter(comments => comments.articleId !== id)
  );

  res.json({
    article,
    message: 'Article is deleted'
  });
};
