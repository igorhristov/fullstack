const { readJsonFile, saveJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const { authorId } = req.params;

  const authors = await readJsonFile('authors.json');
  const comments = await readJsonFile('comments.json');
  const articles = await readJsonFile('articles.json');

  const author = authors.find(({ id }) => id === authorId);

  if (!author) {
    throw new Error('Invalid authorId');
  }

  await saveJsonFile(
    'authors.json',
    authors.filter(({ id }) => id !== authorId)
  );

  await saveJsonFile(
    'comments.json',
    comments.filter(({ userId }) => userId !== authorId)
  );

  await saveJsonFile(
    'articles.json',
    articles.filter(article => article.authorId !== authorId)
  );

  res.json(author);
};
