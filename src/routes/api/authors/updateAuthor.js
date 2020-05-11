const { readJsonFile, saveJsonFile } = require('../../../utilities');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');
  const { authorId } = req.params;
  const author = authors.find(({ id }) => id === authorId);

  const { name, avatar, email, username, website, bio } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .send('Author Name is required and should be minimum 3 caracters');
  }

  if (!avatar) {
    return res.status(400).send('Author avatar is required');
  }

  if (!email || email.length < 6) {
    return res.status(400).send('Invalid Author email');
  }

  if (!website || website.length < 6) {
    return res.status(400).send('Invalid Author website');
  }

  if (!bio || bio.length < 20) {
    return res
      .status(400)
      .send('Author bio is required and should be minimum 20 caracters');
  }

  const updatedauthor = {
    id: authorId,
    name,
    avatar,
    email,
    username,
    website,
    bio
  };

  const updatedAuthors = authors.map(author => {
    return author.id === updatedauthor.id ? updatedauthor : author;
  });

  await saveJsonFile('authors.json', updatedAuthors);

  res.json({ msg: authors.length, updatedauthor });
};
