/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    var iHours = Math.floor(interval/60),
    iMinutes = interval % 60;
    hours += iHours;
    minutes += iMinutes;
    if (minutes > 59) {
        minutes -= 60;
        hours += 1;
    }
    while (hours > 23) {if (hours > 23) hours -=24;}
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return (hours + ":" + minutes);

};
