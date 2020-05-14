const router = require('express').Router();
const authors = require('./authors');
const author = require('./author');

router.route('/').get(authors);
router.route('/:authorId').get(author);

module.exports = router;
