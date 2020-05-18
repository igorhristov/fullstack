const router = require('express').Router();
const articles = require('./articles');
const articleId = require('./articleId');
const deleteArticle = require('./deleteArticle');
const newArticle = require('./newArticle');
const updateArticle = require('./updateArticle');

router.route('/').get(articles).post(newArticle);

router.route('/:id').get(articleId).patch(updateArticle).delete(deleteArticle);

module.exports = router;
