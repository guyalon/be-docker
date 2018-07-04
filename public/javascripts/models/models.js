
function Twitter(){
    var username;
    var timestamp;
    constructor(_username,_timestamp){
        this.username = _username;
        this.timestamp= _timestamp;
    }

}

Tweeter.prototype.Tweet = Tweet;
Tweeter.prototype.Like = LikeOrRetweet;
Tweeter.prototype.reTweet = LikeOrRetweet;


function Tweet(){
    var textContent;
    var username;
    var timestamp;
    var post_id;
    constructor(_username,_timestamp){
        this.username = _username;
        this.timestamp= _timestamp;
    }
}


function LikeOrRetweet(_post_id){

        this.post_id = _post_id;

}





