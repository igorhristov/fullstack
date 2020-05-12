const { readJsonFile, saveJsonFile } = require('../../../utilities');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const comments = await readJsonFile('comments.json');

  const { articleId } = req.params;

  const article = articles.find(({ id }) => id === articleId);

  if (!article) {
    return res
      .status(404)
      .json({ msg: 'The article with given ID was not found!' });
  }

  const removeCommentsForArticle = comments.filter(
    comment => comment.articleId !== articleId
  );

  await saveJsonFile('comments.json', removeCommentsForArticle);

  const index = articles.indexOf(article);
  articles.splice(index, 1);
  await saveJsonFile('articles.json', articles);

  res.json({ Msg: 'Deleted article is:', article, comments: comments.length });
};
