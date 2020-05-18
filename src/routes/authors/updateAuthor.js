const { saveJsonFile, readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');

  const { authorId } = req.params;
  const author = authors.find(({ id }) => id === authorId);

  const { name, avatar, email, username, website, bio } = req.body;

  const authorUpdated = {
    id: author.id,
    name: name || author.name,
    avatar: avatar || author.avatar,
    email: email || author.email,
    username: username || author.username,
    website: website || author.website,
    bio: bio || author.bio
  };

  if (!authorUpdated.name || authorUpdated.name.length < 3) {
    throw new Error('Invalid name');
  }

  if (!authorUpdated.avatar) {
    throw new Error('Author avatar is required');
  }

  if (!authorUpdated.email || authorUpdated.email.length < 6) {
    throw new Error('Invalid Author email');
  }

  if (!authorUpdated.username || authorUpdated.username.length < 2) {
    throw new Error('Invalid username');
  }

  if (!authorUpdated.website || authorUpdated.website.length < 6) {
    throw new Error('Invalid Author website');
  }

  if (!authorUpdated.bio || authorUpdated.bio.length < 20) {
    throw new Error('Bio requiered');
  }

  const updatedAuhors = authors.map(author =>
    author.id === authorUpdated.id ? authorUpdated : author
  );

  await saveJsonFile('authors.json', updatedAuhors);

  res.json({ MSG: 'author updated', authorUpdated });
};
