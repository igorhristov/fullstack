const { readJsonFile, saveJsonFile } = require('../../../utilities');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const getTags = await readJsonFile('tags.json');

  const { authorId, title, summary, body, tags } = req.body;

  if (!authorId) {
    return res.status(400).json({ msg: 'Author ID is required' });
  }

  if (!title || title.length < 3) {
    return res
      .status(400)
      .json({ msg: 'Title is required and should be minimum 3 caracters' });
  }

  if (!summary || summary.length < 20) {
    return res
      .status(400)
      .json({ msg: 'summary is required and should be minimum 20 caracters' });
  }

  if (!body || body.length < 50) {
    return res
      .status(400)
      .json({ msg: 'body is required and should be minimum 50 caracters' });
  }

  if (!tags || tags.length < 1) {
    return res
      .status(400)
      .json({ msg: 'tag is required and should at least 1 tag' });
  }

  [...tags].forEach(tag => {
    if (!Object.keys(getTags).includes(tag)) {
      getTags[tag] = tag;
    }
  });

  const article = {
    id: uuidv4(),
    authorId,
    title,
    date: new Date(),
    summary,
    body,
    tags
  };

  await saveJsonFile('articles.json', [...articles, article]);
  await saveJsonFile('tags.json', getTags);

  res.json({ msg: articles.length, article });
};
