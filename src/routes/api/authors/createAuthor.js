const { readJsonFile, saveJsonFile } = require('../../../utilities');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');
  const { name, avatar, email, username, website, bio } = req.body;

  if (!name || name.length < 3) {
    return res.status(400).json({
      msg: 'Author Name is required and should be minimum 3 caracters'
    });
  }

  if (!avatar) {
    return res.status(400).json({ msg: 'Author avatar is required' });
  }

  if (!email || email.length < 6) {
    return res.status(400).json({ msg: 'Invalid Author email' });
  }

  if (!website || website.length < 6) {
    return res.status(400).json({ msg: 'Invalid Author website' });
  }

  if (!bio || bio.length < 20) {
    return res.status(400).json({
      msg: 'Author bio is required and should be minimum 20 caracters'
    });
  }

  const author = {
    id: uuidv4(),
    name,
    avatar,
    email,
    username,
    website,
    bio
  };

  await saveJsonFile('authors.json', [...authors, author]);

  res.json({ msg: authors.length, author });
};
