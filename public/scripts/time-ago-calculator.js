// Transform the date posted into time-since posted (eg. 3 hours ago)
function timeAgo(timestamp) {
  let dateDiff = new Date() - new Date(timestamp);

  // Check if years >= 1
  let yearsAgo = dateDiff / (1000 * 60 * 60 * 24 * 365)
  if (yearsAgo >= 2) {
    return `${Math.floor(yearsAgo)} years ago`
  } else if (yearsAgo >= 1) {
    return `A year ago`
  }
  // Check if months >= 1
  let monthsAgo = dateDiff / (1000 * 60 * 60 * 24 * 30)
  if (monthsAgo >= 2) {
    return `${Math.floor(monthsAgo)} months ago`
  } else if (monthsAgo >= 1) {
    return `A month ago`
  }
  // Check if weeks >= 1
  let weeksAgo = dateDiff / (1000 * 60 * 60 * 24 * 7)
  if (weeksAgo >= 2) {
    return `${Math.floor(weeksAgo)} weeks ago`
  } else if (weeksAgo >= 1) {
    return `A week ago`
  }
  // Check if days >= 1
  let daysAgo = dateDiff / (1000 * 60 * 60 * 24)
  if (daysAgo >= 2) {
    return `${Math.floor(daysAgo)} days ago`
  } else if (daysAgo >= 1) {
    return `A day ago`
  }
  // Check if hours >= 1
  let hoursAgo = dateDiff / (1000 * 60 * 60)
  if (hoursAgo >= 2) {
    return `${Math.floor(hoursAgo)} hours ago`
  } else if (hoursAgo >= 1) {
    return `An hour ago`
  }
  // Check if min >= 1
  let minsAgo = dateDiff / (1000 * 60)
  if (minsAgo >= 2) {
    return `${Math.floor(minsAgo)} minutes ago`
  } else if (minsAgo >= 1) {
    return `A minute ago`
  }
  // Check if secs >= 1
  let secsAgo = dateDiff / (1000)
  if (secsAgo >= 2) {
    return `${Math.floor(secsAgo)} seconds ago`
  }
  return 'A moment ago'
}