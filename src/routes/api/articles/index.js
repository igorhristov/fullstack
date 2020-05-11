const router = require('express').Router();
const articles = require('./articles');
const article = require('./article');
const createArticle = require('./createArticle');
const updateArticle = require('./updateArticle');
const deleteArticle = require('./deleteArticle');

router.route('/').get(articles).post(createArticle);

router
  .route('/:articleId')
  .get(article)
  .patch(updateArticle)
  .delete(deleteArticle);

module.exports = router;
