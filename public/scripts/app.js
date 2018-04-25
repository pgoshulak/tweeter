/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

function submitTweet(formData) {
  console.log(formData)
  return $.post('/tweets', formData)
}

function clearComposer() {
  // Clear the form
  $('#composer')[0].reset()
  // Reset the char counter by triggering keyup event
  $('#composer > textarea').trigger('keyup')
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
    let formData = $(e.target).serialize()
    submitTweet(formData)
      .then(clearComposer)
      .fail((err) => {
        console.error('Error: ',err)
      });
  });

  $('.new-tweet textarea').on('focus', () => {
    $('.new-tweet').addClass('focus-view')
  }).on('blur', () => {
    $('.new-tweet').removeClass('focus-view')
  });
})