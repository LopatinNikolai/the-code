  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

// TODO ; 2018-10-01; Можно ли написать более лаконично?

function readLine(callback) {
  readline.on('line', callback); // TODO pe; 2015-08-10; а какая будет кодировка?
}

// TODO : digi; 2016-04-08; добавить writeLine!!!

module.exports = {
    readLine,
};
