const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const comments = await readJsonFile('comments.json');

  res.json(comments);
};
