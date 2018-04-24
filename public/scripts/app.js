/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
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
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// Transform the date posted into time-since posted (eg. 3 hours ago)
function timeAgo(timestamp) {
  let dateDiff = new Date() - new Date(timestamp);
  
  // Check if years >= 1
  let yearsAgo = dateDiff / (1000 * 60 * 60 * 24 * 365)
  if (yearsAgo >= 2) {
    return `${Math.floor(yearsAgo)} years ago`
  } else if (yearsAgo >= 1) {
    return `${Math.floor(yearsAgo)} year ago`
  }
  // Check if months >= 1
  let monthsAgo = dateDiff / (1000 * 60 * 60 * 24 * 30)
  if (monthsAgo >= 2) {
    return `${Math.floor(monthsAgo)} months ago`
  } else if (monthsAgo >= 1) {
    return `${Math.floor(monthsAgo)} month ago`
  }
  // Check if weeks >= 1
  let weeksAgo = dateDiff / (1000 * 60 * 60 * 24 * 7)
  if (weeksAgo >= 2) {
    return `${Math.floor(weeksAgo)} weeks ago`
  } else if (weeksAgo >= 1) {
    return `${Math.floor(weeksAgo)} week ago`
  }
  // Check if days >= 1
  let daysAgo = dateDiff / (1000 * 60 * 60 * 24)
  if (daysAgo >= 2) {
    return `${Math.floor(daysAgo)} days ago`
  } else if (daysAgo >= 1) {
    return `${Math.floor(daysAgo)} day ago`
  }
  // Check if hours >= 1
  let hoursAgo = dateDiff / (1000 * 60 * 60)
  if (hoursAgo >= 2) {
    return `${Math.floor(hoursAgo)} hours ago`
  } else if (hoursAgo >= 1) {
    return `${Math.floor(hoursAgo)} hour ago`
  }
  // Check if min >= 1
  let minsAgo = dateDiff / (1000 * 60)
  if (minsAgo >= 2) {
    return `${Math.floor(minsAgo)} mins ago`
  } else if (minsAgo >= 1) {
    return `${Math.floor(minsAgo)} min ago`
  }
  // Check if secs >= 1
  let secsAgo = dateDiff / (1000)
  if (secsAgo >= 2) {
    return `${Math.floor(secsAgo)} secs ago`
  } else if (secsAgo >= 1) {
    return `${Math.floor(secsAgo)} sec ago`
  }

  return 'A moment ago'
}

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
})