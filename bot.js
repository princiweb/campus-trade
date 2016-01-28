var TwitterStream  = require('node-tweet-stream');
var Twitter = require('twitter');

var twitterKeys = {
  consumer_key: 'b6BlEgaeHd4qUJxmJvucKjvCC',
  consumer_secret: 'Yc4yuLaQ8HxVfLDid1MrEQaeoevxVGBjo0eInkzVPGGYlQBqNH',
  token: '4855496158-BKYgu0ownY67PW5Hbup4YpmT4QG5uF7FK7LS9HR',
  token_secret: 'sy81SPX27dTSI7TfR9NxghngFkf2KLLb2EsxvFWXGlkh8'
};

var t = new TwitterStream(twitterKeys);
var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.token,
  access_token_secret: twitterKeys.token_secret
});

t.on('tweet', function (tweet) {

  // client.post('statuses/retweet/' + tweet.id_str + '.json', {},  function(error, tweet, response){
    // if(error)
      // return console.error(error);
    client.post('favorites/create.json', { id: tweet.id_str },  function(error, tweet, response){
      if(error)
        return console.error(error);
    });
  // });

});

//t.track('#cpbrtrade');
t.track('#cpbr9');
t.track('@cpbrtrade');
