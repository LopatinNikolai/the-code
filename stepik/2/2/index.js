/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    return hashtags.reduce(hashSet, []).join(', ');
};

function hashSet(acc, item){
   if(acc.indexOf(item.toLowerCase()) === -1) return acc.concat(item.toLowerCase());
   return acc.concat([]);
}