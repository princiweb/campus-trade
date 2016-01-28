var Twitter  = require('node-tweet-stream');
var mongoose = require('mongoose');
var Twitter = require('twitter');

mongoose.connect('mongodb://trade:trade@ds051655.mongolab.com:51655/campus-trade');
var twitterKeys = {
  consumer_key: 'b6BlEgaeHd4qUJxmJvucKjvCC',
  consumer_secret: 'Yc4yuLaQ8HxVfLDid1MrEQaeoevxVGBjo0eInkzVPGGYlQBqNH',
  token: '4855496158-BKYgu0ownY67PW5Hbup4YpmT4QG5uF7FK7LS9HR',
  token_secret: 'sy81SPX27dTSI7TfR9NxghngFkf2KLLb2EsxvFWXGlkh8'
};

var Trades = mongoose.model('Trades', { 
  user: {
    id: String,
    name: String,
    screenName: String,
    profileImage: String
  },
  content: String,
  offered: String,
  wanted: String,
  createdAt: Date
});

var t = new Twitter(twitterKeys);
 
t.on('tweet', function (tweet) {
  console.log('tweet received \n', tweet)
  
  var regxp = /troco ([a-z\u00E0-\u00FC_\s]+) por ([a-z\u00E0-\u00FC_\s]+\w)(.*)/i;

  var offered = tweet.text.match(regxp)[1];
  var wanted = tweet.text.match(regxp)[2];

  var trade = new Trades({
    user: {
      id: tweet.user.id,
      name: tweet.user.name,
      screenName: tweet.user.screen_name,
      profileImage: tweet.user.profile_image_url
    },
    content: tweet.text,
    offered: offered,
    wanted: wanted
  });
  
  trade.save(function (err) {
    if (err)
      return console.error(err);
  });
})
  
t.track('@cpbrtrade');

// var client = new Twitter({
//   consumer_key: twitterKeys.consumer_key,
//   consumer_secret: twitterKeys.consumer_secret,
//   access_token_key: twitterKeys.token,
//   access_token_secret: twitterKeys.token_secret
// });
// ```

// [12:50] 
//  ```client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response){
//   if(error) throw error;
//   console.log(tweet);  // Tweet body. 
//   console.log(response);  // Raw response object. 
// });