const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const tags = await readJsonFile('tags.json');

  res.json(tags);
};
