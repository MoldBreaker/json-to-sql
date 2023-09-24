const fs = require('fs');
const data = require('./config');

function readAndParseJSONFile(filePath) {
    try {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const jsonObject = JSON.parse(jsonData);
  
      return jsonObject;
    } catch (error) {
      console.error('Error reading or parsing the JSON file:', error);
      return null;
    }
}

function generateInsertSQL(tableName, jsonObject, fields) {
    const columns = fields == undefined ? Object.keys(jsonObject).join(', ') : fields.join(', '); 
    const values = Object.values(jsonObject).map(value => {
        if (typeof value === 'string') {
            return `'${value}'`;
        } else if(typeof value === 'number') {
            return `${value}`;
        } else if(typeof value === 'boolean') {
            if(value === true){
                return `TRUE`;
            } else {
                return 'FALSE';
            }
        } else if(typeof value === 'object') {
            throw new Error('Sorry but we cant support object for now');
        } else {
            return `NULL`;
        }
    });
    let query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    return query;
}

function generateQuery(tableName, jsonArray, fields) {
    let query = ``;
    for(let i=0; i<jsonArray.length; i++){
        query += generateInsertSQL(tableName, jsonArray[i], fields) + '\n';
    }
    return query;
}

function process(file) {
    const data = readAndParseJSONFile(`./JSON/${file.fileName}`);
    let insertSQL = '';
    let tableName = file.tableName || file.fileName.split('.')[0];
    let outputName = file.outputName || file.fileName.split('.')[0] + '.sql';
    if(Array.isArray(data)){
        insertSQL = generateQuery(tableName, data, file.fields);
    } else {
        insertSQL = generateInsertSQL(tableName, data, file.fields);
    }   
    fs.writeFile(`./SQL/${outputName}`, insertSQL, function (err) {
        if (err) throw err;
        console.log(`Saved! ${outputName}`);
    });
}

function start() {
    if(data.length == 0) {
        throw new Error('You must set data in config.js')
    }
    for(let i=0;i<data.length;i++){
        process(data[i]);
    }
}

start();