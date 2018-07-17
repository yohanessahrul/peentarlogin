var express = require('express');
var router = express.Router();

const { findAll, registerUser } = require('../controllers/c_user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/findall', findAll);
router.post('/register', registerUser);

module.exports = router;
