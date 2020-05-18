const uuid = require('uuid');
const { saveJsonFile, readJsonFile } = require('../../utilities');
module.exports = async (req, res) => {
  const id = req.query.id;
  const authors = await readJsonFile('authors.json');
  const randomiser = Math.ceil(Math.random() * 100);

  const authorId = randomiser < 51 ? authors[randomiser].id : uuid.v4();

  const { name } = req.body;

  const comment = {
    id: uuid.v4(),
    articleId: id,
    userId: authorId,
    date: new Date(),
    body: name
  };

  /* if (
    // !comment.id ||
    // !comment.articleId ||
    // !comment.userId ||
    // !comment.body ||
    comment.body.length < 30
  ) {
    throw 'Error:Wrong input';
  }*/

  const comments = await readJsonFile('comments.json');
  await saveJsonFile('comments.json', [...comments, comment]);
  // res.json({ 'created comment': comment });
  res.redirect('/article/?id=' + id);
};
