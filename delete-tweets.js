const Twit = require('twit'); 

const T = new Twit({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token: 'YOUR_ACCESS_TOKEN',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET',
  timeout_ms: 60 * 1000,
});

function deleteAllTweets() {
  T.get('statuses/user_timeline', { count: 200 }, function (err, data, response) {
    if (err) {
      console.log('Error getting tweets:', err);
    } else {
      const ids = data.map((tweet) => ({ id: tweet.id_str })); 
      T.post('statuses/destroy', { id: ids }, function (err, data, response) {
        if (err) {
          console.log('Error deleting tweets:', err);
        } else {
          console.log('Deleted:', ids);
          if (ids.length !== 0) {
            deleteAllTweets();
          } else {
            console.log('All tweets deleted successfully!');
          }
        }
      });
    }
  });
}

deleteAllTweets(); 
