const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');

  const { authorId } = req.params;

  res.json(authors.find(({ id }) => id === authorId));
};
