const { readJsonFile, saveJsonFile } = require('../../utilities');
const uuid = require('uuid');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const { authorId, title, summary, body, tags } = req.body;

  if (
    !authorId ||
    authorId.length < 5 ||
    !title ||
    title.length < 10 ||
    !summary ||
    summary.length < 20 ||
    !body ||
    body.length < 30 ||
    !tags ||
    tags.length === 0
  ) {
    throw 'Error:Wrong input';
  }

  const article = {
    date: new Date(),
    id: uuid.v4(),
    authorId,
    title,
    summary,
    body,
    tags
  };

  const originalTags = await readJsonFile('tags.json');
  article.tags.forEach(tag =>
    Object.keys(originalTags).includes(tag)
      ? originalTags
      : (originalTags[tag] = tag)
  );

  await saveJsonFile('tags.json', originalTags);
  await saveJsonFile('articles.json', [...articles, article]);
  res.json(article);
};
