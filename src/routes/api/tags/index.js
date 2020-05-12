const router = require('express').Router();
const tags = require('./tags');
const slug = require('./slug');
const updateTag = require('./updateTag');
const slugArticles = require('./slugArticles');

router.route('/').get(tags);

router.route('/:slug').get(slug).post(updateTag);

router.route('/:slug/articles').get(slugArticles);

module.exports = router;
