const router = require('express').Router();
const articles = require('./articles');
const authors = require('./authors');
const allAuthors = require('./allAuthors');
const tags = require('./tags');
const comments = require('./comments');

router.use('/api/articles', articles);

router.use('/api/authors', authors);

router.use('/api/allAuthors', allAuthors);

router.use('/api/tags', tags);

router.use('/api/comments', comments);

module.exports = router;
