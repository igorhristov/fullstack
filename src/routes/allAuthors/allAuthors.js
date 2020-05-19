const { readJsonFile } = require('../../utilities');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');
  const articles = await readJsonFile('articles.json');

  let authorsArr = [];
  for (let i = 0; i < authors.length; i++) {
    const articlesNum = articles.filter(article => {
      return article.authorId === authors[i].id;
    });
    authorsArr.push({
      id: authors[i].id,
      name: authors[i].name,
      avatar: authors[i].avatar,
      email: authors[i].email,
      username: authors[i].username,
      website: authors[i].website,
      bio: authors[i].bio,
      articlesNumber: articlesNum.length + ' ARTICLES'
    });
  }
  res.json(authorsArr);
};
