/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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

$(document).ready(() => {
  // var $tweet = createTweetElement(tweetData);
  // $('#tweets-container').append($tweet);
  renderTweets(data);

  $('.new-tweet textarea').on('focus', () => {
    $('.new-tweet').addClass('focus-view')
  }).on('blur', () => {
    $('.new-tweet').removeClass('focus-view')
  });
})