const { getFilePaths, readFile, getFileName } = require('./fileSystem');
const { readLine } = require('./console');
const maxСount = {importance: 1,
    user: 0,
    date: 0,
    comment: 0,
    fileName: 0};

app();

function app () {
    getFiles()
    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles () {
    getFilePaths(process.cwd(), 'js',(a) => fillArray(a));
}

const filePathss = [];

function fillArray(path) {
    filePathss.push(...todoSearch(readFile(path), getFileName(path)));
}

function processCommand (command) {
    const todos = filePathss.slice();
    switch (command) {
        case 'show':
            todoPrint(todos);
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
function todoSearch (content, fileName) {
    let reg = /\/\/ TODO/i;
    let todo = [];
        content.split("\n").forEach(line => {
            if (line.search(reg) != -1) {
                todo.push((line.split(reg)[1].split(";")));
            }
        })
        return todo.map(line => {
            return (line.length > 2) ?
            { importance: (line[2].match(/!/ig)) ?line[2].match(/!/ig).length : 0 ,
                user: line[0].trim() ,
                date: line[1].trim() ,
                comment: line[2].trim() ,
                fileName} : { importance: (line[0].match(/!/ig)) ?line[0].match(/!/ig).length : 0, 
                user:'',
                date:'' ,
                comment: line[0].trim() ,
                fileName};
            });

}

function resolveMaxСount (todo) {
    const maxValues = {
        user: 10,
        date: 10,
        comment: 50,
        fileName: 15,
        importance: 1,
    }
    todo.forEach(comment => { 
        Object.keys(comment).forEach(key => {
            if (comment[key].length > maxСount[key]) {
                maxСount[key] = comment[key].length
            }
        })
    });

    Object.keys(maxValues).forEach(key => {
        if (maxValues[key] < maxСount[key]) {
            maxСount[key] = maxValues[key]
        }
    });

    ['user', 'date', 'comment', 'fileName'].forEach(key => {
        if (key.length > maxСount[key]) {
            maxСount[key] = key.length;
        }
    });
}

function spaces (quantity, char) {
    let text ="";
    let i = 0;
    for (i; i <= quantity; i++){
        text+= char;
    }
    return text;
}

function todoPrint (todos) {
    let table = "";
    
    let rowlenght = 26;
    
    
    
   resolveMaxСount (todos);
   Object.keys(maxСount).forEach(key => {
    rowlenght += maxСount[key];
    });
    const header = buildrow({ importance: 1, user: "user", date: "date", comment: "comment", fileName: "fileName" });
    const line = spaces(rowlenght, "-");
    table += header + line + "\n";
   todos.forEach(comment => {
       table+=buildrow(comment);
   })

//    table += line;
console.log(table);

}
// !  |  user      |  date        |  comment              |  fileName       
function buildrow (coment) {
    let row = `  ${(coment.importance > 0) ? '!' : ' '}  `;

        ['user', 'date', 'comment', 'fileName'].forEach(key => {
            if (maxСount[key] < coment[key].length) {
               coment[key] = coment[key].slice(0, maxСount[key]-3) + "...";
            }
        
         });

        ['user', 'date', 'comment', 'fileName'].forEach(key => {
                row+= `|  ${coment[key]}${spaces(maxСount[key]-coment[key].length, " ")}  `
            
        });
    return row + '\n';
    // return `  ${(coment.importance > 0) ? `!` : ` `}  |  ${coment.user}${spaces(maxСount.user)}`
}