const TimeAgo = require('javascript-time-ago');
const es = require('javascript-time-ago/locale/es');

TimeAgo.addLocale(es);
const timeAgo = new TimeAgo('es-col');


const helpers = {}

helpers.timeago = (timestamp) => {
    return timeAgo.format(timestamp);
}; 

module.exports = helpers;