const authors = require('../../data/authors.json');

module.exports = (req, res) => {
  const { authorId } = req.params;
  const author = authors.find(({ id }) => id === authorId);

  if (!author) {
    return res.status(404).send('The author with given ID was not found!');
  }

  const index = authors.indexOf(author);

  authors.splice(index, 1);

  res.json({ msg: 'author DELETED: ', author });
};
