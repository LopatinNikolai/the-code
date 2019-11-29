// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    let commandAndPhones = command.split(' ');
    switch (commandAndPhones[0]) {
        case 'ADD':
            add(commandAndPhones[1],commandAndPhones[2]);
            break;
        case 'REMOVE_PHONE':
            return remove(commandAndPhones[1]);
        case 'SHOW':
           return show();
        default:
           return  "..." ;
      }
};

function add (name,numbers){
    phoneBook[name] = (phoneBook[name] || []).concat(numbers.split(','));
}

function remove (phoneNumber){
   for(const key of Object.keys(phoneBook)){
    if (phoneBook[key].includes(phoneNumber)) {
        phoneBook[key] = phoneBook[key].filter(number => number !== phoneNumber);
        return true;
    }
   }
    return false;
}

function show (){
   return Object.entries(phoneBook)
   .filter(([name,phones]) => Boolean(phones.length))
   .sort((a, b) => a[0].localeCompare(b[0]))
   .map(([name,phones]) => `${name}: ${phones.join(', ')}`);
}