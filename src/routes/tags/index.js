const router = require('express').Router();
const tags = require('./tags');
const slug = require('./slug');
const slugArticles = require('./slugArticles');
const deleteTag = require('./deleteTag');

router.route('/').get(tags);
router.route('/:slug').get(slug).delete(deleteTag);
router.route('/:slug/articles').get(slugArticles);

module.exports = router;
