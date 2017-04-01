var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL || "");

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/auth/facebook');

router.all('/', ensureLoggedIn, function(req, res, next){
  client.hgetall(req.user.displayName, function(err, response){
    if(response && !response.attending){
      req.session.user = {
        fbData: req.user,
        event: response.event
      };
      next();
    } else if (response.attending) {
      req.session.message = "It seems you've already RSVP'd!";
      res.redirect('/');
    } else {
      req.session.message = "Sorry, we couldn't find your name on the guest list. Please email MariaAndJasonAreGettingMarried@gmail.com to RSVP!";
      res.redirect('/');      
    }
  });
});

/* GET rsvp page. */
router.get('/', function(req, res){
  var user = req.session.user;
  if(!user.event){
    user.event = 'reception';
  }
  res.render('rsvp', {
    title: user.fbData.name.givenName + '\'s RSVP',
    user: user
  });
});

/* POST rsvp page. */
router.post('/', function(req, res){
  var response = req.body;
  client.hmset([
    req.user.displayName,
    "names", response['names'],
    "attending", response['attending'], 
    "dietary-needs", response['dietary-needs'],
    "song-request", response['song-request'],
    "notes", response['notes']
  ]);
  req.session.message = "Thank you for RSVPing! Your response has been sent.";
  res.redirect('/');
});

module.exports = router;
