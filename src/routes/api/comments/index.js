const router = require('express').Router();
const comments = require('./comments');


router.route('/').get(comments);


module.exports = router;
