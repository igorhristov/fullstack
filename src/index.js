// const articles = require('./json/articles.json');
// const tags = require('./json/tags.json');
// const authors = require('./json/authors.json');
// const comments = require('./json/comments.json');
const moment = require('moment');

const fetch = require('node-fetch');

const getEndpoints = async endpoint => {
  let response = await fetch(
    `https://igorfullstack.herokuapp.com/api/${endpoint}`
  );
  let data = await response.json();
  return data;
};

const articles =await (getEndpoints('articles'));

// const nekako = articles.then(function (bla) {
//   return bla;
// });
// console.log(nekako);

// const resolvedProm = Promise.resolve(33);
// let thenProm = resolvedProm.then(value => {
//   console.log(
//     'this gets called after the end of the main stack. the value received and returned is: ' +
//       value
//   );
//   return value;
// });
//.then(function (bla) {
// return bla;
// }); //.then(data => console.log(data));
/*
const url = 'https://igorfullstack.herokuapp.com/api/articles';

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
const articles = await getData();
console.log(articles);

// Promise.resolve(getData(url));
// console.log(getData(url));

// const art = async () => {
//   const nesto = await articles;
//   return nesto;
//   // console.log(nest);
// };
// console.log(articles);

// console.log(art());
*/

const authorsHashMap = authors.reduce((acc, author) => {
  acc[author.id] = author;
  return acc;
}, {});

const extendedComments = comments.map(comment => ({
  ...comment,
  //date: moment(comment.date).format('Do MMMM YYYY'),
  //date: moment(comment.date).unix(),
  date: moment(comment.date).startOf('day').fromNow(),
  sortableDate: moment(comment.date).format('YYYYMMDD'),
  ts: moment(comment.date).unix(),
  author: authorsHashMap[comment.userId]
}));

const extendedArticles = articles.map(article => ({
  ...article,
  comments: extendedComments
    .filter(({ articleId }) => articleId === article.id)
    .sort((a, b) => (a.ts > b.ts ? 1 : -1)),
  date: moment(article.date).format('Do MMMM YYYY'),

  author: authorsHashMap[article.authorId],
  tagsArr: article.tags,
  tags: article.tags.map(slug => ({
    slug,
    title: tags[slug]
  }))
}));

const extendedAuthors = authors.map(author => ({
  ...author,

  articles: extendedArticles.filter(({ authorId }) => authorId === author.id)
}));

module.exports = {
  articles: extendedArticles,
  authors: extendedAuthors,
  tags: Object.keys(tags).map(slug => ({
    slug,
    title: tags[slug]
  }))
};


