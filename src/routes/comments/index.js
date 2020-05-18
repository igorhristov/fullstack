const router = require('express').Router();
const comments = require('./comments');
const articleComments = require('./articleComments');
const createComment = require('./createComment');

router.route('/').get(comments).post(createComment);

router.route('/:articleId').get(articleComments);

module.exports = router;
