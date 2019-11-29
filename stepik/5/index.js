module.exports = {
     subscriptions:{},
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {

        this.subscriptions[event] = {subscriber : subscriber,handler : handler};
        console.log( this.subscriptions)
        // if (Object.keys(this.subscriptions).includes(event)) 
        // {this.subscriptions[event[subscriber]] = handler;}else{
        //     console.log(subscriber);
        //     this.subscriptions[event] = {[subscriber] : handler};
        // }
        // console.log(this.subscriptions[event][subscriber]());
        // console.log(subscriber);
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {

    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        console.log(this.subscriptions[event].handler )
        this.subscriptions[event].handler();
        // Object.keys(this.subscriptions[event]).forEach(element => {
        //      console.log(event)
        //    console.log(this.subscriptions[event][element] )
        //      this.subscriptions[event][element][handler];
        // });
        return this;
    }
};


var assert = require('assert');

// Подключаем свою функцию
var emitter = require('./index.js');

// Определим объект для счетчика нотификаций
var notifications = {
    counter: 0,
    count: function () {
        console.log(2222222222222222222222222);
        this.counter++;
    }
};

// Определим для хранения логов
var logger = {
    logs: []
};

// Подписываемся на событие new_notification и сразу оповещаем всех подписчиков
emitter
    .on('new_notification', notifications, notifications.count)
    .on('new_notification', logger, function () {

        this.logs.push('Произошло новое событие new_notification');
    })
    .on('new_notification', logger, function () {
        console.log(this.logs);
        // this указывает на logger
        this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
    })
    .emit('new_notification');
console.log(notifications.counter);
console.log(logger.logs);
