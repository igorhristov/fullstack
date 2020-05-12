const comments = require('../../../data/comments.json');
const { v4: uuidv4 } = require('uuid');

module.exports = (req, res) => {
  const { articleId } = req.params;

  const { userId, body } = req.body;

  if (!articleId) {
    throw new Error('Article ID is required');
  }

  if (!userId) {
    userId = uuidv4();
  }

  if (!body || body.length < 35) {
    throw new Error('Invalid article body');
  }

  const newDate = new Date(Date.now());
  const comment = {
    id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    articleId,
    userId,
    date: newDate,
    body
  };
  res.json(comment);
};
