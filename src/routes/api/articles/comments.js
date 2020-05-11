const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const { articleId } = req.params;
  const comments = await readJsonFile('comments.json');

  res.json(comments.filter(comment => comment.articleId === articleId));
};
