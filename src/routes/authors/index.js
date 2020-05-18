const router = require('express').Router();
const authors = require('./authors');
const authorId = require('./authorId');
const newAuthor = require('./newAuthor');
const updateAuthor = require('./updateAuthor');
const deleteAuthor = require('./deleteAuthor');

router.route('/').get(authors).post(newAuthor);
router
  .route('/:authorId')
  .get(authorId)
  .patch(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
