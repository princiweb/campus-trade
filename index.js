var TwitterStream  = require('node-tweet-stream');
var mongoose = require('mongoose');
var Twitter = require('twitter');
var resposta = require('./resposta');

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
  idTweet: String, //id_str
  idResponseTweet: String, //id_str (tweet de resposta)
  content: String,
  offered: String,
  wanted: String,
  createdAt: Date
});

var t = new TwitterStream(twitterKeys);
var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.token,
  access_token_secret: twitterKeys.token_secret
});

t.on('tweet', function (tweet) {

  console.log('Tweet received');

  if(tweet.user.screen_name == 'cpbrtrade')
    return false

  if(tweet.in_reply_to_status_id){
    if(tweet.text.match(/(finalizar|cancelar)/i)){
      Trades.remove({ idResponseTweet:tweet.in_reply_to_status_id_str }, function(err,removed){
        if(err)
          return console.error(err);
        if(!removed)
          return console.error('No tweets removed');
        console.log('tweet deleted');

        client.post('statuses/update', {status: '@'+tweet.user.screen_name+' pronto, sua troca foi finalizada! Id: '+ tweet.in_reply_to_status_id_str},  function(error, tweet, response){
          if(error)
            return console.error(error);
          console.log('tweet answered');
        });
      });
    }
  }

  var regxp = /troc(o|ar) (.*) por (.*[^\.!])/i;

  var textMached = tweet.text.match(regxp);
  if(textMached){
    var offered = textMached[2];
    var wanted = textMached[3];

    var trade = new Trades({
      user: {
        id: tweet.user.id,
        name: tweet.user.name,
        screenName: tweet.user.screen_name,
        profileImage: tweet.user.profile_image_url
      },
      idTweet: tweet.id_str,
      idResponseTweet: null,
      content: tweet.text,
      createdAt: new Date(tweet.created_at),
      offered: offered,
      wanted: wanted
    });

    trade.save(function (err) {
      if (err)
        return console.error(err);

      console.log('Tweet saved');

      client.post('statuses/retweet/' + tweet.id_str + '.json', {},  function(error, tweet, response){
        if(error)
          return console.error(error);
        console.log('Tweet retweeted');
      });

      client.post('statuses/update', {status: resposta('@'+tweet.user.screen_name)},  function(error, responseTweet, response){
        if(error)
          return console.error(error);

        Trades.update({idTweet: tweet.id_str},{idResponseTweet: responseTweet.id_str},function(err){
          if(err)
            return console.error(err);

          console.log('Tweet updated');
        });
      });

    });

  }
});


t.track('@cpbrtrade');
