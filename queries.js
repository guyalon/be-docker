var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;//'postgres://localhost:5432/twitter';
var db = pgp(connectionString);

// add query functions

function getTweets(req, res, next) {
    db.any('select * from tweets')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL Tweets'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getTweet(req, res, next) {
    var tweetID = parseInt(req.params.id);
    db.one('select * from tweets where id = $1', tweetID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE tweet'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function createTweet(req, res, next) {
    db.none('insert into tweets(content, username, likes_count, retweet_count,created_at,updated_at)' +
        'values(${content}, ${username}, 0,0,now(),now())',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one tweet'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function likeTweet(req,res,next){
  const data = {...req.params,...req.body};
  console.log(data);
  db.none('insert into likes(like_user, tweet_id,created_at,updated_at)'+
      'values(${username}, ${id} ,now(),now());' +
      'update tweets set likes_count = likes_count+1 where id=${id}',
      data)
      .then(function () {
      res.status(200)
          .json({
              status: 'success',
              message: 'liked tweet no '+req.params.id
          });
  })
      .catch(function (err) {
          return next(err);
      });

}
function reTweet(req,res,next){
    const data = {...req.params,...req.body};
    console.log(data);

    db.none('insert into retweets(content,tweet_user, tweet_id,created_at,updated_at)'+
        'values(${content}, ${username}, ${id} ,now(),now());' +
        'update tweets set retweet_count = retweet_count+1 where id=${id}',
        data)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'incremented retweet count for tweet no '+req.params.id
                });
        })
        .catch(function (err) {
            return next(err);
        });

}

module.exports = {
  getTweets: getTweets,
  getTweet: getTweet,
  createTweet: createTweet,
  likeTweet: likeTweet,
  reTweet: reTweet
};
