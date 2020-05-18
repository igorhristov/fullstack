const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const comments = await readJsonFile('comments.json');

  const articleId = req.params.articleId;
  const articleComments = comments.filter(
    comment => comment.articleId === articleId
  );
  console.log(articleId);
  articleComments.length !== 0
    ? res.json(articleComments)
    : res.status(404).send('404:Not found!');
};
