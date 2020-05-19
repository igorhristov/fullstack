const router = require('express').Router();

const allAuthors = require('./allAuthors');

router.route('/').get(allAuthors)

module.exports = router;
