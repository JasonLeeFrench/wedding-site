var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Maria and Jason are getting married!' });
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { 
  failureRedirect: '/' 
}), function(req, res) {
  res.redirect('/rsvp');
});

module.exports = router;
