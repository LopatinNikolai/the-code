const fs = require('fs');
const path = require('path');

// TODO PE; 2018-08-20; переименовать?
function getFilePaths(directoryPath, extension, callback) {
    // TODO Anonymous Developer; 2016-03-17; Необходимо переписать этот код и использовать асинхронные версии функций для чтения из файла
    fs.readdir(directoryPath,  (err, fileNames) => {
        for (const fileName of fileNames) {
            // TODO WinDev; ; Убедиться, что будет работать под Windows.
            const filePath =path.join( directoryPath, fileName);

            fs.stat(filePath, (err, stat) => {
            if (stat && stat.isDirectory() && !filePath.endsWith(`node_modules`)) {
                getFilePaths(filePath, extension, callback);
            } else if (filePath.endsWith(`.${extension}`)) {
                callback(filePath);
            }
        })
        }
      });
    
    
}

function readFile(filePath, encoding = 'utf8') {
    return fs.readFileSync(filePath, encoding); // TODO Veronika; 2018-08-16; сделать кодировку настраиваемой
}

function getFileName(filePath){
    return path.parse(filePath).base;
}
// TODO Digi; 2018-09-21; Добавить функцию getFileName, которая по пути файла будет возвращать его имя. Воспользоваться модулем path из Node.js

module.exports = {
    getFilePaths,
    readFile,
    getFileName,
};
