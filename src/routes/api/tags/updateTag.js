const { readJsonFile, saveJsonFile } = require('../../../utilities');

module.exports = async (req, res) => {
  const tags = await readJsonFile('tags.json');
  let { slug } = req.params;

  if (!tags[slug]) {
    return res.status(404).json({ msg: 'Given slug was not found!' });
  }

  const { [slug]: title } = req.body;
  const updatedTag = {
    [slug]: title
  };

  if (!updatedTag[slug] || updatedTag[slug].length < 3) {
    return res.status(404).json({ msg: 'Given slug is not valid!' });
  }

  if (tags.hasOwnProperty(slug)) {
    tags[slug] = title;
  }

  await saveJsonFile('tags.json', tags);
  res.json(updatedTag);
};
