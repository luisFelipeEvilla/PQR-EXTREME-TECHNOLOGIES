const TimeAgo = require("javascript-time-ago");
const es = require("javascript-time-ago/locale/es");

TimeAgo.addLocale(es);
const timeAgo = new TimeAgo("es-col");

const helpers = {};

helpers.timeago = (timestamp) => {
  return timeAgo.format(timestamp);
};

helpers.ifequals = (string1, string2, opts) => {
  console.log(string1);
  console.log(string2);
  if (string1.localeCompare(string2) == 0) {
    return opts.fn(this);
  }
  return opts.inverse(this, );
};

module.exports = helpers;
