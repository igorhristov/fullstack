const router = require('express').Router();
const authors = require('./authors');
const author = require('./author');
const createAuthor = require('./createAuthor');
const updateAuthor = require('./updateAuthor');
const authorArticles = require('./authorArticles');

router.route('/').get(authors).post(createAuthor);

router.route('/:authorId').get(author).patch(updateAuthor);

router.route('/:authorId/articles').get(authorArticles);

module.exports = router;
