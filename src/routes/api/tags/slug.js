const { readJsonFile } = require('../../../utilities.js');

module.exports = async (req, res) => {
  const tags = await readJsonFile('tags.json');
  const { slug } = req.params;

  if (tags[slug] === undefined) {
    res.status(404).json({ msg: 'Given slug was not found!' });
  }

  res.json(tags[slug]);
};
