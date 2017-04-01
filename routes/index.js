var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var message = req.session.message;
  res.render('index', { 
    title: 'Maria and Jason are getting married!', 
    message: message
  });
  req.session.message = null;
});

module.exports = router;
