/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */



function query(collection, ...args) {
    let coll = collection.map(el => Object.assign({}, el));
    if (args.length === 0) return coll;

    args.forEach(element => {
        if (element[0] === 'filterIn') {
            coll = coll.filter(ob => element[2].includes(ob[element[1]]));
        }
    });
    args.forEach(element => {
        if (element[0] === 'select') {
            coll.forEach(ob => {          
                Object.keys(ob).forEach(key => {
                    if (!element[1].includes(key))   delete ob[key];
                });
            });
        }
    });

    return coll;
}

/**
 * @params {String[]}
 */
function select() {
    return (['select', [].slice.call(arguments)]);
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {

    return (['filterIn', property, values]);
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
