var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/tweets', db.getTweets);
router.get('/api/tweets/:id', db.getTweet);
router.post('/api/tweets', db.createTweet);
router.post('/api/tweets/:id/likes', db.likeTweet);
router.post('/api/tweets/:id/retweet', db.reTweet);
// router.get('/api/retweets', db.getRetweet);

// router.get('/api/tweets/:id', db.getTweet);
// router.post('/api/retweets', db.createTweet);
// router.put('/api/tweets/:id', db.updateTweet);
// router.put('/api/retweets/:id', db.updateTweet);
// router.delete('/api/tweets/:id', db.removeTweet);

module.exports = router;