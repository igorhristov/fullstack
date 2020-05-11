const router = require('express').Router();
const articles = require('./articles');

router.route('/').get(articles);

module.exports = router;
