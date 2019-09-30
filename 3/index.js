/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    let correction = date.split(/-| |:/).map(Number);
    correction[1] = correction [1] - 1;
    let dateResult = new Date (...correction);
    return {
        re: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/,
        dateResult : dateResult,
        get value() {
           return this.dateResult.toISOString().match(this.re)[0].replace(/T/,' ')},
        add: function (quantity, time) {
            if (quantity < 0) throw new TypeError();
            switch (time){
                case 'years':
                        this.dateResult.setFullYear(this.dateResult.getFullYear()+quantity);
                        break;
                case 'hours':
                    this.dateResult.setHours(this.dateResult.getHours()+quantity);
                    break;
                case 'months':
                    this.dateResult.setMonth(this.dateResult.getMonth()+quantity);
                    break;
                case 'days':
                    this.dateResult.setDate(this.dateResult.getDate()+quantity);
                    break;
                case 'minutes':
                    this.dateResult.setMinutes(this.dateResult.getMinutes()+quantity);
                    break;
                default: throw new TypeError();
            }
            return this;
        },
        subtract: function (quantity, time) {
            if (quantity < 0) throw new TypeError();
            switch (time){
                case 'years':
                        this.dateResult.setFullYear(this.dateResult.getFullYear()-quantity);
                        break;
                case 'hours':
                    this.dateResult.setHours(this.dateResult.getHours()-quantity);
                    break;
                case 'months':
                    this.dateResult.setMonth(this.dateResult.getMonth()-quantity);
                    break;
                case 'days':
                    this.dateResult.setDate(this.dateResult.getDate()-quantity);
                    break;
                case 'minutes':
                    this.dateResult.setMinutes(this.dateResult.getMinutes()-quantity);
                    break;
                    default: throw new TypeError();
                
            }
            return this;
        }
    };
};
var date = require('./index.js');

var time = date('2017-05-16 13:45').add(25,'days');
console.log(time.value);