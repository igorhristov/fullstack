const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const { slug } = req.params;

  const tags = await readJsonFile('tags.json');

  res.json(tags[slug]);
};
