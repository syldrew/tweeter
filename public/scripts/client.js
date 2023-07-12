 $(document).ready(function() {
      const $form = $("form");   
      const $error = $("#error");
      
      const loadTweets = function() {                                        //The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
        $.ajax({ 
          url: "http://localhost:8080/tweets",
          method: "GET",
        }).then((res) => {
          console.log("render Tweets: ", res);
          renderTweets(res);
        });
      };
   
      loadTweets();
        
      $form.submit((event) => {                                                // Add an event listener that listens for the submit event
      event.preventDefault();                                                  //use event.preventDefault() to prevent the default form submission behaviour.
      $error.hide();                                                           //Hide error element.
        
      const formData = $form.serialize();                                      // The jQuery .serialize() function turns a set of form data into a query string. This serialized data 
      const tweetContent = $form.find("textarea[name='text']").val().trim();   //Form Validation. Use the built-in browser alert function
      if (tweetContent === "") {
        showError("Please write a Tweet!")
        return;
      }
      if (tweetContent.length > 140) {
        showError("This tweet is too long!!!!")
        return;
      }
       
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
      $(".invalid").slideUp();
    });

   const showError = function(message) {                 // Function to show the error message
    $error.find("#message").text(message);
    $error.slideDown();                                  //Use the slideDown jQuery function for some simple animation.
   };
  });

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();                       // Clear previous tweets
    for (const tweet of tweets) {                         // loops through tweets
     const $tweetElement = createTweetElement(tweet);     // Calls createTweetElement for each tweet
         $('#tweets-container').prepend($tweetElement);
    }
  };

     // Your code for creating the tweet element 
    const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet');
    const $header = $("<div>").addClass("article-header");
    const $avatarContainer = $("<div>");                   
    const $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars);
    const $name = $('<span>').addClass('name').text(tweet.user.name);
    const $handle = $('<span>').addClass('handle').text(tweet.user.handle);
    $header.append($avatar, $name, $handle);
    const $content = $('<div>').addClass('content').text(tweet.content.text);
    const $footer = $('<footer>');
    const $timestamp = $('<span>').addClass('timestamp').text(tweet.created_at).text(timeago.format(tweet.created_at, "en_US"));
    const $icons = $('<span>').addClass('icons').html('<i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i>');
    $avatarContainer.append($avatar, $name);
    $header.append($avatarContainer, $handle);
    $footer.append($timestamp, $icons);
    $tweet.append($header, $content, $footer);
  
    return $tweet;
  };
  
 