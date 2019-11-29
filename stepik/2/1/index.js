/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
        return tweet.split(' ').reduce(tweetSplit,[]);
};

function tweetSplit (acc, item) {
     if (item.startsWith('#')) return acc.concat(item.slice(1));
     return acc.concat([]);
}