var express = require('express');
var router = express.Router();

const site = require('../controllers/site')
const room = require('../controllers/room')


/* GET home page. */
router.get('/', function(req, res, next) {
	site.index(req, res, next)
});

/* GET rank page. */
router.get('/rank', function (req, res, next) {
	room.rank(req, res, next)
})

module.exports = router;
