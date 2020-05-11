const router = require('express').Router();
const articles = require('./articles');
const article = require('./article');
const createArticle = require('./createArticle');
const updateArticle = require('./updateArticle');
const deleteArticle = require('./deleteArticle');
const comments = require('./comments');

router.route('/').get(articles).post(createArticle);

router
  .route('/:articleId')
  .get(article)
  .patch(updateArticle)
  .delete(deleteArticle);

router.route('/:articleId/comments').get(comments);

module.exports = router;
