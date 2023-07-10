// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  $(document).ready(function() {
      const $form = $("form");
       // add an event listener that listens for the submit event
      $form.submit((event) => {
      // prevent the default behaviour of the submit event (data submission and page refresh)
      event.preventDefault(); //use event.preventDefault() to prevent the default form submission behaviour.
      // The jQuery .serialize() function turns a set of form data into a query string. This serialized data 
      // should be sent to the server in the data field of the AJAX POST request.
      const formData = $form.serialize(); //
      // create an AJAX POST request in client.js that sends the form data to the server.
      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "POST",
        data: formData,
      });
      console.log(event);
      $form[0].reset();
    });
  });

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweetElement);
  
    }
  };
/* Your code for creating the tweet element */
const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet');
    const $header = $('<header>');
    const $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars);
    const $name = $('<span>').addClass('name').text(tweet.user.name);
    const $handle = $('<span>').addClass('handle').text(tweet.user.handle);
    $header.append($avatar, $name, $handle);
  
    const $content = $('<div>').addClass('content').text(tweet.content.text);
    const $footer = $('<footer>');
    const $timestamp = $('<span>').addClass('timestamp').text(tweet.created_at);
    const $icons = $('<span>').addClass('icons').html('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');
    $footer.append($timestamp, $icons);
    $tweet.append($header, $content, $footer);
  
    return $tweet;
  };
  
  renderTweets(data);