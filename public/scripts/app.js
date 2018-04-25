/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const ERR_ZERO_LENGTH = 'err-zero-length';
const ERR_OVER_CHAR_LIMIT = 'err-over-char-limit';


// Resolve a JQuery 'promise' chain (results in calling the chain's .then() handler)
function resolveWith(data) {
  return $.Deferred().resolve(data);
}
// Reject a JQuery 'promise' chain (results in calling the chain's .fail() handler)
function rejectWith(message) {
  return $.Deferred().reject(message);
}

/* ----- Tweet loading and rendering ----- */

function createTweetElement(tweetData) {
  let $tweet = $('<article></article>').addClass('tweet');

  // Construct header
  let $header = $('<header></header>');
  // User avatar
  $('<img></img>')
    .addClass('avatar')
    .attr('src', tweetData.user.avatars.small)
    .attr('alt', `${tweetData.user.name} avatar`)
    .appendTo($header);
  // User full name
  $('<span></span>')
    .addClass('fullname')
    .text(tweetData.user.name)
    .appendTo($header);
  // User handle
  $('<span></span>')
    .addClass('handle')
    .text(tweetData.user.handle)
    .appendTo($header);

  // Construct tweet body
  let $body = $('<div></div>')
    .addClass('tweet-body')
    .text(tweetData.content.text);

  // Construct tweet footer
  let $footer = $('<footer></footer>')
  // Time posted
  $('<span></span>')
    .addClass('time-posted')
    .text(timeAgo(tweetData.created_at))
    .appendTo($footer)
  // Button area
  let $buttonArea = $('<div></div>')
    .addClass('button-area')
    .appendTo($footer);
  // Flag button
  $('<i></i>')
    .addClass('fas')
    .addClass('fa-flag')
    .appendTo($buttonArea);
  // Retweet button
  $('<i></i>')
    .addClass('fas')
    .addClass('fa-retweet')
    .appendTo($buttonArea);
  // Like button
  $('<i></i>')
    .addClass('fas')
    .addClass('fa-heart')
    .appendTo($buttonArea);

  // Compile tweet components
  $tweet.append($header).append($body).append($footer);

  return ($tweet);
}

function renderTweets(data) {
  let $tweetContainer = $('#tweets-container')
  for (tweet of data) {
    $tweetContainer.append(createTweetElement(tweet));
  }
}

function loadTweets() {
  return $.get('/tweets');
}

function sortTweetsAscending(data) {
  return data.sort((a,b) => {
    return b.created_at - a.created_at;
  });
}

/* ----- Tweet submission ----- */

// Form validation before submitting
function validateTweet($form) {
  let tweetLength = $form.find('textarea').val().length;

  // Validate tweet length
  if (tweetLength === 0) {
    return rejectWith(ERR_ZERO_LENGTH)
  } else if (tweetLength > 140) {
    return rejectWith(ERR_OVER_CHAR_LIMIT)
  }

  // Resolve the serialized form data
  return resolveWith($form.serialize())
}

function submitTweet(formData) {
  console.log(formData)
  return $.post('/tweetsa', formData)
}

function clearComposer() {
  // Clear the form
  $('#composer')[0].reset()
  // Reset the char counter by triggering keyup event
  $('#composer > textarea').trigger('keyup')
}

// Render an error message
function showErrorMessage(message) {
  const $errorMessageArea = $('#error-message');
  const $errorText = $('#error-message > span');

  // Set the message text
  $errorText.text(message);
  // Show then hide the message
  $errorMessageArea
    .clearQueue()
    .slideDown('fast')
    .delay(2000)
    .slideUp('slow');
}

// Master error handler
function handleError(err) {
  if (err === ERR_ZERO_LENGTH) {
    showErrorMessage('Tweet has no chars!');
  } else if (err === ERR_OVER_CHAR_LIMIT) {
    showErrorMessage('Tweet has too many chars!')
  } else {
    showErrorMessage(`Error ${err.status}: ${err.statusText}`)
    console.log(err);
  }
}

$(document).ready(() => {
  loadTweets()
    .then(sortTweetsAscending)
    .then(renderTweets)
    .fail((err) => {
      console.error('Error: ',err)
    });

  $('#composer').on('submit', (e) => {
    e.preventDefault();
    validateTweet($(e.target))
      .then(submitTweet)
      .then(clearComposer)
      .fail(handleError);
  });

  $('.new-tweet textarea').on('focus', () => {
    $('.new-tweet').addClass('focus-view')
  }).on('blur', () => {
    $('.new-tweet').removeClass('focus-view')
  });
})