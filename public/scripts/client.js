 $(document).ready(function() {
      const $form = $("form");
         //The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
      const loadTweets = function() {
        // Make a GET request to the server using Ajax
        $.ajax({
          url: "http://localhost:8080/tweets",
          method: "GET",
        }).then((res) => {
          console.log("render Tweets: ", res);
        // Call the renderTweets function and pass the response as an argument
          renderTweets(res);
        });
      };
        // Call the loadTweets function to initiate the GET request
      loadTweets();
        // Add an event listener that listens for the submit event
      $form.submit((event) => {
        // Prevent the default behaviour of the submit event (data submission and page refresh)
      event.preventDefault(); //use event.preventDefault() to prevent the default form submission behaviour.
        // The jQuery .serialize() function turns a set of form data into a query string. This serialized data 
        // Should be sent to the server in the data field of the AJAX POST request.
      const formData = $form.serialize(); 
        //Form Validation. Use the built-in browser alert function
      const tweetContent = $form.find("textarea[name='text']").val().trim();
      if (tweetContent === "") {
        alert("Please write a Tweet!");
        return;
      }
      if (tweetContent.length > 140) {
        alert("This tweet is to long!!!!");
        return;
      }
       // create an AJAX POST request in client.js that sends the form data to the server.
      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "POST",
        data: formData,
        }).then(() => {
        loadTweets();
      });
      console.log(event);
      $form[0].reset();
      $(".counter").val(140);
    });
  });
  const renderTweets = function(tweets) {
     // Clear previous tweets
    $('#tweets-container').empty();
     // loops through tweets
    for (const tweet of tweets) {
     // Calls createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
         $('#tweets-container').prepend($tweetElement);
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
    const $timestamp = $('<span>').addClass('timestamp').text(tweet.created_at).text(timeago.format(tweet.created_at, "en_US"));
    const $icons = $('<span>').addClass('icons').html('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');
    $footer.append($timestamp, $icons);
    $tweet.append($header, $content, $footer);
  
    return $tweet;
  };
  
 