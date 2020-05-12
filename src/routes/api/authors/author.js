const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');
  const { authorId } = req.params;
  const author = authors.find(({ id }) => id === authorId);

  !author
    ? res.status(404).json({ msg: 'The author with given ID was not found!' })
    : res.json({ author });
};
