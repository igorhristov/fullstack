const Mustache = require('mustache');
const saveHtmlPage = require('./saveHtmlPage');
// const { articles, authors, tags } = require('../data');
// const extendedAuthors = require('../index.js');

const homepageTpl = require('../templates/allAuthors');
const fetch = require('node-fetch');

const getEndpoints = async endpoint => {
  let response = await fetch(
    `https://igorfullstack.herokuapp.com/api/${endpoint}`
  );
  let data = await response.json();
  return data;
};

module.exports = async () => {
  const authors = await getEndpoints('authors');

  const output = Mustache.render(homepageTpl(), {
    authors
  });

  await saveHtmlPage('authors.html', output);
};
