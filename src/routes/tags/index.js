const router = require('express').Router();
const tags = require('./tags');

router.route('/').get(tags);

module.exports = router;
