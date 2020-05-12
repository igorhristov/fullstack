const { readJsonFile, saveJsonFile } = require('../../../utilities');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');
  const { authorId } = req.params;
  const author = authors.find(({ id }) => id === authorId);

  const { name, avatar, email, username, website, bio } = req.body;

  const updateAuthor = {
    id: author.id,
    name: name || author.name,
    avatar: avatar || author.avatar,
    email: email || author.email,
    username: username || author.username,
    website: website || author.website,
    bio: bio || author.bio
  };

  if (!updateAuthor.name || updateAuthor.name.length < 3) {
    return res.status(400).json({
      msg: 'Author Name is required and should be minimum 3 caracters'
    });
  }

  if (!updateAuthor.avatar) {
    return res.status(400).json({ msg: 'Author avatar is required' });
  }

  if (!updateAuthor.email || updateAuthor.email.length < 6) {
    return res.status(400).json({ msg: 'Invalid Author email' });
  }

  if (!updateAuthor.website || updateAuthor.website.length < 6) {
    return res.status(400).json({ msg: 'Invalid Author website' });
  }

  if (!updateAuthor.bio || updateAuthor.bio.length < 20) {
    return res.status(400).json({
      msg: 'Author bio is required and should be minimum 20 caracters'
    });
  }

  const updatedAuthors = authors.map(author => {
    return author.id === updateAuthor.id ? updateAuthor : author;
  });

  await saveJsonFile('authors.json', updatedAuthors);

  res.json({ msg: authors.length, updateAuthor });
};
